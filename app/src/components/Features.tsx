import {Features as features } from "../utils"
const Features = () => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-5xl font-bold text-white">
          Four Tools. One{" "}
          <span className="text-gradient">
            Career Leap
          </span>
        </h2>

        <p className="text-center text-white/60 mt-4 max-w-2xl mx-auto">
          Everything you need to improve your resume,
          prepare for interviews and land better jobs.
        </p>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 mt-20">
          {features.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="
                glass-card
                p-8
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-indigo-500/40
                group
                "
              >
                <div
                  className={`
                  w-14 h-14 rounded-2xl
                  flex items-center justify-center
                  bg-white/5 mb-6
                  ${item.color}
                  `}
                >
                  <Icon size={28} />
                </div>

                <h3 className="text-xl font-semibold text-white">
                  {item.title}
                </h3>

                <p className="text-white/60 mt-3">
                  {item.desc}
                </p>

                <ul className="mt-6 space-y-3">
                  {item.bullets.map((bullet: string) => (
                    <li
                      key={bullet}
                      className="text-sm text-white/70 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;