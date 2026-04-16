import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

function formatDate(iso) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/notes")
      .then((r) => r.json())
      .then(setNotes)
      .catch(() => setNotes([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    document.title = "Notes | Ed Krystosik";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", "Thoughts on building, AI strategy, and consulting. Working notes from Ed Krystosik.");
    return () => {
      document.title = "Ed Krystosik — CAIO, Founder, Builder";
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", "Ed Krystosik — CAIO at RAC Projects AI, founder of Audity. Helping consultants add AI transformation audits to their practice.");
    };
  }, []);

  return (
    <section className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-brand-500 text-sm tracking-widest uppercase mb-4">
            Notes
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-base-900 mb-4">
            Thoughts & Ideas
          </h1>
          <p className="text-base-500 text-lg mb-16 max-w-xl">
            Working notes on building, strategy, and whatever else is on my
            mind. Unpolished by design.
          </p>
        </motion.div>

        {loading && (
          <p className="text-base-400 text-center py-16">Loading...</p>
        )}

        <div className="space-y-6">
          {notes.map((note, i) => (
            <motion.div
              key={note.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
            >
              <Link
                to={`/notes/${note.slug}`}
                className="group block bg-base-white border border-base-200 rounded-xl p-6 md:p-8 hover:border-brand-300 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
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
                    <h2 className="text-xl font-bold text-base-900 mb-2 group-hover:text-brand-600 transition-colors">
                      {note.title}
                    </h2>
                    <p className="text-base-500 leading-relaxed">
                      {note.summary}
                    </p>
                  </div>
                  <ArrowRight
                    size={18}
                    className="text-base-300 group-hover:text-brand-500 transition-colors mt-2 shrink-0"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {!loading && notes.length === 0 && (
          <p className="text-base-400 text-center py-16">
            Nothing here yet. Check back soon.
          </p>
        )}
      </div>
    </section>
  );
}
