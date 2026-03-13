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
    org: "RAC Projects AI / Audity",
    description:
      "Leading AI transformation strategy and building the SaaS platform that makes it scalable. Running client audits ($15K-$50K), building Audity's product, writing content, and running webinars. Hands-on across the full stack.",
    skills: ["AI Strategy", "SaaS", "TypeScript", "Content", "Sales"],
  },
  {
    period: "Previous",
    title: "Technical Operator",
    org: "Silicon Valley & Remote",
    description:
      "Deep technical work across email infrastructure, DNS/SMTP systems, SaaS development, and analytics platforms. Built production systems, not just prototypes. The kind of engineering background where you understand what's happening at every layer.",
    skills: ["Email Infra", "DNS/SMTP", "Full-Stack", "DevOps", "Analytics"],
  },
  {
    period: "Foundation",
    title: "Builder's Mindset",
    org: "Bay Area Network",
    description:
      "Grew up in the Silicon Valley ecosystem. Friends at Meta and across the tech industry. But instead of joining a big company, chose the builder's path. That decision shaped everything that came after.",
    skills: ["Engineering", "Product Thinking", "Self-Reliance"],
  },
];

const coreSkills = [
  { category: "Business", items: ["AI Transformation Strategy", "Content Marketing", "Sales & Positioning", "Webinar Production"] },
  { category: "Technical", items: ["TypeScript / Node.js", "Email Infrastructure & DNS", "SaaS Architecture", "PostHog Analytics"] },
  { category: "Tools", items: ["Claude / AI Agents", "Vite / React", "Docker / PM2", "Sanity CMS"] },
];

export default function Background() {
  return (
    <section id="background" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <p className="font-mono text-amber-400 text-sm tracking-widest uppercase mb-4">
            Background
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="text-3xl md:text-4xl font-bold text-sand-50 mb-4">
            How I got here
          </h2>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p className="text-sand-400 text-lg mb-16 max-w-2xl">
            Not the traditional path. Technical enough to build it, strategic
            enough to know what's worth building.
          </p>
        </FadeIn>

        {/* Timeline */}
        <div className="relative space-y-12 mb-24">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-sand-800/50" />

          {timeline.map((item, i) => (
            <FadeIn key={item.period} delay={0.2 + i * 0.1}>
              <div className="relative pl-10">
                <div className="absolute left-0 top-2 w-[15px] h-[15px] rounded-full border-2 border-amber-400/60 bg-sand-950" />

                <p className="font-mono text-xs text-amber-400/80 uppercase tracking-wider mb-1">
                  {item.period}
                </p>
                <h3 className="text-xl font-bold text-sand-100 mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-sand-500 mb-3">{item.org}</p>
                <p className="text-sand-400 leading-relaxed mb-4">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs font-mono text-sand-400 bg-sand-900/50 border border-sand-800/30 rounded-full"
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
          <h3 className="text-xl font-bold text-sand-100 mb-8">
            Core skills
          </h3>
        </FadeIn>

        <div className="grid sm:grid-cols-3 gap-6">
          {coreSkills.map((group, i) => (
            <FadeIn key={group.category} delay={0.3 + i * 0.1}>
              <div className="bg-sand-900/30 border border-sand-800/50 rounded-xl p-6">
                <p className="font-mono text-xs text-amber-400/80 uppercase tracking-wider mb-4">
                  {group.category}
                </p>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="text-sand-300 text-sm">
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
