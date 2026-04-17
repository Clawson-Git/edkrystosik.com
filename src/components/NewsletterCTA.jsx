import { ArrowRight, Mail } from "lucide-react";

export default function NewsletterCTA() {
  return (
    <aside className="mt-16 border border-base-200 bg-base-50 rounded-xl p-6 md:p-8">
      <div className="flex items-start gap-4">
        <div className="hidden sm:flex w-10 h-10 rounded-full bg-brand-50 text-brand-600 items-center justify-center shrink-0">
          <Mail size={18} />
        </div>
        <div className="flex-1">
          <p className="font-mono text-brand-500 text-xs tracking-widest uppercase mb-2">
            The CAIO Newsletter
          </p>
          <h3 className="text-xl font-bold text-base-900 mb-2">
            Get notes like this in your inbox.
          </h3>
          <p className="text-base-500 leading-relaxed mb-4">
            Weekly dispatches on AI strategy, consulting, and building Audity.
            No fluff.
          </p>
          <a
            href="https://newsletter.edkrystosik.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand-500 text-white font-medium px-5 py-2.5 rounded-lg hover:bg-brand-600 transition-colors"
          >
            Subscribe to The CAIO
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </aside>
  );
}
