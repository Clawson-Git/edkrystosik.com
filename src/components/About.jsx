import { motion } from "framer-motion";
import { useInView } from "framer-motion";
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

export default function About() {
  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <p className="font-mono text-amber-400 text-sm tracking-widest uppercase mb-4">
            About
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="text-3xl md:text-4xl font-bold text-sand-50 mb-8">
            Operator first. Always building.
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-5 gap-12">
          <div className="md:col-span-3 space-y-6">
            <FadeIn delay={0.2}>
              <p className="text-sand-300 leading-relaxed text-lg">
                I'm the kind of person who can't just advise on something without
                building it myself first. I've spent years at the intersection of
                deep technical work and business strategy, and that's where I do
                my best thinking.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-sand-300 leading-relaxed text-lg">
                Right now I'm focused on one thing: making AI transformation
                audits accessible to independent consultants. The big firms
                charge $200K+ for these engagements. I believe the best
                consultants out there, the ones with real client relationships
                and domain expertise, should be able to offer the same value at a
                fraction of the cost.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <p className="text-sand-300 leading-relaxed text-lg">
                That's why I built Audity. And it's why I run AI audits myself,
                for real clients, before I ever ask someone else to use the
                platform. I don't sell tools I wouldn't use.
              </p>
            </FadeIn>
          </div>

          <div className="md:col-span-2">
            <FadeIn delay={0.3}>
              <div className="bg-sand-900/50 border border-sand-800/50 rounded-xl p-6 space-y-5">
                <div>
                  <p className="font-mono text-xs text-sand-500 uppercase tracking-wider mb-1">
                    Role
                  </p>
                  <p className="text-sand-200">CAIO at RAC Projects AI</p>
                </div>
                <div>
                  <p className="font-mono text-xs text-sand-500 uppercase tracking-wider mb-1">
                    Building
                  </p>
                  <p className="text-sand-200">Audity (auditynow.com)</p>
                </div>
                <div>
                  <p className="font-mono text-xs text-sand-500 uppercase tracking-wider mb-1">
                    Based in
                  </p>
                  <p className="text-sand-200">Reno, NV</p>
                </div>
                <div>
                  <p className="font-mono text-xs text-sand-500 uppercase tracking-wider mb-1">
                    Focus
                  </p>
                  <p className="text-sand-200">
                    AI transformation for consultants
                  </p>
                </div>
                <div>
                  <p className="font-mono text-xs text-sand-500 uppercase tracking-wider mb-1">
                    Technical depth
                  </p>
                  <p className="text-sand-200">
                    SaaS, email infra, DNS, analytics, full-stack
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
