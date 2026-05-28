import { useState, useMemo, useCallback, useEffect } from 'react';
import type { EmployeeRecord, EmployeeFormFields } from '../types/employee';
import { operational_country_details } from '../data/countries';
import { employmentStatusTypes, departmentTypes, jobTitletypes } from '../data/employementConstants';
import { mockEmployees } from '../data/mockEmployees';

const ITEMS_PER_PAGE = 15;
// Factory helper to safely initialize blank states with correct literal types
const getInitialFormState = (): EmployeeFormFields => ({
  firstName: '',
  lastName: '',
  age: 18,
  jobTitle: (jobTitletypes[0] || 'Data Analyst') as EmployeeFormFields['jobTitle'],
  department: (departmentTypes[0] || 'Design') as EmployeeFormFields['department'],
  // Fallbacks ensuring safe runtime compilation against arrays
  country: (operational_country_details[0]?.code || 'US') as EmployeeFormFields['country'],
  salary: 2000,
  employmentStatus: (employmentStatusTypes[0]?.id || 'FT') as EmployeeFormFields['employmentStatus']
});

export function useEmployeeDirectory() {
  // Hard state workforce memory layout
  const [employees, setEmployees] = useState<EmployeeRecord[]>(() => mockEmployees);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // UI modal view state controllers
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeRecord | null>(null);
  const [editingEmployee, setEditingEmployee] = useState<EmployeeRecord | null>(null);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<EmployeeFormFields>(getInitialFormState());

    // Reset page window to 1 whenever an HR manager modifies search inputs
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // High-performance search index pipeline (Runs instantly for 10,000 records)
  const filteredEmployees = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return employees;

    return employees.filter((emp) => 
      {
        const normalizedQuery = query.toLowerCase();

        // Check if the employee's country matches the user's country search query
        const matchesCountry = operational_country_details.some(country => 
            (country.name.toLowerCase().includes(normalizedQuery) || country.code.toLowerCase().includes(normalizedQuery)) &&
            emp.country === country.code
        );

        return (
            emp.firstName.toLowerCase().includes(normalizedQuery) ||
            emp.lastName.toLowerCase().includes(normalizedQuery) ||
            emp.id.toLowerCase().includes(normalizedQuery) ||
            emp.jobTitle.toLowerCase().includes(normalizedQuery) ||
            emp.department.toLowerCase().includes(normalizedQuery) ||
            matchesCountry
        );
      }
    );
  }, [employees, searchQuery]);

  // 2. Pagination Calculator (Slices the 10,000 matches down to just 12 rows)
  const totalPages = useMemo(() => {
    return Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE) || 1;
  }, [filteredEmployees]);

  const paginatedEmployees = useMemo(() => {
    const startOffset = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredEmployees.slice(startOffset, startOffset + ITEMS_PER_PAGE);
  }, [filteredEmployees, currentPage]);

  // Open modal for a brand new employee
  const openAddModal = useCallback(() => {
    setEditingEmployee(null);
    setFormData(getInitialFormState());
    setIsFormOpen(true);
  }, []);

  // Open modal to update an existing employee
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

  // Delete employee record handler
  const deleteEmployee = useCallback((id: string) => {
    if (window.confirm('Are you sure you want to permanently delete this employee record?')) {
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
      
      // Clean up modal views if the open profile was deleted
      setSelectedEmployee((prev) => (prev?.id === id ? null : prev));
    }
  }, []);

  // Handles both Add and Update operations cleanly
  const submitForm = useCallback(() => {
    if (editingEmployee) {
      // UPDATE MATCHING RECORD
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === editingEmployee.id ? { ...emp, ...formData } : emp))
      );
    } else {
      // ADD BRAND NEW RECORD WITH INCREMENTING IDENTIFIER
      const newRecord: EmployeeRecord = {
        id: `EMP-${10000 + employees.length}`,
        ...formData
      };
      setEmployees((prev) => [newRecord, ...prev]);
    }
    setIsFormOpen(false);
  }, [formData, editingEmployee, employees.length]);

  return {
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
    submitForm,
    paginatedEmployees,
    currentPage,
    setCurrentPage,
    totalPages,
    setEmployees // Useful if loading initial 10,000 employees from an external seed file
  };
}
