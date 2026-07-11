import { ArrowRight, Users } from "lucide-react";

export default function CommunityCTA() {
  return (
    <aside className="mt-16 border border-base-200 bg-base-50 rounded-xl p-6 md:p-8">
      <div className="flex items-start gap-4">
        <div className="hidden sm:flex w-10 h-10 rounded-full bg-brand-50 text-brand-600 items-center justify-center shrink-0">
          <Users size={18} />
        </div>
        <div className="flex-1">
          <p className="font-mono text-brand-500 text-xs tracking-widest uppercase mb-2">
            AI Transformation Partners
          </p>
          <h3 className="text-xl font-bold text-base-900 mb-2">
            Join the community
          </h3>
          <p className="text-base-500 leading-relaxed mb-4">
            The free AITP community — consultants and operators running AI
            transformation discovery and audits every day. Learn the method
            from the inside.
          </p>
          <a
            href="https://www.skool.com/aitp-launchpad-4785"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand-500 text-white font-medium px-5 py-2.5 rounded-lg hover:bg-brand-600 transition-colors"
          >
            Join the community
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </aside>
  );
}
