import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Cpu, Users, BarChart3, Zap, FlaskConical, Heart } from "lucide-react";

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
    role: "Co-Founder",
    tagline: "AI-powered audit platform",
    description:
      "SaaS that turns 40+ hour manual AI transformation audits into ~15 hour engagements. Built for management, IT, and business strategy consultants who want to add high-value AI audit services to their practice without building the methodology from scratch.",
    stats: [
      { icon: Cpu, label: "Audit automation", value: "60%+ time saved" },
      { icon: Users, label: "Target clients", value: "Independent consultants" },
      { icon: BarChart3, label: "Engagement type", value: "High-value advisory" },
    ],
  },
  {
    name: "RAC/AI",
    url: null,
    role: "CAIO",
    tagline: "AI transformation consulting & advisory",
    description:
      "Consulting firm helping established businesses navigate AI transformation. We run hands-on audits, build implementation roadmaps, and partner with clients through execution. We diagnose the problem, design the solution, and connect the right people to build it.",
    stats: [
      { icon: Zap, label: "Approach", value: "Advisor, not vendor" },
      { icon: Users, label: "Clients", value: "Established businesses" },
      { icon: BarChart3, label: "Results", value: "Measurable ROI, every engagement" },
    ],
  },
  {
    name: "Artana Bio",
    url: null,
    role: "Co-Founder",
    tagline: "Biotechnology venture",
    description:
      "Building at the frontier of biotechnology and precision medicine. Artana Bio sits at the intersection of scientific research and commercial application, bringing new biological insights closer to real-world impact.",
    stats: [
      { icon: FlaskConical, label: "Domain", value: "Biotech & precision medicine" },
      { icon: Zap, label: "Stage", value: "Early-stage" },
      { icon: Users, label: "Role", value: "Co-Founder" },
    ],
  },
  {
    name: "Med13 Foundation",
    url: null,
    role: "Finance Director",
    tagline: "Nonprofit advancing medical research",
    description:
      "Serving as Finance Director for the Med13 Foundation, overseeing financial operations and strategy for a nonprofit dedicated to advancing medical research and improving patient outcomes.",
    stats: [
      { icon: Heart, label: "Mission", value: "Medical research" },
      { icon: BarChart3, label: "Function", value: "Financial strategy" },
      { icon: Users, label: "Role", value: "Finance Director" },
    ],
  },
];

export default function Ventures() {
  return (
    <section id="ventures" className="py-32 px-6 bg-base-50">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <p className="font-mono text-brand-500 text-sm tracking-widest uppercase mb-4">
            Ventures
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="text-3xl md:text-4xl font-bold text-base-900 mb-4">
            What I'm building
          </h2>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p className="text-base-500 text-lg mb-16 max-w-2xl">
            Across AI, biotech, consulting, and nonprofit work. Different
            domains, same approach: build it, run it, stay hands-on.
          </p>
        </FadeIn>

        <div className="space-y-8">
          {ventures.map((v, i) => (
            <FadeIn key={v.name} delay={0.2 + i * 0.1}>
              <div className="group bg-base-white border border-base-200 rounded-2xl p-8 md:p-10 hover:border-brand-300 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-base-900">
                        {v.name}
                      </h3>
                      {v.url && (
                        <a
                          href={v.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-base-400 hover:text-brand-500 transition-colors"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                    <p className="font-mono text-xs text-brand-500 uppercase tracking-wider">
                      {v.role}
                    </p>
                  </div>
                </div>

                <p className="text-base-600 mb-2 font-medium">{v.tagline}</p>
                <p className="text-base-500 leading-relaxed mb-8">
                  {v.description}
                </p>

                <div className="grid sm:grid-cols-3 gap-4">
                  {v.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-base-50 rounded-lg p-4"
                    >
                      <stat.icon
                        size={16}
                        className="text-brand-400 mb-2"
                      />
                      <p className="text-sm text-base-400 mb-1">
                        {stat.label}
                      </p>
                      <p className="text-base-800 font-medium text-sm">
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
