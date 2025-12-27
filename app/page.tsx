import Navbar from "./components/navbar";
import { User, MessageCircle, Heart } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="bg-gradient-to-br from-white to-blue-50 min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* TEXT */}
          <div className="space-y-8">
            <h1 className="text-5xl font-bold leading-tight">
              Connect.
              <span className="text-blue-600"> Share.</span>
              <br />Belong on Frendly.
            </h1>

            <p className="text-lg text-gray-600 max-w-lg">
              Frendly is a modern social platform designed to help you
              connect with people, share moments, and build meaningful
              relationships.
            </p>

            <div className="flex gap-4">
              <a
                href="/register"
                className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
              >
                Join Frendly
              </a>
              <a
                href="/login"
                className="px-6 py-3 rounded-xl border text-gray-700 hover:bg-blue-50 transition"
              >
                Login
              </a>
            </div>
          </div>

          {/* VISUAL */}
          <div className="relative hidden lg:block">
            <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-300 rounded-full blur-3xl" />

            <div className="relative bg-white/70 backdrop-blur rounded-3xl shadow-xl p-8 space-y-6">
              <MockPost />
              <MockPost />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-4">
            Why Choose Frendly?
          </h2>
          <p className="text-gray-500 mb-12">
            Everything you need in one beautiful social experience.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Feature
              icon={<User />}
              title="Build Your Profile"
              desc="Create a unique identity and express yourself."
            />
            <Feature
              icon={<MessageCircle />}
              title="Real Conversations"
              desc="Chat and interact with people you care about."
            />
            <Feature
              icon={<Heart />}
              title="Meaningful Connections"
              desc="Discover and connect with like-minded people."
            />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section id="community" className="py-20 bg-gradient-to-br from-blue-600 to-blue-500 text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <Stat value="10M+" label="Active Users" />
          <Stat value="50M+" label="Posts Shared" />
          <Stat value="100+" label="Countries" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white text-center">
        <h2 className="text-4xl font-semibold mb-6">
          Ready to Join Frendly?
        </h2>
        <p className="text-gray-500 mb-8">
          Sign up today and start connecting instantly.
        </p>
        <a
          href="/register"
          className="px-8 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          Get Started
        </a>
      </section>
    </main>
  );
}

/* COMPONENTS */

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="p-8 rounded-2xl bg-blue-50 hover:shadow-lg transition">
      <div className="text-blue-600 mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-4xl font-bold">{value}</p>
      <p className="text-sm text-blue-100">{label}</p>
    </div>
  );
}

function MockPost() {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm space-y-2">
      <div className="h-3 w-24 bg-gray-200 rounded" />
      <div className="h-2 w-full bg-gray-200 rounded" />
      <div className="h-2 w-5/6 bg-gray-200 rounded" />
    </div>
  );
}

