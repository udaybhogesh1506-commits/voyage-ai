function Navbar() {
  return (
    <nav className="flex items-center justify-between px-10 py-6 bg-slate-900">
      <h2 className="text-3xl font-bold text-blue-400">
        🌍 VoyageAI
      </h2>

      <div className="flex gap-8 text-lg">
        <a href="/" className="hover:text-blue-400">Home</a>
        <a href="/" className="hover:text-blue-400">Discover</a>
        <a href="/" className="hover:text-blue-400">Trips</a>
        <a href="/" className="hover:text-blue-400">AI Planner</a>
      </div>

      <button className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg">
        Login
      </button>
    </nav>
  );
}

export default Navbar;