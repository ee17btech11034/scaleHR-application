import React from 'react';
import { useEmployeeDirectory } from '../../hooks/useEmployeeDirectory';
import {SearchBar, EmployeeCard, EmployeeViewModal, EmployeeFormModal} from '../index';
import type { EmployeeRecord } from '../../types/employee';

export default function Employees() {
  const {
    searchQuery,
    setSearchQuery,
    filteredEmployees,
    selectedEmployee,
    setSelectedEmployee,
    isFormOpen,
    setIsFormOpen,
    editingEmployee,
    formData,
    setFormData,
    openAddModal,
    openUpdateModal,
    deleteEmployee,
    submitForm
  } = useEmployeeDirectory(); 

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 font-sans text-slate-800">
      <SearchBar 
        value={searchQuery} 
        onChange={setSearchQuery} 
        onAddClick={openAddModal} 
      />

      {filteredEmployees.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200 shadow-sm">
          <p className="text-slate-400 text-sm font-medium">No workforce records match your query constraints.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredEmployees.map((emp: EmployeeRecord) => (
            <EmployeeCard 
              key={emp.id}
              employee={emp}
              onView={() => setSelectedEmployee(emp)}
              onUpdate={(e: React.MouseEvent) => { e.stopPropagation(); openUpdateModal(emp); }}
              onDelete={(e: React.MouseEvent) => { e.stopPropagation(); deleteEmployee(emp.id); }}
            />
          ))}
        </div>
      )}

      {selectedEmployee && (
        <EmployeeViewModal 
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
          onModify={() => {
            const empToEdit = selectedEmployee;
            setSelectedEmployee(null);
            openUpdateModal(empToEdit);
          }}
        />
      )}

      {isFormOpen && (
        <EmployeeFormModal 
          isEditing={!!editingEmployee}
          formData={formData}
          setFormData={setFormData}
          onClose={() => setIsFormOpen(false)}
          onSubmit={(e: React.FormEvent) => { e.preventDefault(); submitForm(); }}
        />
      )}
    </div>
  );
}
