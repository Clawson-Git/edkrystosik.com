import { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { marked } from "marked";

function formatDate(iso) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function NoteDetail() {
  const { slug } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/notes/${slug}`)
      .then((r) => {
        if (!r.ok) throw new Error("not found");
        return r.json();
      })
      .then(setNote)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    if (note) {
      document.title = `${note.title} | Ed Krystosik`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", note.summary);
    }
    return () => {
      document.title = "Ed Krystosik — CAIO, Founder, Builder";
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", "Ed Krystosik — CAIO at RAC Projects AI, founder of Audity. Helping consultants add AI transformation audits to their practice.");
    };
  }, [note]);

  if (notFound) return <Navigate to="/notes" replace />;

  if (loading) {
    return (
      <section className="pt-32 pb-24 px-6 min-h-screen">
        <div className="max-w-3xl mx-auto">
          <p className="text-base-400 text-center py-16">Loading...</p>
        </div>
      </section>
    );
  }

  // Content is authored by Ed via the secured API (not user-generated)
  const contentHtml = { __html: marked.parse(note.content) };

  return (
    <section className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/notes"
            className="inline-flex items-center gap-2 text-sm text-base-400 hover:text-brand-500 transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back to notes
          </Link>

          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <p className="font-mono text-xs text-base-400">
                {formatDate(note.date)}
              </p>
              {note.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-xs font-mono text-brand-600 bg-brand-50 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-base-900">
              {note.title}
            </h1>
          </div>

          <div
            className="prose prose-lg max-w-none
              [&_p]:text-base-600 [&_p]:leading-relaxed [&_p]:mb-5
              [&_a]:text-brand-500 [&_a]:underline [&_a:hover]:text-brand-600
              [&_strong]:text-base-800 [&_strong]:font-semibold
              [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-base-900 [&_h2]:mt-10 [&_h2]:mb-4
              [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-base-900 [&_h3]:mt-8 [&_h3]:mb-3
              [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-5 [&_li]:text-base-600 [&_li]:mb-2
              [&_blockquote]:border-l-4 [&_blockquote]:border-brand-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-base-500"
            dangerouslySetInnerHTML={contentHtml}
          />
        </motion.div>
      </div>
    </section>
  );
}
