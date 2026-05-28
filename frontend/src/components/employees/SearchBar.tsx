interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void; // New: Intercepts the explicit server submission
  onAddClick: () => void;
}

export default function SearchBar({ value, onChange, onSubmit, onAddClick }: SearchBarProps) {
  return (
    <form 
      onSubmit={onSubmit} 
      className="flex gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm items-center"
    >
      {/* Search Input field wrapper */}
      <div className="flex-1 relative">
        <input
          type="text"
          placeholder="Search employees by name, title, country or ID..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
        />
        {value.trim() && (
          <span className="absolute right-3 top-2.5 text-[10px] bg-slate-200 text-slate-500 font-bold px-1.5 py-0.5 rounded tracking-wide animate-fade-in pointer-events-none">
            ↵ Enter
          </span>
        )}
      </div>

      {/* Explicit Search Action Trigger Button */}
      <button
        type="submit"
        className="bg-slate-800 hover:bg-slate-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition shrink-0 shadow-sm"
      >
        Search
      </button>

      {/* Separator Divider */}
      <div className="h-6 w-px bg-slate-200" />

      {/* Onboarding Trigger Button */}
      <button
        type="button"
        onClick={onAddClick}
        className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2 rounded-lg text-sm transition shrink-0 shadow-sm"
      >
        + Add Employee
      </button>
    </form>
  );
}
