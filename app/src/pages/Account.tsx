import { useAppData } from "../context/AppContext";
import {
  Crown,
  Lock,
  Mail,
  Sparkles,
  Calendar,
  LogOut,
  BarChart3,
  FileText,
  Briefcase,
  ArrowRight,
} from "lucide-react";

const Account = () => {
  const { user, LogoutUser } = useAppData();

  const isPro =
    user?.subscription &&
    new Date() < new Date(user.subscription);

  const freeLeft = Math.max(
    0,
    3 - (user?.freeRequestUsed ?? 0)
  );

  return (
    <section className="bg-page py-20 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="glass-card p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src={
                user?.image ||
                `https://ui-avatars.com/api/?name=${user?.name}`
              }
              alt="profile"
              className="w-24 h-24 rounded-full border border-white/10"
            />

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-white">
                {user?.name}
              </h1>

              <div className="flex items-center gap-2 text-white/50 mt-2 justify-center md:justify-start">
                <Mail size={16} />
                {user?.email}
              </div>

              <div className="mt-4">
                {isPro ? (
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <Crown size={16} />
                    Pro Member
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70">
                    Free Plan
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* FREE USER DASHBOARD */}
        {!isPro && (
          <>
            {/* Free Usage */}
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="glass-card p-6">
                <p className="text-white/50 text-sm">
                  Free Requests Left
                </p>

                <h2 className="text-5xl font-bold text-white mt-3">
                  {freeLeft}
                </h2>

                <p className="text-white/40 text-sm mt-2">
                  Out of 3 free analyses
                </p>
              </div>

              <div className="glass-card p-6">
                <p className="text-white/50 text-sm">
                  Current Plan
                </p>

                <h2 className="text-3xl font-bold text-white mt-3">
                  Free
                </h2>

                <p className="text-white/40 text-sm mt-2">
                  Basic Access
                </p>
              </div>

              <div className="glass-card p-6">
                <p className="text-white/50 text-sm">
                  Premium Features
                </p>

                <h2 className="text-3xl font-bold text-white mt-3">
                  Locked
                </h2>

                <p className="text-white/40 text-sm mt-2">
                  Upgrade Required
                </p>
              </div>
            </div>

            {/* Upgrade Banner */}
            <div className="mt-8 rounded-3xl p-8 bg-gradient-to-r from-indigo-500/20 to-emerald-500/20 border border-indigo-500/20">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="text-3xl font-bold text-white">
                    Unlock Pro Features 🚀
                  </h2>

                  <p className="text-white/60 mt-3">
                    Get unlimited ATS reports, interview
                    preparation, resume builder and smart
                    job matching.
                  </p>
                </div>

                <button className="btn-primary px-8 py-4 rounded-xl">
                  Upgrade Now
                </button>
              </div>
            </div>

            {/* Locked Features */}
            <div className="glass-card p-8 mt-8">
              <h2 className="text-2xl font-bold text-white mb-8">
                Premium Features
              </h2>

              <div className="grid md:grid-cols-2 gap-5">
                {[
                  "Unlimited Resume Analysis",
                  "Unlimited ATS Reports",
                  "Interview Preparation",
                  "AI Resume Builder",
                  "Smart Job Matching",
                  "Priority AI Processing",
                ].map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10"
                  >
                    <Lock
                      size={18}
                      className="text-amber-400"
                    />

                    <span className="text-white/70">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* PRO DASHBOARD */}
        {isPro && (
          <>
            {/* Analytics */}
            <div className="grid md:grid-cols-4 gap-6 mt-8">
              <div className="glass-card p-6 hover:-translate-y-2 transition-all">
                <BarChart3 className="text-indigo-400 mb-3" />
                <h2 className="text-4xl font-bold text-white">
                  92
                </h2>
                <p className="text-white/50">
                  ATS Score
                </p>
              </div>

              <div className="glass-card p-6 hover:-translate-y-2 transition-all">
                <FileText className="text-emerald-400 mb-3" />
                <h2 className="text-4xl font-bold text-white">
                  24
                </h2>
                <p className="text-white/50">
                  Reports Generated
                </p>
              </div>

              <div className="glass-card p-6 hover:-translate-y-2 transition-all">
                <Briefcase className="text-cyan-400 mb-3" />
                <h2 className="text-4xl font-bold text-white">
                  18
                </h2>
                <p className="text-white/50">
                  Interview Sessions
                </p>
              </div>

              <div className="glass-card p-6 hover:-translate-y-2 transition-all">
                <Sparkles className="text-amber-400 mb-3" />
                <h2 className="text-4xl font-bold text-white">
                  ∞
                </h2>
                <p className="text-white/50">
                  AI Requests
                </p>
              </div>
            </div>

            {/* Subscription */}
            <div className="glass-card p-8 mt-8">
              <div className="flex items-center gap-3 mb-4">
                <Crown className="text-emerald-400" />

                <h2 className="text-2xl font-bold text-white">
                  Pro Subscription
                </h2>
              </div>

              <div className="flex items-center gap-3 text-emerald-400">
                <Calendar size={18} />

                <span>
                  Active until{" "}
                  {new Date(
                    user!.subscription
                  ).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="glass-card p-8 mt-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                Recent Activity
              </h2>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  Resume analysed successfully
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  ATS Score improved from 81 → 92
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  Interview questions generated
                </div>
              </div>
            </div>
          </>
        )}

        {/* Actions */}
        <div className="glass-card p-8 mt-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            Account Actions
          </h2>

          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
              View Reports
            </button>

            <button className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition flex items-center gap-2">
              Settings
              <ArrowRight size={16} />
            </button>

            <button
              onClick={LogoutUser}
              className="px-6 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition flex items-center gap-2"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Account;`  `