import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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

const timeline = [
  {
    period: "Now",
    title: "CAIO & Founder",
    org: "RAC/AI / Audity",
    description:
      "Running AI transformation audits for mid-market businesses ($15K-$50K engagements) and building the SaaS platform that lets other consultants do the same. Diagnosing operational bottlenecks, designing implementation roadmaps, and connecting clients with the right teams to execute.",
    skills: ["AI Audits", "Consulting", "Go-to-Market", "Positioning"],
  },
  {
    period: "Previous",
    title: "Technical Operator",
    org: "Silicon Valley & Remote",
    description:
      "Built production systems across SaaS, infrastructure, and analytics. The technical foundation that makes it possible to audit a business end-to-end and know exactly where AI creates real leverage versus where it's just noise.",
    skills: ["SaaS", "Infrastructure", "Analytics", "Systems Design"],
  },
  {
    period: "Foundation",
    title: "Builder's Mindset",
    org: "Ohio → Chicago → Bay Area → Reno-Tahoe",
    description:
      "Started in Ohio, spent a decade at JPMorgan in Chicago, then moved to the Bay Area and plugged into the Silicon Valley network. But instead of joining a big company, chose the builder's path. That decision shaped everything that came after.",
    skills: ["First Principles", "Product Thinking", "Self-Reliance"],
  },
];

const coreSkills = [
  { category: "Advisory", items: ["AI Transformation Strategy", "Audit Methodology & Delivery", "Go-to-Market & Positioning", "Client Engagement Design"] },
  { category: "Consulting", items: ["Process Diagnosis & Optimization", "ROI Analysis & Business Cases", "Implementation Roadmap Design", "Change Management & Adoption"] },
  { category: "Domain Expertise", items: ["AI/ML for Mid-Market & Enterprise", "SaaS Product Strategy", "Biotechnology Commercialization", "Nonprofit Financial Strategy"] },
];

export default function Background() {
  return (
    <section id="background" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <p className="font-mono text-brand-500 text-sm tracking-widest uppercase mb-4">
            Background
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="text-3xl md:text-4xl font-bold text-base-900 mb-4">
            How I got here
          </h2>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p className="text-base-500 text-lg mb-16 max-w-2xl">
            Not the traditional path. Technical enough to build it, strategic
            enough to know what's worth building.
          </p>
        </FadeIn>

        {/* Timeline */}
        <div className="relative space-y-12 mb-24">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-base-200" />

          {timeline.map((item, i) => (
            <FadeIn key={item.period} delay={0.2 + i * 0.1}>
              <div className="relative pl-10">
                <div className="absolute left-0 top-2 w-[15px] h-[15px] rounded-full border-2 border-brand-500 bg-base-white" />

                <p className="font-mono text-xs text-brand-500 uppercase tracking-wider mb-1">
                  {item.period}
                </p>
                <h3 className="text-xl font-bold text-base-800 mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-base-400 mb-3">{item.org}</p>
                <p className="text-base-600 leading-relaxed mb-4">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs font-mono text-brand-700 bg-brand-50 border border-brand-100 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Skills grid */}
        <FadeIn delay={0.2}>
          <h3 className="text-xl font-bold text-base-800 mb-8">
            Core skills
          </h3>
        </FadeIn>

        <div className="grid sm:grid-cols-3 gap-6">
          {coreSkills.map((group, i) => (
            <FadeIn key={group.category} delay={0.3 + i * 0.1}>
              <div className="bg-base-50 border border-base-200 rounded-xl p-6">
                <p className="font-mono text-xs text-brand-500 uppercase tracking-wider mb-4">
                  {group.category}
                </p>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="text-base-600 text-sm">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
