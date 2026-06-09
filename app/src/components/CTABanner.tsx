const CTABanner = () => {
  return (
    <section className="py-24 px-6">
      <div
        className="max-w-6xl mx-auto rounded-[40px]
        bg-gradient-to-r from-indigo-600 to-cyan-600
        p-12 md:p-20 text-center"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-white">
          Ready To Transform
          <br />
          Your Career?
        </h2>

        <p className="mt-6 text-white/80 max-w-2xl mx-auto">
          Join thousands of learners improving their skills,
          building projects and getting hired faster.
        </p>

        <button
          className="mt-10 px-10 py-4 rounded-xl
          bg-white text-black font-semibold"
        >
          Start For Free
        </button>
      </div>
    </section>
  );
};

export default CTABanner;