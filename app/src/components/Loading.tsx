export default function Loading() {
  return (
    <div className="min-h-screen bg-[#080b14] flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="w-20 h-20 border border-white/10 rounded-full"></div>

          <div className="absolute inset-0 w-20 h-20 border-2 border-transparent border-t-indigo-500 border-r-emerald-400 rounded-full animate-spin"></div>
        </div>

        <h2
          className="mt-6 text-2xl font-bold text-white"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Career Hub
        </h2>

        <p className="text-white/50 mt-2">
          Loading your experience...
        </p>
      </div>
    </div>
  );
}