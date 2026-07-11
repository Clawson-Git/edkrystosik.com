import Hero from "../components/Hero";
import About from "../components/About";
import Ventures from "../components/Ventures";
import Background from "../components/Background";
import Interests from "../components/Interests";
import Contact from "../components/Contact";
import CommunityCTA from "../components/CommunityCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Ventures />
      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <CommunityCTA />
        </div>
      </section>
      <Background />
      <Interests />
      <Contact />
    </>
  );
}
