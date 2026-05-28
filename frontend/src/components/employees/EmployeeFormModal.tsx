import React from 'react';
import type { EmployeeFormFields } from '../../types/employee';
import { employmentStatusTypes, jobTitletypes, departmentTypes } from '../../data/employementConstants';
import { operational_country_details } from '../../data/countries';

interface EmployeeFormModalProps {
  isEditing: boolean;
  formData: EmployeeFormFields;
  // Strictly types the state setter using React's dispatch signature instead of "any"
  setFormData: React.Dispatch<React.SetStateAction<EmployeeFormFields>>;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function EmployeeFormModal({ 
  isEditing, 
  formData, 
  setFormData, 
  onClose, 
  onSubmit 
}: EmployeeFormModalProps) {
  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <form onSubmit={onSubmit} className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl border border-slate-100 space-y-4">
        <h2 className="text-lg font-bold text-slate-900">{isEditing ? 'Update Employee Details' : 'Onboard New Employee'}</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">First Name</label>
            <input required type="text" value={formData.firstName} onChange={e => setFormData(prev => ({...prev, firstName: e.target.value}))} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Last Name</label>
            <input required type="text" value={formData.lastName} onChange={e => setFormData(prev => ({...prev, lastName: e.target.value}))} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1">
            <label className="text-xs font-semibold text-slate-600 block mb-1">Age</label>
            <input required type="number" min="18" max="76" value={formData.age || '18'} onChange={e => setFormData(prev => ({...prev, age: parseInt(e.target.value) || 0}))} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div className="col-span-2">
            <label className="text-xs font-semibold text-slate-600 block mb-1">Job Title</label>
            <select 
              value={formData.jobTitle} 
              // Cast target values strictly to the dynamic literal type instead of "any"
              onChange={e => setFormData(prev => ({...prev, jobTitle: e.target.value as EmployeeFormFields['jobTitle']}))} 
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {jobTitletypes.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Department</label>
            <select 
              value={formData.department} 
              // Cast target values strictly to the dynamic literal type instead of "any"
              onChange={e => setFormData(prev => ({...prev, department: e.target.value as EmployeeFormFields['department']}))} 
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {departmentTypes.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Country</label>
            <select 
              value={formData.country} 
              // Cast target values strictly to the dynamic literal type instead of "any"
              onChange={e => setFormData(prev => ({...prev, country: e.target.value as EmployeeFormFields['country']}))} 
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {operational_country_details.map(c => <option key={c.code} value={c.code}>{`${c.name} (${c.code})`}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Base Salary ($)</label>
            <input required type="number" value={formData.salary || ''} onChange={e => setFormData(prev => ({...prev, salary: parseInt(e.target.value) || 0}))} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Employment Status</label>
            <select 
              value={formData.employmentStatus} 
              // Cast target values strictly to the status literal type instead of "any"
              onChange={e => setFormData(prev => ({...prev, employmentStatus: e.target.value as EmployeeFormFields['employmentStatus']}))} 
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {employmentStatusTypes.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
          <button type="button" onClick={onClose} className="border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm transition">
            Cancel
          </button>
          <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2 rounded-lg text-sm shadow transition">
            Save Record
          </button>
        </div>
      </form>
    </div>
  );
}
