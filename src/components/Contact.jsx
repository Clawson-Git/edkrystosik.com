import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Linkedin, Globe, ArrowUpRight } from "lucide-react";

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

const links = [
  {
    icon: Mail,
    label: "Email",
    value: "ed@racprojects.ai",
    href: "mailto:ed@racprojects.ai",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Connect with me",
    href: "https://linkedin.com/in/edkrystosik",
  },
  {
    icon: Globe,
    label: "Audity",
    value: "auditynow.com",
    href: "https://auditynow.com",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <p className="font-mono text-amber-400 text-sm tracking-widest uppercase mb-4">
            Contact
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="text-3xl md:text-4xl font-bold text-sand-50 mb-4">
            Let's talk
          </h2>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p className="text-sand-400 text-lg mb-16 max-w-2xl">
            Whether you're a consultant looking to add AI audits to your
            practice, or you just want to connect, I'm always up for a
            real conversation.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          {links.map((link, i) => (
            <FadeIn key={link.label} delay={0.2 + i * 0.1}>
              <a
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-start gap-4 bg-sand-900/30 border border-sand-800/50 rounded-xl p-6 hover:border-amber-400/30 hover:bg-sand-900/50 transition-all duration-300"
              >
                <link.icon
                  size={20}
                  className="text-amber-400/60 mt-0.5 group-hover:text-amber-400 transition-colors"
                />
                <div className="flex-1">
                  <p className="font-mono text-xs text-sand-500 uppercase tracking-wider mb-1">
                    {link.label}
                  </p>
                  <p className="text-sand-200 group-hover:text-sand-50 transition-colors">
                    {link.value}
                  </p>
                </div>
                <ArrowUpRight
                  size={16}
                  className="text-sand-700 group-hover:text-amber-400/60 transition-colors mt-1"
                />
              </a>
            </FadeIn>
          ))}
        </div>

        {/* CTA */}
        <FadeIn delay={0.4}>
          <div className="bg-gradient-to-br from-sand-900/50 to-sand-900/20 border border-sand-800/50 rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-2xl font-bold text-sand-50 mb-3">
              Want to add AI audits to your consulting practice?
            </h3>
            <p className="text-sand-400 mb-8 max-w-lg mx-auto">
              Audity helps consultants run AI transformation audits in a
              fraction of the time, and land $15K-$50K engagements doing it.
            </p>
            <a
              href="https://auditynow.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-amber-400 text-sand-950 font-semibold rounded-lg hover:bg-amber-500 transition-colors"
            >
              Learn more at Audity
              <ArrowUpRight size={18} />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
