// import Navbar from "./components/navbar";
// import { User, MessageCircle, Heart } from "lucide-react";

// export default function LandingPage() {
//   return (
//     <main className="bg-linear-to-br from-white to-blue-50 min-h-screen">
//       <Navbar />

//       {/* HERO */}
//       <section className="pt-32 pb-20">
//         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
//           {/* TEXT */}
//           <div className="space-y-8">
//             <h1 className="text-5xl font-bold leading-tight">
//               Connect.
//               <span className="text-blue-600"> Share.</span>
//               <br />Belong on Frendly.
//             </h1>

//             <p className="text-lg text-gray-600 max-w-lg">
//               Frendly is a modern social platform designed to help you
//               connect with people, share moments, and build meaningful
//               relationships.
//             </p>

//             <div className="flex gap-4">
//               <a
//                 href="/register"
//                 className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
//               >
//                 Join Frendly
//               </a>
//               <a
//                 href="/login"
//                 className="px-6 py-3 rounded-xl border text-gray-700 hover:bg-blue-50 transition"
//               >
//                 Login
//               </a>
//             </div>
//           </div>

//           {/* VISUAL */}
//           <div className="relative hidden lg:block">
//             <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl" />
//             <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-300 rounded-full blur-3xl" />

//             <div className="relative bg-white/70 backdrop-blur rounded-3xl shadow-xl p-8 space-y-6">
//               <MockPost />
//               <MockPost />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* FEATURES */}
//       <section id="features" className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-6 text-center">
//           <h2 className="text-3xl font-semibold mb-4">
//             Why Choose Frendly?
//           </h2>
//           <p className="text-gray-500 mb-12">
//             Everything you need in one beautiful social experience.
//           </p>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <Feature
//               icon={<User />}
//               title="Build Your Profile"
//               desc="Create a unique identity and express yourself."
//             />
//             <Feature
//               icon={<MessageCircle />}
//               title="Real Conversations"
//               desc="Chat and interact with people you care about."
//             />
//             <Feature
//               icon={<Heart />}
//               title="Meaningful Connections"
//               desc="Discover and connect with like-minded people."
//             />
//           </div>
//         </div>
//       </section>

//       {/* STATS */}
//       <section id="community" className="py-20 bg-linear-to-br from-blue-600 to-blue-500 text-white">
//         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
//           <Stat value="10M+" label="Active Users" />
//           <Stat value="50M+" label="Posts Shared" />
//           <Stat value="100+" label="Countries" />
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="py-20 bg-white text-center">
//         <h2 className="text-4xl font-semibold mb-6">
//           Ready to Join Frendly?
//         </h2>
//         <p className="text-gray-500 mb-8">
//           Sign up today and start connecting instantly.
//         </p>
//         <a
//           href="/register"
//           className="px-8 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
//         >
//           Get Started
//         </a>
//       </section>
//     </main>
//   );
// }

// /* COMPONENTS */

// function Feature({
//   icon,
//   title,
//   desc,
// }: {
//   icon: React.ReactNode;
//   title: string;
//   desc: string;
// }) {
//   return (
//     <div className="p-8 rounded-2xl bg-blue-50 hover:shadow-lg transition">
//       <div className="text-blue-600 mb-4">{icon}</div>
//       <h3 className="text-lg font-semibold mb-2">{title}</h3>
//       <p className="text-sm text-gray-600">{desc}</p>
//     </div>
//   );
// }

// function Stat({ value, label }: { value: string; label: string }) {
//   return (
//     <div>
//       <p className="text-4xl font-bold">{value}</p>
//       <p className="text-sm text-blue-100">{label}</p>
//     </div>
//   );
// }

// function MockPost() {
//   return (
//     <div className="bg-white rounded-xl p-4 shadow-sm space-y-2">
//       <div className="h-3 w-24 bg-gray-200 rounded" />
//       <div className="h-2 w-full bg-gray-200 rounded" />
//       <div className="h-2 w-5/6 bg-gray-200 rounded" />
//     </div>
//   );
// }


