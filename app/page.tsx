// import Navbar from "./components/navbar";
// import { User, MessageCircle, Heart, Sparkles, Shield, Zap } from "lucide-react";

// export default function LandingPage() {
//   return (
//     <main className="bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
//       <Navbar />

//       {/* HERO */}
//       <section className="pt-20 pb-32 relative overflow-hidden">
//         {/* Background decorative elements */}
//         <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
//           <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse" />
//           <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-violet-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
//         </div>

//         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
//           {/* TEXT */}
//           <div className="space-y-8">
//             <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
//               <Sparkles className="w-4 h-4" />
//               <span>Welcome to the future of social connection</span>
//             </div>

//             <h1 className="text-6xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
//               Connect.
//               <br />
//               <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//                 Share.
//               </span>
//               <br />
//               Belong.
//             </h1>

//             <p className="text-xl text-slate-600 max-w-lg leading-relaxed">
//               Join millions of people building meaningful connections on Frendly. 
//               Share your moments, express yourself, and discover a community that feels like home.
//             </p>

//             <div className="flex flex-col sm:flex-row gap-4">
//               <a
//                 href="/register"
//                 className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 text-center"
//               >
//                 <span className="flex items-center justify-center gap-2">
//                   Get Started Free
//                   <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
//                 </span>
//               </a>
//               <a
//                 href="/login"
//                 className="px-8 py-4 rounded-2xl border-2 border-slate-300 text-slate-700 font-semibold hover:bg-white hover:border-blue-300 hover:shadow-lg transition-all duration-300 text-center"
//               >
//                 Sign In
//               </a>
//             </div>

//             <div className="flex items-center gap-8 pt-4">
//               <div className="flex -space-x-3">
//                 <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-rose-400 border-2 border-white" />
//                 <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 border-2 border-white" />
//                 <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-purple-400 border-2 border-white" />
//                 <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 border-2 border-white" />
//               </div>
//               <div className="text-sm">
//                 <p className="font-semibold text-slate-900">Join 10M+ users</p>
//                 <p className="text-slate-600">Already connecting on Frendly</p>
//               </div>
//             </div>
//           </div>

//           {/* VISUAL */}
//           <div className="relative hidden lg:block">
//             <div className="relative">
//               {/* Floating cards */}
//               <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 animate-float">
//                 <div className="bg-white rounded-3xl shadow-2xl p-6 w-64" style={{ animationDelay: '0s' }}>
//                   <div className="flex items-center gap-3 mb-4">
//                     <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-400 to-purple-500" />
//                     <div>
//                       <div className="h-3 w-24 bg-slate-200 rounded-full mb-2" />
//                       <div className="h-2 w-16 bg-slate-100 rounded-full" />
//                     </div>
//                   </div>
//                   <div className="space-y-2">
//                     <div className="h-2 w-full bg-slate-100 rounded-full" />
//                     <div className="h-2 w-5/6 bg-slate-100 rounded-full" />
//                   </div>
//                   <div className="flex gap-2 mt-4">
//                     <div className="flex items-center gap-1 text-rose-500">
//                       <Heart className="w-4 h-4 fill-current" />
//                       <span className="text-xs font-medium">234</span>
//                     </div>
//                     <div className="flex items-center gap-1 text-blue-500">
//                       <MessageCircle className="w-4 h-4" />
//                       <span className="text-xs font-medium">45</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="absolute bottom-0 left-0 transform -translate-x-8 translate-y-8 animate-float" style={{ animationDelay: '1s' }}>
//                 <div className="bg-white rounded-3xl shadow-2xl p-6 w-64">
//                   <div className="flex items-center gap-3 mb-4">
//                     <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500" />
//                     <div>
//                       <div className="h-3 w-24 bg-slate-200 rounded-full mb-2" />
//                       <div className="h-2 w-16 bg-slate-100 rounded-full" />
//                     </div>
//                   </div>
//                   <div className="h-40 bg-gradient-to-br from-indigo-200 to-blue-200 rounded-2xl mb-3" />
//                   <div className="flex gap-2">
//                     <div className="flex items-center gap-1 text-rose-500">
//                       <Heart className="w-4 h-4 fill-current" />
//                       <span className="text-xs font-medium">892</span>
//                     </div>
//                     <div className="flex items-center gap-1 text-blue-500">
//                       <MessageCircle className="w-4 h-4" />
//                       <span className="text-xs font-medium">127</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Center main card */}
//               <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50">
//                 <MockPost featured />
//                 <div className="mt-6">
//                   <MockPost />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* FEATURES */}
//       <section id="features" className="py-24 bg-white relative">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="text-center mb-16">
//             <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//               Everything you need to connect
//             </h2>
//             <p className="text-xl text-slate-600 max-w-2xl mx-auto">
//               Powerful features designed to make your social experience seamless and enjoyable.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <Feature
//               icon={<User className="w-8 h-8" />}
//               title="Personalized Profiles"
//               desc="Create a stunning profile that reflects your personality. Customize every detail and stand out from the crowd."
//               gradient="from-blue-500 to-cyan-500"
//             />
//             <Feature
//               icon={<MessageCircle className="w-8 h-8" />}
//               title="Real-time Conversations"
//               desc="Stay connected with instant messaging, group chats, and seamless communication tools that bring people together."
//               gradient="from-violet-500 to-purple-500"
//             />
//             <Feature
//               icon={<Heart className="w-8 h-8" />}
//               title="Meaningful Connections"
//               desc="Discover people who share your interests. Build authentic relationships that matter and communities you love."
//               gradient="from-rose-500 to-pink-500"
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
//             <Feature
//               icon={<Shield className="w-8 h-8" />}
//               title="Privacy First"
//               desc="Your data is yours. Advanced privacy controls ensure you're always in charge of what you share."
//               gradient="from-emerald-500 to-teal-500"
//             />
//             <Feature
//               icon={<Zap className="w-8 h-8" />}
//               title="Lightning Fast"
//               desc="Experience blazing-fast performance. Share moments instantly without any lag or delays."
//               gradient="from-amber-500 to-orange-500"
//             />
//             <Feature
//               icon={<Sparkles className="w-8 h-8" />}
//               title="Smart Feed"
//               desc="Our AI-powered feed shows you content you'll love. Discover new interests and stay engaged."
//               gradient="from-indigo-500 to-blue-500"
//             />
//           </div>
//         </div>
//       </section>

