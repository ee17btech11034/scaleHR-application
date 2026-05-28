export default function Home() {
  return (
    <div className="max-w-4xl mx-auto py-6">
      {/* Hero Header Section */}
      <div className="text-center border-b border-slate-200 pb-10 mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Global Salary & Workspace Insights
        </h1>
        <p className="mt-3 text-lg text-slate-500 max-w-2xl mx-auto">
          Enterprise Compensation Management Engine built to optimize localized payroll transparency and operational transparency.
        </p>
      </div>

      {/* Problem Statement & Mission Architecture */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-8">
        <div>
          <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">
            The Core Objective
          </h2>
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
            Managing Compensation Architecture at Scale
          </h3>
          <p className="mt-3 text-slate-600 leading-relaxed text-sm sm:text-base">
            This platform resolves a fundamental organizational hurdle: providing an <strong>HR Manager</strong> with a unified, high-density dashboard workspace to manage a global registry of <strong>10,000+ employees</strong>. It balances individual profile lifecycle administration with macro-level cross-country financial auditing.
          </p>
        </div>

        {/* Requirements Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
          {/* Pillar 1 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-lg bg-indigo-50 text-indigo-600 font-bold text-sm">
              01
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 text-base">Directory Operations</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Full programmatic lifecycle controls (Add, View, Update, Delete) across standardized properties including full names, structural job titles, countries, baseline salaries, departments, and active employment types.
              </p>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-lg bg-indigo-50 text-indigo-600 font-bold text-sm">
              02
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 text-base">Aggregate Analytics Matrices</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Instant extraction of regional payroll data vectors (minimum, average, and maximum payouts) grouped by operational operational bounds like country and job title without incurring expensive table scans.
              </p>
            </div>
          </div>
        </div>

        {/* Engineering Performance Highlights */}
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            Technical Optimization Strategy
          </h4>
          <ul className="space-y-2 text-xs text-slate-600">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
              <strong>High-Speed DB Seeding:</strong> Utilizing transactional batch execution wrappers to register 10k entities in under 1.5s.
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
              <strong>Indexed Data Querying:</strong> Explicit indexing across country, title, and department constraints to guarantee O(1) mathematical lookups.
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
              <strong>Server-Side Pagination:</strong> Chunking system rendering loops into localized fragments to bypass browser viewport resource lagging.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
