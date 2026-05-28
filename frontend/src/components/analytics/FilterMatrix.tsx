import DropdownMultiSelect from './DropdownMultiSelect';
import type { FilterState } from '../../types/analyticsTypes';
import type { FilterOptions } from '../../hooks/useCompensationAnalytics';

interface FilterMatrixProps {
  filters: FilterState;
  onFilterChange: <K extends keyof FilterState>(key: K, value: string) => void;
  onBulkToggle: <K extends keyof FilterState>(key: K, action: 'select' | 'deselect') => void;
  options: FilterOptions;
}

export default function FilterMatrix({ filters, onFilterChange, onBulkToggle, options }: FilterMatrixProps) {
  // Convert basic primitive string lists into matching structured objects for the dropdowns
  const jobTitleOptions = options?.jobTitles?.map(title => ({ id: title, label: title })) || [];
  const departmentOptions = options?.departments?.map(dept => ({ id: dept, label: dept })) || [];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
      
      {/* 1. Countries Selector Dropdown */}
      <DropdownMultiSelect
        label="Country"
        options={options?.countries?.map(c => ({ id: c.code, label: c.label })) || []}
        selectedValues={filters?.country as unknown as string[] || []}
        onToggle={(id) => onFilterChange('country', id)}
        onBulkToggle={(action) => onBulkToggle('country', action)}
      />

      {/* 2. Departments Selector Dropdown */}
      <DropdownMultiSelect
        label="Department"
        options={departmentOptions}
        selectedValues={filters?.department as unknown as string[] || []}
        onToggle={(id) => onFilterChange('department', id)}
        onBulkToggle={(action) => onBulkToggle('department', action)}
      />

      {/* 3. Job Designations Selector Dropdown */}
      <DropdownMultiSelect
        label="Job Designation"
        options={jobTitleOptions}
        selectedValues={filters?.jobTitle as unknown as string[] || []}
        onToggle={(id) => onFilterChange('jobTitle', id)}
        onBulkToggle={(action) => onBulkToggle('jobTitle', action)}
      />

      {/* 4. Employment Type Selector Dropdown */}
      <DropdownMultiSelect
        label="Employment Type Status"
        options={options?.employmentStatuses?.map(s => ({ id: s.id, label: s.label })) || []}
        selectedValues={filters?.employmentStatus as unknown as string[] || []}
        onToggle={(id) => onFilterChange('employmentStatus', id)}
        onBulkToggle={(action) => onBulkToggle('employmentStatus', action)}
      />

    </div>
  );
}