//       {/* STATS */}
//       <section id="community" className="py-24 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 text-white relative overflow-hidden">
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute top-0 left-0 w-full h-full bg-repeat" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
//         </div>
        
//         <div className="max-w-7xl mx-auto px-6 relative z-10">
//           <div className="text-center mb-16">
//             <h2 className="text-5xl font-bold mb-4">
//               Join our growing community
//             </h2>
//             <p className="text-xl text-blue-100">
//               Millions of people are already connecting on Frendly
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
//             <Stat value="10M+" label="Active Users" sublabel="and growing every day" />
//             <Stat value="50M+" label="Posts Shared" sublabel="moments captured" />
//             <Stat value="100+" label="Countries" sublabel="worldwide reach" />
//           </div>
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
//         <div className="max-w-4xl mx-auto px-6 text-center">
//           <div className="bg-white rounded-3xl shadow-2xl p-12 md:p-16 border border-slate-100">
//             <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//               Ready to start your journey?
//             </h2>
//             <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
//               Join Frendly today and become part of a community where authentic connections thrive. It's free to get started.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <a
//                 href="/register"
//                 className="group px-10 py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 text-lg"
//               >
//                 <span className="flex items-center justify-center gap-2">
//                   Create Your Account
//                   <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
//                 </span>
//               </a>
//               <a
//                 href="#features"
//                 className="px-10 py-5 rounded-2xl border-2 border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 hover:border-blue-300 transition-all duration-300 text-lg"
//               >
//                 Learn More
//               </a>
//             </div>
//             <p className="text-sm text-slate-500 mt-6">
//               No credit card required • Free forever • Join in seconds
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Footer spacing */}
//       <div className="h-12 bg-gradient-to-br from-slate-50 to-blue-50" />
//     </main>
//   );
// }

// /* COMPONENTS */

// function Feature({
//   icon,
//   title,
//   desc,
//   gradient,
// }: {
//   icon: React.ReactNode;
//   title: string;
//   desc: string;
//   gradient: string;
// }) {
//   return (
//     <div className="group p-8 rounded-3xl bg-gradient-to-br from-slate-50 to-blue-50 hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-slate-100">
//       <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${gradient} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
//         {icon}
//       </div>
//       <h3 className="text-xl font-bold mb-3 text-slate-900">{title}</h3>
//       <p className="text-slate-600 leading-relaxed">{desc}</p>
//     </div>
//   );
// }

// function Stat({ value, label, sublabel }: { value: string; label: string; sublabel: string }) {
//   return (
//     <div className="text-center">
//       <p className="text-6xl font-bold mb-2 bg-gradient-to-br from-white to-blue-100 bg-clip-text text-transparent">
//         {value}
//       </p>
//       <p className="text-xl font-semibold text-white mb-1">{label}</p>
//       <p className="text-sm text-blue-200">{sublabel}</p>
//     </div>
//   );
// }

