import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mountain, Dumbbell, UtensilsCrossed, Plane, Brain, Heart } from "lucide-react";

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

const interests = [
  {
    icon: Mountain,
    title: "Snow Sports",
    description:
      "Living near Lake Tahoe means winter is the best season. Skiing and snowboarding are how I reset. Nothing clears your head like cold air and steep terrain.",
  },
  {
    icon: Dumbbell,
    title: "Fitness",
    description:
      "Consistent training, not trends. The discipline of showing up every day carries over to everything else. Health-conscious approach that leans functional and sustainable.",
  },
  {
    icon: UtensilsCrossed,
    title: "Food",
    description:
      "Serious about what I eat, but not in a restrictive way. Good food is one of the best parts of life. Always exploring new spots and cooking at home.",
  },
  {
    icon: Plane,
    title: "Travel",
    description:
      "Location independence isn't just a work strategy. Reno sits right between Tahoe and the Bay, with easy access to everywhere else. Built my life around mobility.",
  },
  {
    icon: Brain,
    title: "Intellectual Curiosity",
    description:
      "AI and functional programming for work, but the curiosity goes wider. VR, homeopathy, natural health, whatever catches my attention. Never stop learning.",
  },
  {
    icon: Heart,
    title: "Family",
    description:
      "Close family relationships are non-negotiable. My brother Jeremy is also my business partner. My dad's 35+ years in natural medicine shaped how I think about health and wellness.",
  },
];

export default function Interests() {
  return (
    <section id="interests" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <p className="font-mono text-amber-400 text-sm tracking-widest uppercase mb-4">
            Beyond Work
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="text-3xl md:text-4xl font-bold text-sand-50 mb-4">
            What else matters
          </h2>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p className="text-sand-400 text-lg mb-16 max-w-2xl">
            Building a business is a marathon, not a sprint. These are the
            things that keep the engine running.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {interests.map((item, i) => (
            <FadeIn key={item.title} delay={0.2 + i * 0.05}>
              <div className="group bg-sand-900/20 border border-sand-800/30 rounded-xl p-6 hover:border-sand-700/50 hover:bg-sand-900/40 transition-all duration-300 h-full">
                <item.icon
                  size={24}
                  className="text-amber-400/50 mb-4 group-hover:text-amber-400/80 transition-colors"
                />
                <h3 className="text-lg font-semibold text-sand-100 mb-2">
                  {item.title}
                </h3>
                <p className="text-sand-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
