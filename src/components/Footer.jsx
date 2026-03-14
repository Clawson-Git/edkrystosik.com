export default function Footer() {
  return (
    <footer className="border-t border-base-200 py-8 px-6">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-base-400">
        <p>&copy; {new Date().getFullYear()} Ed Krystosik</p>
        <p className="font-mono text-xs">Reno, NV — Near Lake Tahoe & the Bay Area</p>
      </div>
    </footer>
  );
}
