interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  onAddClick: () => void;
}

export default function SearchBar({ value, onChange, onAddClick }: SearchBarProps) {
  return (
    <div className="flex gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
      <input
        type="text"
        placeholder="Search employees by name, title, country or ID..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        onClick={onAddClick}
        className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2 rounded-lg text-sm transition shrink-0"
      >
        + Add Employee
      </button>
    </div>
  );
}
