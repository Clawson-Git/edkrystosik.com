import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Subtle gradient orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-amber-400/5 blur-[120px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-amber-400 text-sm tracking-widest uppercase mb-6"
        >
          Builder / Founder / Operator
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-sand-50 mb-6"
        >
          Ed Krystosik
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-sand-400 max-w-2xl mx-auto leading-relaxed mb-4"
        >
          CAIO at RAC Projects AI. Founder of{" "}
          <a
            href="https://auditynow.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 hover:text-amber-500 transition-colors"
          >
            Audity
          </a>
          .
          <br />
          Helping consultants add AI transformation audits to their practice
          and land $15K-$50K engagements.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-mono text-sm text-sand-500 mb-12"
        >
          Reno, NV &mdash; Near Lake Tahoe & the Bay
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center gap-4"
        >
          <a
            href="#ventures"
            className="px-6 py-3 bg-amber-400 text-sand-950 font-medium rounded-lg hover:bg-amber-500 transition-colors"
          >
            See what I'm building
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-sand-700 text-sand-300 rounded-lg hover:border-sand-500 hover:text-sand-100 transition-colors"
          >
            Get in touch
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sand-600 hover:text-sand-400 transition-colors"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown size={20} />
        </motion.div>
      </motion.a>
    </section>
  );
}
