import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { EmployeeRecord, EmployeeFormFields } from '../types/employee';
import { operational_country_details } from '../data/countries';
import { employmentStatusTypes, departmentTypes, jobTitletypes } from '../data/employementConstants';

const ITEMS_PER_PAGE = 12;
const API_BASE_URL = 'http://localhost:5000';

const getInitialFormState = (): EmployeeFormFields => ({
  firstName: '',
  lastName: '',
  age: 18,
  jobTitle: (jobTitletypes[0] || 'Data Analyst') as EmployeeFormFields['jobTitle'],
  department: (departmentTypes[0] || 'Design') as EmployeeFormFields['department'],
  country: (operational_country_details[0]?.code || 'US') as EmployeeFormFields['country'],
  salary: 2000,
  employmentStatus: (employmentStatusTypes[0]?.id || 'FT') as EmployeeFormFields['employmentStatus']
});

export function useEmployeeDirectory() {
  const [paginatedEmployees, setPaginatedEmployees] = useState<EmployeeRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [appliedSearchQuery, setAppliedSearchQuery] = useState<string>(''); 
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeRecord | null>(null);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingEmployee, setEditingEmployee] = useState<EmployeeRecord | null>(null);
  const [formData, setFormData] = useState<EmployeeFormFields>(getInitialFormState());

  const isPrefetched = useRef<boolean>(false);

  const fetchEmployeesChunk = useCallback((page: number, search: string, abortSignal?: AbortSignal) => {
    setTimeout(async () => {
      if (abortSignal?.aborted) return;
      setIsLoading(true);
      
      try {
        let url = `${API_BASE_URL}/employees?page=${page}&limit=${ITEMS_PER_PAGE}`;
        if (search.trim()) {
          url += `&search=${encodeURIComponent(search.trim())}`;
        }

        const response = await fetch(url, { signal: abortSignal });
        if (!response.ok) throw new Error('Network error received from server roster fetch.');
        
        const data = await response.json();
        
        if (abortSignal?.aborted) return;

        if (data && typeof data === 'object' && Array.isArray(data.data)) {
          setPaginatedEmployees(data.data as EmployeeRecord[]);
          setTotalPages((data.totalPages as number) || 1);
        } else if (Array.isArray(data)) {
          setPaginatedEmployees(data as EmployeeRecord[]);
          setTotalPages(1);
        }
      } catch (error: unknown) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Failed to capture employee payroll window records:', error);
        }
      } finally {
        if (!abortSignal?.aborted) {
          setIsLoading(false);
        }
      }
    }, 0);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchEmployeesChunk(currentPage, appliedSearchQuery, controller.signal);
    return () => {
      controller.abort();
    };
  }, [currentPage, appliedSearchQuery, fetchEmployeesChunk]);

  const prefetchFirstChunk = useCallback(async () => {
    if (isPrefetched.current || paginatedEmployees.length > 0) return;
    try {
      const url = `${API_BASE_URL}/employees?page=1&limit=${ITEMS_PER_PAGE}`;
      const response = await fetch(url);
      if (!response.ok) return;
      const data = await response.json();
      
      if (data && typeof data === 'object' && Array.isArray(data.data)) {
        setPaginatedEmployees(data.data as EmployeeRecord[]);
        setTotalPages((data.totalPages as number) || 1);
        isPrefetched.current = true;
      }
    } catch (e: unknown) {
      console.error('Hover prefetch task failed silently:', e);
    }
  }, [paginatedEmployees.length]);

  const handleSearchChange = useCallback((newValue: string) => {
    setSearchQuery(newValue);
  }, []);

  // Upgraded: Uses explicit module-scoped generic parameter element binding
  const handleServerSearch = useCallback((e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    setCurrentPage(1);
    setAppliedSearchQuery(searchQuery);
  }, [searchQuery]);

  const openAddModal = useCallback(() => {
    setEditingEmployee(null);
    setFormData(getInitialFormState());
    setIsFormOpen(true);
  }, []);

  const openUpdateModal = useCallback((emp: EmployeeRecord) => {
    setEditingEmployee(emp);
    setFormData({
      firstName: emp.firstName,
      lastName: emp.lastName,
      age: emp.age,
      jobTitle: emp.jobTitle,
      department: emp.department,
      country: emp.country,
      salary: emp.salary,
      employmentStatus: emp.employmentStatus
    });
    setIsFormOpen(true);
  }, []);

  const deleteEmployee = useCallback(async (id: string) => {
    if (!window.confirm('Are you sure you want to permanently delete this employee record?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Database transaction deletion call failure response.');

      setSelectedEmployee((prev) => (prev?.id === id ? null : prev));
      fetchEmployeesChunk(currentPage, appliedSearchQuery);
    } catch (error: unknown) {
      console.error('Error dispatching record removal event execution:', error);
      alert('Failed to delete the employee record from the server.');
    }
  }, [currentPage, appliedSearchQuery, fetchEmployeesChunk]);

  const submitForm = useCallback(async () => {
    try {
      let response;
      if (editingEmployee) {
        response = await fetch(`${API_BASE_URL}/employees/${editingEmployee.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      } else {
        response = await fetch(`${API_BASE_URL}/employees`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      }

      if (!response.ok) throw new Error('Failed to synchronize resource change requests safely.');

      setIsFormOpen(false);
      fetchEmployeesChunk(currentPage, appliedSearchQuery);
    } catch (error: unknown) {
      console.error('Form transaction workflow submission failed:', error);
      alert('An error occurred while saving the workforce record parameters.');
    }
  }, [formData, editingEmployee, currentPage, appliedSearchQuery, fetchEmployeesChunk]);

  return {
    searchQuery,
    setSearchQuery: handleSearchChange,
    handleServerSearch,
    paginatedEmployees,
    currentPage,
    setCurrentPage,
    totalPages,
    isLoading,
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
    submitForm,
    prefetchFirstChunk
  };
}
