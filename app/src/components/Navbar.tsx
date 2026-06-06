import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAppData } from "../context/AppContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { isAuth, user } = useAppData();

  return (
    <>
      <nav
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-between
        px-6 md:px-12 py-4 border-b border-white/10
        bg-[#080b14]/80 backdrop-blur-xl"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg bg-gradient-to-br
            from-indigo-500 to-emerald-400 flex items-center
            justify-center shadow-lg shadow-indigo-500/30 text-lg"
          >
            📚
          </div>

          <span
            className="font-bold text-lg tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Career<span className="text-red-500">AI</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-white/50">
          <Link
            to="/analyse"
            className="hover:text-white transition-colors"
          >
            Analyse
          </Link>

          <Link
            to="/jobmatcher"
            className="hover:text-white transition-colors"
          >
            Job Matcher
          </Link>

          <Link
            to="/resumebuilder"
            className="hover:text-white transition-colors"
          >
            Resume Builder
          </Link>

          <Link
            to="/interviewprep"
            className="hover:text-white transition-colors"
          >
            Interview Prep
          </Link>
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-3">
          {isAuth ? (
            <Link
              to="/account"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <img
                src="/user.png"
                alt="user"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-white/10"
              />

              <span className="text-sm text-white/70">
                {user?.name?.split(" ")[0]}
              </span>
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm text-white/50 hover:text-white transition-colors px-4 py-2"
              >
                Sign In
              </Link>

              <Link
                to="/login"
                className="btn-primary text-sm px-5 py-2 rounded-lg"
              >
                Get Started Free
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-[73px] inset-x-0 z-40
        bg-[#080b14]/95 backdrop-blur-xl border-b border-white/10
        transition-all duration-300 ${
          open
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-5 pointer-events-none"
        }`}
      >
        <div className="flex flex-col p-6 space-y-5 text-white/70">
          <Link
            to="/analyse"
            onClick={() => setOpen(false)}
            className="hover:text-white"
          >
            Analyse
          </Link>

          <Link
            to="/jobmatcher"
            onClick={() => setOpen(false)}
            className="hover:text-white"
          >
            Job Matcher
          </Link>

          <Link
            to="/resumebuilder"
            onClick={() => setOpen(false)}
            className="hover:text-white"
          >
            Resume Builder
          </Link>

          <Link
            to="/interviewprep"
            onClick={() => setOpen(false)}
            className="hover:text-white"
          >
            Interview Prep
          </Link>

          <div className="border-t border-white/10 pt-4">
            {isAuth ? (
              <Link
                to="/account"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3"
              >
                <img
                  src="/user.png"
                  alt="user"
                  className="w-9 h-9 rounded-full"
                />

                <span>{user?.name}</span>
              </Link>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="text-center py-2 border border-white/10 rounded-lg"
                >
                  Sign In
                </Link>

                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="btn-primary text-center py-2 rounded-lg"
                >
                  Get Started Free
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;