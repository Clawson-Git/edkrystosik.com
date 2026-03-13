import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Cpu, Users, BarChart3, Zap } from "lucide-react";

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

const ventures = [
  {
    name: "Audity",
    url: "https://auditynow.com",
    role: "Founder",
    tagline: "AI-powered audit platform for consultants",
    description:
      "SaaS that turns 40+ hour manual AI transformation audits into ~15 hour Audity-powered engagements. Built for management, IT, and business strategy consultants who want to add high-value AI audit services to their practice without building the methodology from scratch.",
    stats: [
      { icon: Cpu, label: "Audit automation", value: "60%+ time saved" },
      { icon: Users, label: "Target clients", value: "Independent consultants" },
      { icon: BarChart3, label: "Engagement size", value: "$15K-$50K" },
    ],
    color: "amber",
  },
  {
    name: "RAC Projects AI",
    url: null,
    role: "CAIO",
    tagline: "AI transformation consulting",
    description:
      "Consulting firm helping established businesses navigate AI transformation. We run hands-on audits, build implementation roadmaps, and partner with clients through execution. Not a dev shop. We diagnose the problem, design the solution, and connect the right people to build it.",
    stats: [
      { icon: Zap, label: "Approach", value: "Advisor, not vendor" },
      { icon: Users, label: "Clients", value: "Established businesses" },
      { icon: BarChart3, label: "Pipeline proof", value: "$100K+ from single audit" },
    ],
    color: "sand",
  },
];

export default function Ventures() {
  return (
    <section id="ventures" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <p className="font-mono text-amber-400 text-sm tracking-widest uppercase mb-4">
            Ventures
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="text-3xl md:text-4xl font-bold text-sand-50 mb-4">
            What I'm building
          </h2>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p className="text-sand-400 text-lg mb-16 max-w-2xl">
            Two sides of the same coin. I consult on AI transformation and
            build the tools that make it scalable.
          </p>
        </FadeIn>

        <div className="space-y-8">
          {ventures.map((v, i) => (
            <FadeIn key={v.name} delay={0.2 + i * 0.1}>
              <div className="group bg-sand-900/30 border border-sand-800/50 rounded-2xl p-8 md:p-10 hover:border-sand-700/50 transition-all duration-300">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-sand-50">
                        {v.name}
                      </h3>
                      {v.url && (
                        <a
                          href={v.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sand-500 hover:text-amber-400 transition-colors"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                    <p className="font-mono text-xs text-amber-400/80 uppercase tracking-wider">
                      {v.role}
                    </p>
                  </div>
                </div>

                <p className="text-sand-400 mb-2 font-medium">{v.tagline}</p>
                <p className="text-sand-400 leading-relaxed mb-8">
                  {v.description}
                </p>

                <div className="grid sm:grid-cols-3 gap-4">
                  {v.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-sand-950/50 rounded-lg p-4"
                    >
                      <stat.icon
                        size={16}
                        className="text-amber-400/60 mb-2"
                      />
                      <p className="text-sm text-sand-500 mb-1">
                        {stat.label}
                      </p>
                      <p className="text-sand-200 font-medium text-sm">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
