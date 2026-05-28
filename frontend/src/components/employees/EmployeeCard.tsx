import React from 'react';
import type { EmployeeRecord } from '../../types/employee';

interface EmployeeCardProps {
  employee: EmployeeRecord;
  onView: () => void;
  onUpdate: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
}

export default function EmployeeCard({ employee, onView, onUpdate, onDelete }: EmployeeCardProps) {
  return (
    <div 
      onClick={onView}
      className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between h-44 group"
    >
      <div>
        <div className="flex justify-between items-start mb-2">
          <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded">
            {employee.id}
          </span>
          <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
            {employee.department}
          </span>
        </div>

        <h3 className="font-bold text-slate-900 truncate group-hover:text-indigo-600 transition">
          {employee.firstName} {employee.lastName}
        </h3>
        <p className="text-xs text-slate-500 truncate font-medium">{employee.jobTitle}</p>
        <p className="text-xs text-slate-400 font-medium mt-1">
          📍 {employee.country} • <span className="italic">{employee.age} yrs</span>
        </p>
      </div>

      <div className="flex justify-end gap-4 pt-2 border-t border-slate-100">
        <button onClick={onUpdate} className="text-xs font-semibold text-indigo-600 hover:text-indigo-800">
          Update
        </button>
        <button onClick={onDelete} className="text-xs font-semibold text-rose-600 hover:text-rose-800">
          Delete
        </button>
      </div>
    </div>
  );
}