import Navbar from "./components/navbar";
import { User, MessageCircle, Heart, Sparkles, Shield, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="pt-20 pb-32 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-violet-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* TEXT */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Welcome to the future of social connection</span>
            </div>

            <h1 className="text-6xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
              Connect.
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Share.
              </span>
              <br />
              Belong.
            </h1>

            <p className="text-xl text-slate-600 max-w-lg leading-relaxed">
              Join millions of people building meaningful connections on Frendly. 
              Share your moments, express yourself, and discover a community that feels like home.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/register"
                className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 text-center"
              >
                <span className="flex items-center justify-center gap-2">
                  Get Started Free
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
              </a>
              <a
                href="/login"
                className="px-8 py-4 rounded-2xl border-2 border-slate-300 text-slate-700 font-semibold hover:bg-white hover:border-blue-300 hover:shadow-lg transition-all duration-300 text-center"
              >
                Sign In
              </a>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-rose-400 border-2 border-white" />
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 border-2 border-white" />
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-purple-400 border-2 border-white" />
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 border-2 border-white" />
              </div>
              <div className="text-sm">
                <p className="font-semibold text-slate-900">Join 10M+ users</p>
                <p className="text-slate-600">Already connecting on Frendly</p>
              </div>
            </div>
          </div>

          {/* VISUAL */}
          <div className="relative hidden lg:block">
            <div className="relative">
              {/* Floating cards */}
              <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 animate-float">
                <div className="bg-white rounded-3xl shadow-2xl p-6 w-64" style={{ animationDelay: '0s' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-400 to-purple-500" />
                    <div>
                      <div className="h-3 w-24 bg-slate-200 rounded-full mb-2" />
                      <div className="h-2 w-16 bg-slate-100 rounded-full" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-slate-100 rounded-full" />
                    <div className="h-2 w-5/6 bg-slate-100 rounded-full" />
                  </div>
                  <div className="flex gap-2 mt-4">
                    <div className="flex items-center gap-1 text-rose-500">
                      <Heart className="w-4 h-4 fill-current" />
                      <span className="text-xs font-medium">234</span>
                    </div>
                    <div className="flex items-center gap-1 text-blue-500">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-xs font-medium">45</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 transform -translate-x-8 translate-y-8 animate-float" style={{ animationDelay: '1s' }}>
                <div className="bg-white rounded-3xl shadow-2xl p-6 w-64">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500" />
                    <div>
                      <div className="h-3 w-24 bg-slate-200 rounded-full mb-2" />
                      <div className="h-2 w-16 bg-slate-100 rounded-full" />
                    </div>
                  </div>
                  <div className="h-40 bg-gradient-to-br from-indigo-200 to-blue-200 rounded-2xl mb-3" />
                  <div className="flex gap-2">
                    <div className="flex items-center gap-1 text-rose-500">
                      <Heart className="w-4 h-4 fill-current" />
                      <span className="text-xs font-medium">892</span>
                    </div>
                    <div className="flex items-center gap-1 text-blue-500">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-xs font-medium">127</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center main card */}
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50">
                <MockPost featured />
                <div className="mt-6">
                  <MockPost />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Everything you need to connect
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Powerful features designed to make your social experience seamless and enjoyable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Feature
              icon={<User className="w-8 h-8" />}
              title="Personalized Profiles"
              desc="Create a stunning profile that reflects your personality. Customize every detail and stand out from the crowd."
              gradient="from-blue-500 to-cyan-500"
            />
            <Feature
              icon={<MessageCircle className="w-8 h-8" />}
              title="Real-time Conversations"
              desc="Stay connected with instant messaging, group chats, and seamless communication tools that bring people together."
              gradient="from-violet-500 to-purple-500"
            />
            <Feature
              icon={<Heart className="w-8 h-8" />}
              title="Meaningful Connections"
              desc="Discover people who share your interests. Build authentic relationships that matter and communities you love."
              gradient="from-rose-500 to-pink-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <Feature
              icon={<Shield className="w-8 h-8" />}
              title="Privacy First"
              desc="Your data is yours. Advanced privacy controls ensure you're always in charge of what you share."
              gradient="from-emerald-500 to-teal-500"
            />
            <Feature
              icon={<Zap className="w-8 h-8" />}
              title="Lightning Fast"
              desc="Experience blazing-fast performance. Share moments instantly without any lag or delays."
              gradient="from-amber-500 to-orange-500"
            />
            <Feature
              icon={<Sparkles className="w-8 h-8" />}
              title="Smart Feed"
              desc="Our AI-powered feed shows you content you'll love. Discover new interests and stay engaged."
              gradient="from-indigo-500 to-blue-500"
            />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section id="community" className="py-24 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-repeat" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">
              Join our growing community
            </h2>
            <p className="text-xl text-blue-100">
              Millions of people are already connecting on Frendly
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <Stat value="10M+" label="Active Users" sublabel="and growing every day" />
            <Stat value="50M+" label="Posts Shared" sublabel="moments captured" />
            <Stat value="100+" label="Countries" sublabel="worldwide reach" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-white rounded-3xl shadow-2xl p-12 md:p-16 border border-slate-100">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Ready to start your journey?
            </h2>
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
              Join Frendly today and become part of a community where authentic connections thrive. It's free to get started.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/register"
                className="group px-10 py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 text-lg"
              >
                <span className="flex items-center justify-center gap-2">
                  Create Your Account
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
              </a>
              <a
                href="#features"
                className="px-10 py-5 rounded-2xl border-2 border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 hover:border-blue-300 transition-all duration-300 text-lg"
              >
                Learn More
              </a>
            </div>
            <p className="text-sm text-slate-500 mt-6">
              No credit card required • Free forever • Join in seconds
            </p>
          </div>
        </div>
      </section>

      {/* Footer spacing */}
      <div className="h-12 bg-gradient-to-br from-slate-50 to-blue-50" />
    </main>
  );
}

/* COMPONENTS */

function Feature({
  icon,
  title,
  desc,
  gradient,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  gradient: string;
}) {
  return (
    <div className="group p-8 rounded-3xl bg-gradient-to-br from-slate-50 to-blue-50 hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-slate-100">
      <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${gradient} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-slate-900">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{desc}</p>
    </div>
  );
}

function Stat({ value, label, sublabel }: { value: string; label: string; sublabel: string }) {
  return (
    <div className="text-center">
      <p className="text-6xl font-bold mb-2 bg-gradient-to-br from-white to-blue-100 bg-clip-text text-transparent">
        {value}
      </p>
      <p className="text-xl font-semibold text-white mb-1">{label}</p>
      <p className="text-sm text-blue-200">{sublabel}</p>
    </div>
  );
}

function MockPost({ featured = false }: { featured?: boolean }) {
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-lg space-y-4 border border-slate-100 ${featured ? 'ring-2 ring-blue-200' : ''}`}>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-pink-500" />
        <div className="flex-1">
          <div className="h-3 w-32 bg-gradient-to-r from-slate-200 to-slate-100 rounded-full mb-2" />
          <div className="h-2 w-20 bg-slate-100 rounded-full" />
        </div>
      </div>
      {featured && (
        <div className="h-48 bg-gradient-to-br from-blue-100 via-indigo-100 to-violet-100 rounded-xl" />
      )}
      <div className="space-y-2">
        <div className="h-2 w-full bg-slate-100 rounded-full" />
        <div className="h-2 w-5/6 bg-slate-100 rounded-full" />
        <div className="h-2 w-4/6 bg-slate-100 rounded-full" />
      </div>
      <div className="flex gap-6 pt-2">
        <div className="flex items-center gap-2 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer">
          <Heart className="w-5 h-5" />
          <span className="text-sm font-medium">Like</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400 hover:text-blue-500 transition-colors cursor-pointer">
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm font-medium">Comment</span>
        </div>
      </div>
    </div>
  );
}