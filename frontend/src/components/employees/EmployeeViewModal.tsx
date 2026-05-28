import type { EmployeeRecord } from '../../types/employee';
import { employmentStatusTypes } from '../../data/employementConstants';
import { operational_country_details } from '../../data/countries';

interface EmployeeViewModalProps {
  employee: EmployeeRecord;
  onClose: () => void;
  onModify: () => void;
}

export default function EmployeeViewModal({ employee, onClose, onModify }: EmployeeViewModalProps) {
  const statusLabel = employmentStatusTypes.find(s => s.id === employee.employmentStatus)?.name || employee.employmentStatus;
  const countryLabel = operational_country_details.find(s => s.code === employee.country)?.name || employee.country;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl border border-slate-100">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-lg font-bold text-slate-900">Employee Profile</h2>
          <span className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded font-medium text-slate-500">#{employee.id}</span>
        </div>

        <div className="space-y-3 text-sm">
          <div>
            <span className="font-semibold text-slate-400 block text-[10px] uppercase tracking-wider">Full Name</span> 
            <p className="text-slate-900 font-medium">{employee.firstName} {employee.lastName} <span className="text-slate-400 font-normal">({employee.age} yrs)</span></p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-semibold text-slate-400 block text-[10px] uppercase tracking-wider">Designation</span> 
              <p className="text-slate-800">{employee.jobTitle}</p>
            </div>
            <div>
              <span className="font-semibold text-slate-400 block text-[10px] uppercase tracking-wider">Status</span> 
              <p className="inline-block mt-0.5 text-xs px-2 py-0.5 font-semibold text-indigo-700 bg-indigo-50 rounded-full">{statusLabel}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-semibold text-slate-400 block text-[10px] uppercase tracking-wider">Department</span> 
              <p className="text-slate-800">{employee.department}</p>
            </div>
            <div>
              <span className="font-semibold text-slate-400 block text-[10px] uppercase tracking-wider">Country</span> 
              <p className="text-slate-800">📍 {countryLabel}</p>
            </div>
          </div>
          <div>
            <span className="font-semibold text-slate-400 block text-[10px] uppercase tracking-wider">Annual Compensation</span> 
            <p className="text-emerald-600 font-bold text-base">${employee.salary.toLocaleString()}</p>
          </div>
        </div>

        <div className="flex gap-2 mt-6 pt-2 border-t border-slate-100">
          <button onClick={onModify} className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 rounded-lg text-sm transition">
            Update Record
          </button>
          <button onClick={onClose} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 rounded-lg text-sm transition">
            Close View
          </button>
        </div>
      </div>
    </div>
  );
}
