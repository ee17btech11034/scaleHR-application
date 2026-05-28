
export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
        <span>© {new Date().getFullYear()} Internal Compensation Platform. All rights reserved.</span>
        <div className="flex gap-4">
          <span>Status: <span className="text-emerald-500 font-semibold">● Operational</span></span>
          <span>v1.0.0</span>
        </div>
      </div>
    </footer>
  );
}
