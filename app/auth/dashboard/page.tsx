export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* TOP BAR */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600 italic">
            Frendly
          </h1>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Welcome, User 👋
            </span>
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
              U
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* PAGE TITLE */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Dashboard
          </h2>
          <p className="text-gray-500 mt-1">
            This is your Frendly dashboard
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <StatCard title="Friends" value="128" />
          <StatCard title="Posts" value="34" />
          <StatCard title="Messages" value="12" />
        </div>

        {/* FEED / PLACEHOLDER */}
        <div className="bg-white rounded-xl border p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            News Feed
          </h3>
          <p className="text-gray-500 text-sm">
            Your feed will appear here once you start following friends.
          </p>

          <div className="mt-6 flex items-center justify-center h-40 border-2 border-dashed rounded-lg text-gray-400">
            No posts yet
          </div>
        </div>
      </main>
    </div>
  );
}

/* STAT CARD COMPONENT */
function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white rounded-xl border p-6">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-blue-600 mt-2">
        {value}
      </p>
    </div>
  );
}
