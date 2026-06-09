import { useAppData } from "../context/AppContext";
import { ArrowRight, PlayCircle } from "lucide-react";

const Hero = () => {
  const { isAuth, user } = useAppData();

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Blur Orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-indigo-500/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/20 blur-[120px] rounded-full animate-pulse" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 min-h-screen flex items-center">
        {!isAuth ? (
          <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
            {/* LEFT SIDE */}
            <div className="animate-slide-up">
              <span className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-white/70">
                🚀 AI Powered Career Platform
              </span>

              <h1 className="mt-8 text-5xl md:text-7xl font-bold text-white leading-tight">
                Learn.
                <br />
                Build.
                <br />
                <span className="text-gradient">
                  Get Hired.
                </span>
              </h1>

              <p className="mt-8 text-lg text-white/60 max-w-xl">
                Upload your resume, get ATS insights, discover
                missing skills, prepare for interviews and land
                your dream job faster.
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-3 mt-8">
                <div className="feature-pill">
                  ✨ First 3 Analyses Free
                </div>

                <div className="feature-pill">
                  💳 No Credit Card Required
                </div>

                <div className="feature-pill">
                  ⚡ Instant ATS Score
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-10 flex flex-wrap gap-4">
                <button
                  className="
                  px-7 py-4 rounded-xl
                  bg-indigo-600 text-white font-medium
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:shadow-[0_0_35px_rgba(99,102,241,0.5)]
                  "
                >
                  Start Free Analysis
                </button>

                <button
                  className="
                  px-7 py-4 rounded-xl
                  border border-white/10
                  bg-white/5 text-white
                  flex items-center gap-2
                  transition-all duration-300
                  hover:bg-white/10
                  hover:-translate-y-1
                  "
                >
                  <PlayCircle size={18} />
                  Watch Demo
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12">
                <div>
                  <h3 className="text-3xl font-bold text-white">
                    15K+
                  </h3>
                  <p className="text-white/50 text-sm">
                    Resumes Analyzed
                  </p>
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-white">
                    92%
                  </h3>
                  <p className="text-white/50 text-sm">
                    ATS Accuracy
                  </p>
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-white">
                    500+
                  </h3>
                  <p className="text-white/50 text-sm">
                    Companies Covered
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="floating">
              {/* ATS Card */}
              <div className="glass-card p-6 mb-5">
                <p className="text-white/60 text-sm">
                  Average ATS Score Improvement
                </p>

                <h2 className="text-5xl font-bold text-white mt-2">
                  92%
                </h2>

                <p className="text-emerald-400 mt-2">
                  +37% Better Than Average
                </p>
              </div>

              {/* Dashboard */}
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold text-white">
                  Why Join?
                </h3>

                <div className="space-y-4 mt-6">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    📚 Structured Learning Paths
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    💼 Resume ATS Analysis
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    🤖 AI Career Guidance
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    🚀 Interview Preparation
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* LOGGED IN HERO */
          <div className="w-full animate-fade-in">
            <div className="max-w-6xl mx-auto">
              <p className="text-indigo-400 font-medium">
                Welcome Back 👋
              </p>

              <h1 className="text-5xl md:text-6xl font-bold text-white mt-4">
                {user?.name}
              </h1>

              <p className="text-white/60 text-lg mt-4 max-w-2xl">
                Continue improving your resume and career
                profile. You're getting closer to your dream job.
              </p>

              {/* Stats */}
              <div className="grid md:grid-cols-4 gap-6 mt-12">
                <div
                  className="
                  bg-white/5 border border-white/10
                  p-6 rounded-2xl
                  transition-all duration-300
                  hover:-translate-y-2
                  hover:border-indigo-500/40
                  hover:bg-white/10
                  "
                >
                  <h3 className="text-3xl font-bold text-white">
                    92
                  </h3>
                  <p className="text-white/50">
                    ATS Score
                  </p>
                </div>

                <div
                  className="
                  bg-white/5 border border-white/10
                  p-6 rounded-2xl
                  transition-all duration-300
                  hover:-translate-y-2
                  hover:border-indigo-500/40
                  hover:bg-white/10
                  "
                >
                  <h3 className="text-3xl font-bold text-white">
                    24
                  </h3>
                  <p className="text-white/50">
                    Skills Matched
                  </p>
                </div>

                <div
                  className="
                  bg-white/5 border border-white/10
                  p-6 rounded-2xl
                  transition-all duration-300
                  hover:-translate-y-2
                  hover:border-indigo-500/40
                  hover:bg-white/10
                  "
                >
                  <h3 className="text-3xl font-bold text-white">
                    8
                  </h3>
                  <p className="text-white/50">
                    Interviews Ready
                  </p>
                </div>

                <div
                  className="
                  bg-white/5 border border-white/10
                  p-6 rounded-2xl
                  transition-all duration-300
                  hover:-translate-y-2
                  hover:border-indigo-500/40
                  hover:bg-white/10
                  "
                >
                  <h3 className="text-3xl font-bold text-white">
                    12
                  </h3>
                  <p className="text-white/50">
                    Applications
                  </p>
                </div>
              </div>

              {/* Resume Card */}
              <div className="glass-card p-8 mt-10 floating">
                <h3 className="text-2xl font-semibold text-white">
                  Resume Analysis Complete
                </h3>

                <p className="text-white/60 mt-2">
                  Your profile is performing better than 78%
                  of candidates in similar roles.
                </p>

                <div className="mt-6 h-3 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-[78%] h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full" />
                </div>

                <button
                  className="
                  mt-8 px-7 py-4
                  rounded-xl
                  bg-indigo-600
                  text-white
                  flex items-center gap-2
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:shadow-[0_0_35px_rgba(99,102,241,0.5)]
                  "
                >
                  View Full Report
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;