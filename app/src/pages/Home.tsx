import Hero from "../components/Hero";
import Features from "../components/Features";
import Pricing from "../components/pricing";
import CTABanner from "../components/CTABanner";

const Home = () => {
  return (
    <main className="bg-page overflow-hidden">
      {/* Hero Section */}
      <section>
        <Hero />
      </section>

      {/* Features */}
      <section className="relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-96 h-96 bg-indigo-500/10 blur-3xl rounded-full absolute top-0 left-0" />
          <div className="w-96 h-96 bg-emerald-500/10 blur-3xl rounded-full absolute right-0 bottom-0" />
        </div>

        <div className="relative">
          <Features />
        </div>
      </section>

      {/* Pricing */}
      <section>
        <Pricing />
      </section>

      {/* CTA */}
      <section>
        <CTABanner />
      </section>
    </main>
  );
};

export default Home;