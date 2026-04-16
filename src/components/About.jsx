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
          <p className="font-mono text-brand-500 text-sm tracking-widest uppercase mb-4">
            About
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="text-3xl md:text-4xl font-bold text-base-900 mb-8">
            Operator first. Always building.
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-5 gap-12">
          <div className="md:col-span-3 space-y-6">
            <FadeIn delay={0.2}>
              <p className="text-base-600 leading-relaxed text-lg">
                I'm the kind of person who can't just advise on something without
                building it myself first. I've spent years at the intersection of
                deep technical work and business strategy, and that's where I do
                my best thinking.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-base-600 leading-relaxed text-lg">
                Right now I'm running multiple ventures across AI, biotech, and
                nonprofit work. I co-founded Audity to bring AI-powered audits to
                market. I advise businesses on AI transformation through RAC/AI.
                I'm building Artana Bio at the frontier of
                biotechnology. And I serve as Finance Director at the Med13
                Foundation.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <p className="text-base-600 leading-relaxed text-lg">
                The through line is the same: I build things that matter, I stay
                hands-on, and I don't sell anything I wouldn't use myself.
              </p>
            </FadeIn>
          </div>

          <div className="md:col-span-2">
            <FadeIn delay={0.3}>
              <div className="bg-base-50 border border-base-200 rounded-xl p-6 space-y-5">
                <div>
                  <p className="font-mono text-xs text-base-400 uppercase tracking-wider mb-1">
                    Roles
                  </p>
                  <p className="text-base-800">Co-founder, Advisor, Operator</p>
                </div>
                <div>
                  <p className="font-mono text-xs text-base-400 uppercase tracking-wider mb-1">
                    Ventures
                  </p>
                  <p className="text-base-800">Audity, RAC/AI, Artana Bio, Med13</p>
                </div>
                <div>
                  <p className="font-mono text-xs text-base-400 uppercase tracking-wider mb-1">
                    Based in
                  </p>
                  <p className="text-base-800">Reno, NV — Near Lake Tahoe & the Bay Area</p>
                </div>
                <div>
                  <p className="font-mono text-xs text-base-400 uppercase tracking-wider mb-1">
                    Focus areas
                  </p>
                  <p className="text-base-800">
                    AI, biotech, business strategy
                  </p>
                </div>
                <div>
                  <p className="font-mono text-xs text-base-400 uppercase tracking-wider mb-1">
                    Expertise
                  </p>
                  <p className="text-base-800">
                    AI audits, transformation strategy, SaaS, go-to-market
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
