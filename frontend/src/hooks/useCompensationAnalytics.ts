import { useState, useMemo, useCallback } from 'react';
import { mockEmployees } from '../data/mockEmployees';
import { operational_country_details } from '../data/countries';
import { employmentStatusTypes, departmentTypes, jobTitletypes } from '../data/employementConstants';
import type { FilterState, SalaryMetrics } from '../types/analyticsTypes';

export interface FilterOptions {
  countries: { code: string; label: string }[];
  jobTitles: string[];
  departments: string[];
  employmentStatuses: { id: string; label: string }[];
}

export function useCompensationAnalytics() {
  // 1. Initialize strictly typed state arrays matching your FilterState contract
  const [filters, setFilters] = useState<FilterState>({
    country: [operational_country_details[0]?.code || 'US'] as FilterState['country'],
    jobTitle: [jobTitletypes[0] || 'Software Engineer'] as FilterState['jobTitle'],
    department: [departmentTypes[0] || 'Engineering'] as FilterState['department'],
    employmentStatus: [employmentStatusTypes[0]?.id || 'FT'] as FilterState['employmentStatus'],
  });

  // 2. Build unique dynamic option arrays to feed into dropdown selectors
  const filterOptions = useMemo<FilterOptions>(() => {
    const titlesSet = new Set<string>();
    const deptsSet = new Set<string>();

    for (let i = 0; i < mockEmployees.length; i++) {
      const emp = mockEmployees[i];
      if (emp.jobTitle) titlesSet.add(emp.jobTitle);
      if (emp.department) deptsSet.add(emp.department);
    }

    return {
      countries: operational_country_details.map((c) => ({
        code: c.code,
        label: `${c.name} (${c.code})`,
      })),
      jobTitles: Array.from(titlesSet).sort(),
      departments: Array.from(deptsSet).sort(),
      employmentStatuses: employmentStatusTypes.map((s) => ({
        id: s.id,
        label: s.name, // maps name straight to layout component keys
      })),
    };
  }, []);

  // 3. Strict Generic Single-Item Toggler (Adds or removes individual check items)
  const updateFilter = useCallback(<K extends keyof FilterState>(
    key: K, 
    value: string
  ) => {
    setFilters((prev) => {
      const currentValues = prev[key] as unknown as string[];
      const isSelected = currentValues.includes(value);
      
      let updatedValues: string[];
      if (isSelected) {
        if (currentValues.length === 1) return prev; // Retain at least one query item to prevent divide-by-zero errors
        updatedValues = currentValues.filter((val) => val !== value);
      } else {
        updatedValues = [...currentValues, value];
      }

      return { ...prev, [key]: updatedValues as unknown as FilterState[K] };
    });
  }, []);

  // ⚡ 4. The Missing Bulk Selector Method (Select All / Reset All)
  const toggleAllFilter = useCallback(<K extends keyof FilterState>(
    key: K,
    action: 'select' | 'deselect'
  ) => {
    setFilters((prev) => {
      let updatedValues: string[];

      if (action === 'select') {
        // Hydrate the whole array with all possible options available from our configuration indices
        if (key === 'country') updatedValues = filterOptions.countries.map(c => c.code);
        else if (key === 'jobTitle') updatedValues = filterOptions.jobTitles;
        else if (key === 'department') updatedValues = filterOptions.departments;
        else updatedValues = filterOptions.employmentStatuses.map(s => s.id);
      } else {
        // Graceful reset fallback constraint: leave only the absolute first string item checked
        if (key === 'country') updatedValues = [filterOptions.countries[0]?.code || 'US'];
        else if (key === 'jobTitle') updatedValues = [filterOptions.jobTitles[0] || 'Software Engineer'];
        else if (key === 'department') updatedValues = [filterOptions.departments[0] || 'Engineering'];
        else updatedValues = [filterOptions.employmentStatuses[0]?.id || 'FT'];
      }

      return { ...prev, [key]: updatedValues as unknown as FilterState[K] };
    });
  }, [filterOptions]);

  // 5. High-Performance Math Traversal Loop ($O(N)$ execution bounds via O(1) Set contains lookups)
  const computedMetrics = useMemo<SalaryMetrics>(() => {
    let min = Infinity;
    let max = -Infinity;
    let sum = 0;
    let matchedCount = 0;

    const countrySet = new Set<string>(filters.country as unknown as string[]);
    const titleSet = new Set<string>(filters.jobTitle as unknown as string[]);
    const deptSet = new Set<string>(filters.department as unknown as string[]);
    const statusSet = new Set<string>(filters.employmentStatus as unknown as string[]);

    for (let i = 0; i < mockEmployees.length; i++) {
      const emp = mockEmployees[i];

      const matchesCountry = countrySet.has(emp.country);
      const matchesTitle = titleSet.has(emp.jobTitle);
      const matchesDept = deptSet.has(emp.department);
      const matchesStatus = statusSet.has(emp.employmentStatus);

      if (matchesCountry && matchesTitle && matchesDept && matchesStatus) {
        const sal = emp.salary;
        if (sal < min) min = sal;
        if (sal > max) max = sal;
        sum += sal;
        matchedCount++;
      }
    }

    if (matchedCount === 0) {
      return { min: 0, max: 0, avg: 0 };
    }

    return {
      min,
      max,
      avg: Math.round(sum / matchedCount),
    };
  }, [filters]);

  return {
    filters,
    filterOptions,
    computedMetrics,
    updateFilter,
    toggleAllFilter, // Exposing it here cleans up compile bugs inside Analytics.tsx!
  };
}