// function MockPost({ featured = false }: { featured?: boolean }) {
//   return (
//     <div className={`bg-white rounded-2xl p-6 shadow-lg space-y-4 border border-slate-100 ${featured ? 'ring-2 ring-blue-200' : ''}`}>
//       <div className="flex items-center gap-3">
//         <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-pink-500" />
//         <div className="flex-1">
//           <div className="h-3 w-32 bg-gradient-to-r from-slate-200 to-slate-100 rounded-full mb-2" />
//           <div className="h-2 w-20 bg-slate-100 rounded-full" />
//         </div>
//       </div>
//       {featured && (
//         <div className="h-48 bg-gradient-to-br from-blue-100 via-indigo-100 to-violet-100 rounded-xl" />
//       )}
//       <div className="space-y-2">
//         <div className="h-2 w-full bg-slate-100 rounded-full" />
//         <div className="h-2 w-5/6 bg-slate-100 rounded-full" />
//         <div className="h-2 w-4/6 bg-slate-100 rounded-full" />
//       </div>
//       <div className="flex gap-6 pt-2">
//         <div className="flex items-center gap-2 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer">
//           <Heart className="w-5 h-5" />
//           <span className="text-sm font-medium">Like</span>
//         </div>
//         <div className="flex items-center gap-2 text-slate-400 hover:text-blue-500 transition-colors cursor-pointer">
//           <MessageCircle className="w-5 h-5" />
//           <span className="text-sm font-medium">Comment</span>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import Navbar from "./components/navbar";
import { User, MessageCircle, Heart, Sparkles, Shield, Zap, TrendingUp, Users, Globe } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="bg-white min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="pt-32 pb-20 relative overflow-hidden bg-gradient-to-b from-blue-50 via-indigo-50/30 to-white">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-40 left-20 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-60 right-20 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-40 left-1/3 w-80 h-80 bg-violet-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* TEXT */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-200/50 text-blue-700 rounded-full text-sm font-medium shadow-sm">
              <Sparkles className="w-4 h-4" />
              <span>Welcome to the future of social connection</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight">
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Connect.
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Share. Belong.
              </span>
            </h1>

            <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
              Join millions of people building meaningful connections on Frendly. 
              Share your moments, express yourself, and discover a community that feels like home.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/register"
                className="group px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105 transition-all duration-300 text-center"
              >
                <span className="flex items-center justify-center gap-2">
                  Get Started Free
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
              </a>
              <a
                href="/login"
                className="px-8 py-4 rounded-xl bg-white border-2 border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 hover:border-blue-300 hover:shadow-md transition-all duration-300 text-center"
              >
                Sign In
              </a>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 border-2 border-white shadow-sm" />
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 border-2 border-white shadow-sm" />
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 border-2 border-white shadow-sm" />
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 border-2 border-white shadow-sm" />
              </div>
              <div className="text-sm">
                <p className="font-bold text-slate-900">Join 10M+ users</p>
                <p className="text-slate-500">Already on Frendly</p>
              </div>
            </div>
          </div>

          {/* VISUAL */}
          <div className="relative hidden lg:block">
            <div className="relative h-full min-h-[600px]">
              {/* Floating card 1 - Top Right */}
              <div className="absolute top-0 right-0 animate-float z-20">
                <div className="bg-white rounded-2xl shadow-xl p-5 w-72 border border-slate-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="h-3 w-24 bg-slate-200 rounded-full mb-2" />
                      <div className="h-2 w-16 bg-slate-100 rounded-full" />
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="h-2 w-full bg-slate-100 rounded-full" />
                    <div className="h-2 w-4/5 bg-slate-100 rounded-full" />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1.5 text-rose-500">
                      <Heart className="w-4 h-4 fill-current" />
                      <span className="text-sm font-semibold">234</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-blue-500">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm font-semibold">45</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating card 2 - Bottom Left */}
              <div className="absolute bottom-0 left-0 animate-float z-20" style={{ animationDelay: '1s' }}>
                <div className="bg-white rounded-2xl shadow-xl p-5 w-72 border border-slate-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="h-3 w-24 bg-slate-200 rounded-full mb-2" />
                      <div className="h-2 w-16 bg-slate-100 rounded-full" />
                    </div>
                  </div>
                  <div className="h-40 bg-gradient-to-br from-indigo-200 via-blue-200 to-cyan-200 rounded-xl mb-3" />
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1.5 text-rose-500">
                      <Heart className="w-4 h-4 fill-current" />
                      <span className="text-sm font-semibold">892</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-blue-500">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm font-semibold">127</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center main card */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 z-10">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-slate-200">
                  <MockPost featured />
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              Features
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Everything you need to connect
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Powerful features designed to make your social experience seamless and enjoyable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Feature
              icon={<User className="w-7 h-7" />}
              title="Personalized Profiles"
              desc="Create a stunning profile that reflects your personality. Customize every detail and stand out."
              gradient="from-blue-500 to-cyan-500"
            />
            <Feature
              icon={<MessageCircle className="w-7 h-7" />}
              title="Real-time Chat"
              desc="Stay connected with instant messaging and seamless communication tools that bring people together."
              gradient="from-violet-500 to-purple-500"
            />
            <Feature
              icon={<Heart className="w-7 h-7" />}
              title="Meaningful Connections"
              desc="Discover people who share your interests. Build authentic relationships that matter."
              gradient="from-rose-500 to-pink-500"
            />
            <Feature
              icon={<Shield className="w-7 h-7" />}
              title="Privacy First"
              desc="Your data is yours. Advanced privacy controls ensure you're always in charge of what you share."
              gradient="from-emerald-500 to-teal-500"
            />
            <Feature
              icon={<Zap className="w-7 h-7" />}
              title="Lightning Fast"
              desc="Experience blazing-fast performance. Share moments instantly without any lag or delays."
              gradient="from-amber-500 to-orange-500"
            />
            <Feature
              icon={<TrendingUp className="w-7 h-7" />}
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
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold mb-6">
              <Users className="w-4 h-4" />
              Community
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-4">
              Join our growing community
            </h2>
            <p className="text-xl text-blue-100">
              Millions of people are already connecting on Frendly
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <Stat value="10M+" label="Active Users" sublabel="and growing every day" icon={<Users className="w-8 h-8" />} />
            <Stat value="50M+" label="Posts Shared" sublabel="moments captured" icon={<MessageCircle className="w-8 h-8" />} />
            <Stat value="100+" label="Countries" sublabel="worldwide reach" icon={<Globe className="w-8 h-8" />} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-white rounded-3xl shadow-xl p-12 md:p-16 border border-slate-100">
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Ready to start your journey?
            </h2>
            <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join Frendly today and become part of a community where authentic connections thrive. It's free to get started.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/register"
                className="group px-10 py-5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105 transition-all duration-300 text-lg"
              >
                <span className="flex items-center justify-center gap-2">
                  Create Your Account
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
              </a>
              <a
                href="#features"
                className="px-10 py-5 rounded-xl bg-white border-2 border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 hover:border-blue-300 hover:shadow-md transition-all duration-300 text-lg"
              >
                Learn More
              </a>
            </div>
            <p className="text-sm text-slate-500 mt-8 flex items-center justify-center gap-2 flex-wrap">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                No credit card required
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                Free forever
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                Join in seconds
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold italic text-blue-400 mb-4">Frendly</h3>
          <p className="text-slate-400 text-sm">© 2026 Frendly. All rights reserved.</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
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
    <div className="group p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100">
      <div className={`inline-flex p-3.5 rounded-xl bg-gradient-to-br ${gradient} text-white mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-${gradient.split('-')[1]}-500/20`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-slate-900">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{desc}</p>
    </div>
  );
}

