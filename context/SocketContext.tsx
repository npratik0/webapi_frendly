"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => useContext(SocketContext);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    console.log("🔌 Initializing socket connection...");
    
    // Get token from cookie - UPDATED to look for 'auth_token'
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth_token="))
      ?.split("=")[1];

    if (!token) {
      console.log("❌ No token found in cookies");
      console.log("Available cookies:", document.cookie);
      return;
    }

    console.log("✅ Token found, connecting to socket...");
    console.log("Token preview:", token.substring(0, 20) + "...");

    const socketInstance = io(
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050",
      {
        auth: { token },
        transports: ["websocket", "polling"],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      }
    );

    socketInstance.on("connect", () => {
      console.log("✅ Socket connected:", socketInstance.id);
      setIsConnected(true);
    });

    socketInstance.on("disconnect", (reason) => {
      console.log("❌ Socket disconnected:", reason);
      setIsConnected(false);
    });

    socketInstance.on("connect_error", (error) => {
      console.error("❌ Socket connection error:", error.message);
    });

    socketInstance.on("error", (error) => {
      console.error("❌ Socket error:", error);
    });

    setSocket(socketInstance);

    return () => {
      console.log("🔌 Disconnecting socket...");
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
}


// "use client";

// import { createContext, useContext, useEffect, useState } from "react";
// import { io, Socket } from "socket.io-client";

// interface SocketContextType {
//   socket: Socket | null;
//   isConnected: boolean;
// }

// const SocketContext = createContext<SocketContextType>({
//   socket: null,
//   isConnected: false,
// });

// export const useSocket = () => useContext(SocketContext);

// export function SocketProvider({ children }: { children: React.ReactNode }) {
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [isConnected, setIsConnected] = useState(false);

//   useEffect(() => {
//     console.log("🔌 Initializing socket connection...");
    
//     // Get token from cookie
//     const token = document.cookie
//       .split("; ")
//       .find((row) => row.startsWith("auth_token="))
//       ?.split("=")[1];

//     if (!token) {
//       console.log("❌ No token found in cookies");
//       console.log("Available cookies:", document.cookie);
//       return;
//     }

//     console.log("✅ Token found");

//     const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050";
//     console.log("🔌 Connecting to:", SOCKET_URL);

//     const socketInstance = io(SOCKET_URL, {
//       auth: { token },
//       transports: ["polling", "websocket"], // Try polling first, then upgrade to websocket
//       reconnection: true,
//       reconnectionAttempts: 5,
//       reconnectionDelay: 1000,
//       timeout: 20000,
//     });

//     socketInstance.on("connect", () => {
//       console.log("✅ Socket connected!");
//       console.log("   Socket ID:", socketInstance.id);
//       console.log("   Transport:", socketInstance.io.engine.transport.name);
//       setIsConnected(true);
//     });

//     socketInstance.on("connected", (data) => {
//       console.log("✅ Server confirmed connection:", data);
//     });

//     socketInstance.on("disconnect", (reason) => {
//       console.log("❌ Socket disconnected:", reason);
//       setIsConnected(false);
//     });

//     socketInstance.on("connect_error", (error) => {
//       console.error("❌ Socket connection error:", error.message);
//       console.error("   Full error:", error);
//     });

//     socketInstance.on("error", (error) => {
//       console.error("❌ Socket error:", error);
//     });

//     socketInstance.io.on("reconnect_attempt", (attempt) => {
//       console.log(`🔄 Reconnection attempt ${attempt}`);
//     });

//     socketInstance.io.on("reconnect", (attempt) => {
//       console.log(`✅ Reconnected after ${attempt} attempts`);
//     });

//     setSocket(socketInstance);

//     return () => {
//       console.log("🔌 Cleaning up socket connection...");
//       socketInstance.disconnect();
//     };
//   }, []);

//   return (
//     <SocketContext.Provider value={{ socket, isConnected }}>
//       {children}
//     </SocketContext.Provider>
//   );
// }