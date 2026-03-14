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
    title: "Outdoors",
    description:
      "Based near Lake Tahoe for a reason. Skiing, snowboarding, and time in the mountains are how I recharge.",
  },
  {
    icon: Dumbbell,
    title: "Fitness",
    description:
      "Consistent training, functional movement, and a health-first lifestyle. The discipline carries over to everything else.",
  },
  {
    icon: UtensilsCrossed,
    title: "Food & Wellness",
    description:
      "Serious about nutrition and natural health. Good food, holistic thinking, and a preventative approach to wellness.",
  },
  {
    icon: Plane,
    title: "Travel",
    description:
      "Built my life around mobility. Reno sits between Tahoe and the Bay, with easy access to everywhere else.",
  },
  {
    icon: Brain,
    title: "Curiosity",
    description:
      "AI and biotech for work, but the interests go wider. Always exploring new domains and going deep on whatever catches my attention.",
  },
  {
    icon: Heart,
    title: "Family",
    description:
      "Close family relationships are non-negotiable. They keep everything else grounded.",
  },
];

export default function Interests() {
  return (
    <section id="interests" className="py-32 px-6 bg-base-50">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <p className="font-mono text-brand-500 text-sm tracking-widest uppercase mb-4">
            Beyond Work
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="text-3xl md:text-4xl font-bold text-base-900 mb-4">
            What else matters
          </h2>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p className="text-base-500 text-lg mb-16 max-w-2xl">
            Building a business is a marathon, not a sprint. These are the
            things that keep the engine running.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {interests.map((item, i) => (
            <FadeIn key={item.title} delay={0.2 + i * 0.05}>
              <div className="group bg-base-white border border-base-200 rounded-xl p-6 hover:border-brand-300 hover:shadow-md transition-all duration-300 h-full">
                <item.icon
                  size={24}
                  className="text-brand-400 mb-4 group-hover:text-brand-500 transition-colors"
                />
                <h3 className="text-lg font-semibold text-base-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-base-500 text-sm leading-relaxed">
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
