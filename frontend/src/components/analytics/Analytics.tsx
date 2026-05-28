import { useCompensationAnalytics } from '../../hooks/useCompensationAnalytics';
import FilterMatrix from './FilterMatrix';
import MetricCard from './MetricCard';

export default function AnalyticsPage() {
  // Pull structured computational telemetry directly from the hook engine
  const { 
    filters, 
    filterOptions, 
    computedMetrics, 
    updateFilter, 
    toggleAllFilter 
  } = useCompensationAnalytics();

  // Extract counts for high-density overview summary reporting metrics context
  const selectedCountriesCount = filters?.country?.length || 0;
  const selectedTitlesCount = filters?.jobTitle?.length || 0;
  const selectedDeptsCount = filters?.department?.length || 0;
  const selectedStatusesCount = filters?.employmentStatus?.length || 0;

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 font-sans text-slate-800 animate-fade-in">
      
      {/* Informative Persona Context Header Segment */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-100 pb-4 gap-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Compensation Analytics Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Aggregating values across <span className="font-semibold text-indigo-600">{selectedCountriesCount}</span> country • Parameters active: <span className="font-semibold text-slate-700">{selectedTitlesCount} titles</span>, <span className="font-semibold text-slate-700">{selectedDeptsCount} depts</span>, <span className="font-semibold text-slate-700">{selectedStatusesCount} statuses</span>
          </p>
        </div>
        
        {/* Metric Target Scale Badge indicator for HR managers */}
        <div className="self-start md:self-auto bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono font-medium text-slate-500 shadow-sm">
          Dataset Scale: 10,000 files
        </div>
      </div>

      {/* Modern Compact Custom Dropdown Floating Filter Toolbar Row */}
      <FilterMatrix 
        filters={filters}
        onFilterChange={updateFilter}
        onBulkToggle={toggleAllFilter}
        options={filterOptions}
      />

      {/* Structured Output Dashboard Real-Time Metric Display Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <MetricCard 
          label="Cohort Minimum Salary" 
          value={computedMetrics?.min || 0} 
          accentColor="bg-amber-400" 
        />
        <MetricCard 
          label="Cohort Average Salary" 
          value={computedMetrics?.avg || 0} 
          accentColor="bg-indigo-500" 
        />
        <MetricCard 
          label="Cohort Maximum Salary" 
          value={computedMetrics?.max || 0} 
          accentColor="bg-emerald-500" 
        />
      </div>

      {/* Ground Footnote: Equity and Data Completeness Context Info Block */}
      <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-5 shadow-inner">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
          Compensation Equity Audit Context
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          The metrics displayed above update automatically in linear execution time whenever selections toggle. Use this cross-section mapping tool to calculate pay parity arrays across global operations, identify outlier salary compressions, and evaluate market benchmark standards for specific groups.
        </p>
      </div>

    </div>
  );
}