function Stat({ value, label, sublabel, icon }: { value: string; label: string; sublabel: string; icon: React.ReactNode }) {
  return (
    <div className="text-center group">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <p className="text-5xl lg:text-6xl font-extrabold mb-2">
        {value}
      </p>
      <p className="text-xl font-semibold text-white mb-1">{label}</p>
      <p className="text-sm text-blue-200">{sublabel}</p>
    </div>
  );
}

function MockPost({ featured = false }: { featured?: boolean }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="h-3.5 w-32 bg-slate-200 rounded-full mb-2" />
          <div className="h-2.5 w-20 bg-slate-100 rounded-full" />
        </div>
      </div>
      {featured && (
        <div className="h-48 bg-gradient-to-br from-blue-100 via-indigo-100 to-violet-100 rounded-xl" />
      )}
      <div className="space-y-2.5">
        <div className="h-2.5 w-full bg-slate-100 rounded-full" />
        <div className="h-2.5 w-5/6 bg-slate-100 rounded-full" />
        <div className="h-2.5 w-3/4 bg-slate-100 rounded-full" />
      </div>
      <div className="flex gap-6 pt-3 border-t border-slate-100">
        <button className="flex items-center gap-2 text-slate-500 hover:text-rose-500 transition-colors group">
          <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium">Like</span>
        </button>
        <button className="flex items-center gap-2 text-slate-500 hover:text-blue-500 transition-colors group">
          <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium">Comment</span>
        </button>
      </div>
    </div>
  );
}