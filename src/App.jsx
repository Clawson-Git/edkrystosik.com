import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Ventures from "./components/Ventures";
import Background from "./components/Background";
import Interests from "./components/Interests";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <div className="border-t border-sand-800/20" />
      <About />
      <div className="border-t border-sand-800/20" />
      <Ventures />
      <div className="border-t border-sand-800/20" />
      <Background />
      <div className="border-t border-sand-800/20" />
      <Interests />
      <div className="border-t border-sand-800/20" />
      <Contact />
      <Footer />
    </div>
  );
}
