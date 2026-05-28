import React, { useState, useRef, useEffect } from 'react';

interface DropdownMultiSelectProps {
  label: string;
  options: { id: string; label: string }[];
  selectedValues: string[];
  onToggle: (id: string) => void;
  onBulkToggle: (action: 'select' | 'deselect') => void;
}

export default function DropdownMultiSelect({
  label,
  options,
  selectedValues,
  onToggle,
  onBulkToggle,
}: DropdownMultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close the dropdown instantly when clicking outside of it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalSelected = selectedValues.length;
  const isAllSelected = totalSelected === options.length;

  return (
    <div ref={containerRef} className="relative w-full text-slate-800">
      <label className="text-xs font-semibold text-slate-500 block mb-1">{label}</label>
      
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-left font-medium flex justify-between items-center hover:bg-slate-100/50 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <span className="truncate">
          {isAllSelected 
            ? `All Selected (${totalSelected})` 
            : totalSelected === 1 
              ? options.find(o => o.id === selectedValues[0])?.label || selectedValues[0]
              : `${totalSelected} Selected`
          }
        </span>
        <span className={`text-slate-400 text-xs transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {/* Floating Menu Matrix */}
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-xl p-3 space-y-2 max-h-64 flex flex-col">
          
          {/* Quick Utility Header Controls */}
          <div className="flex justify-between items-center border-b border-slate-100 pb-2 text-[11px] font-bold text-indigo-600 shrink-0">
            <span>Selection Criteria</span>
            <div className="flex gap-2">
              <button type="button" onClick={() => onBulkToggle('select')} className="hover:text-indigo-800 transition">Select All</button>
              <span className="text-slate-200">|</span>
              <button type="button" onClick={() => onBulkToggle('deselect')} className="hover:text-indigo-800 transition">Reset</button>
            </div>
          </div>

          {/* Scrolling Options Body */}
          <div className="overflow-y-auto space-y-1 flex-1 pr-1">
            {options.map((opt) => {
              const active = selectedValues.includes(opt.id);
              return (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => onToggle(opt.id)}
                  className={`w-full text-left text-xs px-2.5 py-2 rounded-lg border font-medium transition flex justify-between items-center ${
                    active 
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-semibold' 
                      : 'bg-white border-transparent text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="truncate">{opt.label}</span>
                  {active && <span className="text-[10px] font-bold">✓</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
