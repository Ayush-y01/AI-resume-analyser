import { useNavigate } from "react-router-dom";
import { useAppData } from "../context/AppContext";
import { plans } from "../utils";

const Pricing = () => {
  const navigate = useNavigate();
  const { isAuth, user } = useAppData();

  const isPro =
    isAuth &&
    user?.subscription &&
    new Date() < new Date(user.subscription);

  const handleSubscribe = (planName: string) => {
    if (!isAuth) {
      navigate("/login");
      return;
    }

    if (planName === "Free") return;

    // Razorpay Integration Here
    console.log("Subscribe:", planName);
  };

  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-5xl font-bold text-white">
            Simple Pricing
          </h2>

          <p className="text-white/60 mt-4 max-w-2xl mx-auto">
            Start free and upgrade only when you need unlimited
            resume analysis, ATS reports and interview preparation.
          </p>

          {isAuth && (
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mt-8 text-sm
              ${
                isPro
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                  : "bg-white/5 border-white/10 text-white/70"
              }`}
            >
              {isPro
                ? `Pro Active • Expires ${new Date(
                    user!.subscription
                  ).toLocaleDateString("en-IN")}`
                : "Free Plan Active • Includes 3 Free Analyses"}
            </div>
          )}
        </div>

        {/* Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mt-20">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`
                relative rounded-3xl p-8 flex flex-col
                transition-all duration-300
                hover:-translate-y-2
                ${
                  plan.highlight
                    ? "border border-indigo-500 bg-indigo-500/10 shadow-[0_0_40px_rgba(99,102,241,0.2)]"
                    : "border border-white/10 bg-white/[0.03]"
                }
              `}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-6">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-500 text-white">
                    {plan.badge}
                  </span>
                </div>
              )}

              <h3 className="text-2xl font-bold text-white">
                {plan.name}
              </h3>

              <p className="text-white/50 mt-2">
                {plan.desc}
              </p>

              <div className="mt-6">
                <span className="text-5xl font-bold text-white">
                  {plan.price}
                </span>

                <span className="text-white/50">
                  {plan.period}
                </span>
              </div>

              <ul className="space-y-4 mt-8 flex-1">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="text-white/70 flex gap-2"
                  >
                    <span className="text-emerald-400">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              {plan.name === "Free" ? (
                <button
                  disabled
                  className="mt-8 py-3 rounded-xl border border-white/10 text-white/50 cursor-not-allowed"
                >
                  {isPro ? "Previous Plan" : "Current Plan"}
                </button>
              ) : isPro ? (
                <button
                  disabled
                  className="mt-8 py-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 cursor-not-allowed"
                >
                  Already Subscribed
                </button>
              ) : (
                <button
                  onClick={() => handleSubscribe(plan.name)}
                  className={`
                    mt-8 py-3 rounded-xl font-semibold transition-all duration-300
                    ${
                      plan.highlight
                        ? "btn-primary"
                        : "bg-white/6 hover:bg-white/10 border border-white/10 text-white"
                    }
                  `}
                >
                  {plan.cta}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;