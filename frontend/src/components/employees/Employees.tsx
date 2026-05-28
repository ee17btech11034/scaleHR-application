import React from 'react';
import { useEmployeeDirectory } from '../../hooks/useEmployeeDirectory';
import { SearchBar, EmployeeCard, EmployeeViewModal, EmployeeFormModal } from '../index';
import type { EmployeeRecord } from '../../types/employee';
import PaginationBar from './PaginationBar';

export default function EmployeesPage() {
  const {
    searchQuery,
    setSearchQuery,
    handleServerSearch, // Intercepts explicit filter requests
    paginatedEmployees, // Renders the explicit backend chunk data
    currentPage,
    setCurrentPage,
    totalPages,
    isLoading,         // Tracks active server async operations
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
      {/* SearchBar upgraded with form submission support for server-side queries */}
      <SearchBar 
        value={searchQuery} 
        onChange={setSearchQuery} 
        onSubmit={handleServerSearch} 
        onAddClick={openAddModal} 
      />

      {/* High-performance loading screen fallback layout */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 text-sm font-medium animate-pulse">Syncing workforce parameters with core ledger...</p>
        </div>
      ) : paginatedEmployees.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200 shadow-sm">
          <p className="text-slate-400 text-sm font-medium">No workforce records match your query constraints.</p>
        </div>
      ) : (
        <>
          {/* Displays the server-sliced database chunks cleanly */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {paginatedEmployees.map((emp: EmployeeRecord) => (
              <EmployeeCard 
                key={emp.id}
                employee={emp}
                onView={() => setSelectedEmployee(emp)}
                onUpdate={(e: React.MouseEvent) => { e.stopPropagation(); openUpdateModal(emp); }}
                onDelete={(e: React.MouseEvent) => { e.stopPropagation(); deleteEmployee(emp.id); }}
              />
            ))}
          </div>

          {/* Triggers on-demand chunk fetches over the network layer */}
          <PaginationBar 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
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
          // Upgraded: Uses explicit module-scoped generic parameter element binding matching linter rules
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); submitForm(); }}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
