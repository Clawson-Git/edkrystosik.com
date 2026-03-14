import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

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

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <p className="font-mono text-brand-500 text-sm tracking-widest uppercase mb-4">
            Contact
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="text-3xl md:text-4xl font-bold text-base-900 mb-4">
            Let's talk
          </h2>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p className="text-base-500 text-lg mb-16 max-w-2xl">
            Whether it's AI strategy, a potential collaboration, or just
            a good conversation, I'm always open to connecting.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="bg-brand-500 rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">
              Interested in working together?
            </h3>
            <p className="text-brand-100 mb-8 max-w-lg mx-auto">
              I'm always looking for interesting problems to solve and
              great people to work with. Reach out and let's see where
              the conversation goes.
            </p>
            <a
              href="https://www.linkedin.com/in/ed-krystosik/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-700 font-semibold rounded-lg hover:bg-brand-50 transition-colors"
            >
              Send me a DM on LinkedIn
              <ArrowUpRight size={18} />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
