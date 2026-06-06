import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="border-t border-white/10 bg-[#080b14]
      mt-20"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-14">
        {/* Top Section */}
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-9 h-9 rounded-lg bg-gradient-to-br
                from-indigo-500 to-emerald-400 flex items-center
                justify-center shadow-lg shadow-indigo-500/30"
              >
                📚
              </div>

              <span
                className="font-bold text-xl text-white"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Career<span className="text-red-500">AI</span>
              </span>
            </div>

            <p className="text-sm text-white/60 leading-relaxed">
              Build professional resumes, analyze skills, match jobs,
              and prepare for interviews with AI-powered tools.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Product
            </h3>

            <div className="flex flex-col gap-3 text-white/60 text-sm">
              <Link
                to="/analyse"
                className="hover:text-white transition-colors"
              >
                Resume Analysis
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
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Company
            </h3>

            <div className="flex flex-col gap-3 text-white/60 text-sm">
              <Link
                to="/about"
                className="hover:text-white transition-colors"
              >
                About Us
              </Link>

              <Link
                to="/contact"
                className="hover:text-white transition-colors"
              >
                Contact
              </Link>

              <Link
                to="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>

              <Link
                to="/terms"
                className="hover:text-white transition-colors"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Stay Updated
            </h3>

            <p className="text-sm text-white/60 mb-4">
              Get updates on new AI tools and career resources.
            </p>

            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-white/5 border border-white/10
                rounded-lg px-4 py-3 text-sm text-white
                outline-none focus:border-indigo-500"
              />

              <button
                className="bg-gradient-to-r
                from-indigo-500 to-emerald-400
                py-3 rounded-lg text-sm font-medium
                hover:opacity-90 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 my-10"></div>

        {/* Bottom Section */}
        <div
          className="flex flex-col md:flex-row
          items-center justify-between gap-4"
        >
          <p className="text-sm text-white/50 text-center md:text-left">
            © {new Date().getFullYear()} CareerAI. All rights reserved.
          </p>

          <div className="flex items-center gap-5 text-white/50">
            <a
              href="#"
              className="hover:text-white transition-colors"
            >
              Twitter
            </a>

            <a
              href="#"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>

            <a
              href="#"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;