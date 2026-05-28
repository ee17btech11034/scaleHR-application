interface MetricCardProps {
  label: string;
  value: number;
  accentColor: string; // Tailwind structural class color flag (e.g., "bg-indigo-500")
}

export default function MetricCard({ label, value, accentColor }: MetricCardProps) {
  // Prevent printing NaN or Infinity fields if calculations fluctuate
  const cleanDisplayValue = typeof value === 'number' && isFinite(value) && value > 0 
    ? `$${value.toLocaleString()}` 
    : '$0';

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex items-center gap-4 relative overflow-hidden">
      {/* Visual Accent Border Strip Indicator */}
      <div className={`absolute top-0 bottom-0 left-0 w-1.5 ${accentColor}`} />
      
      <div className="space-y-1 pl-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
          {label}
        </span>
        <h3 className="text-2xl font-black text-slate-800 tracking-tight">
          {cleanDisplayValue}
        </h3>
      </div>
    </div>
  );
}
