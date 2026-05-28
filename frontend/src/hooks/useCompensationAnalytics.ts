import { useState, useMemo, useCallback, useEffect } from 'react';
import { operational_country_details } from '../data/countries';
import { employmentStatusTypes, departmentTypes, jobTitletypes } from '../data/employementConstants';
import type { FilterState, SalaryMetrics } from '../types/analyticsTypes';

export interface FilterOptions {
  countries: { code: string; label: string }[];
  jobTitles: string[];
  departments: string[];
  employmentStatuses: { id: string; label: string }[];
}

const API_BASE_URL = 'http://localhost:5000';

export function useCompensationAnalytics() {
  const [filters, setFilters] = useState<FilterState>({
    country: operational_country_details.map(c => c.code) as FilterState['country'],
    jobTitle: [...jobTitletypes] as FilterState['jobTitle'],
    department: [...departmentTypes] as FilterState['department'],
    employmentStatus: employmentStatusTypes.map(s => s.id) as FilterState['employmentStatus'],
  });

  const [computedMetrics, setComputedMetrics] = useState<SalaryMetrics>({ min: 0, max: 0, avg: 0 });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const filterOptions = useMemo<FilterOptions>(() => {
    return {
      countries: operational_country_details.map((c) => ({
        code: c.code,
        label: `${c.name} (${c.code})`,
      })),
      jobTitles: [...jobTitletypes].sort(),
      departments: [...departmentTypes].sort(),
      employmentStatuses: employmentStatusTypes.map((s) => ({
        id: s.id,
        label: s.name,
      })),
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    setTimeout(async () => {
      if (controller.signal.aborted) return;
      setIsLoading(true);
      
      try {
        const response = await fetch(`${API_BASE_URL}/analytics`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            countries: filters.country,
            jobTitles: filters.jobTitle,
            departments: filters.department,
            employmentStatuses: filters.employmentStatus,
          }),
          signal: controller.signal
        });

        if (!response.ok) throw new Error('Database metrics aggregation fault response received.');
        
        const data = await response.json();
        
        if (controller.signal.aborted) return;

        if (data && typeof data === 'object') {
          setComputedMetrics({
            min: (data.min as number) || 0,
            max: (data.max as number) || 0,
            avg: (data.avg as number) || 0
          });
        }
      } catch (error: unknown) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Failed to compute server-side workforce matrix analytics:', error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }, 0);

    return () => {
      controller.abort();
    };
  }, [filters]);

  const updateFilter = useCallback(<K extends keyof FilterState>(key: K, value: string) => {
    setFilters((prev) => {
      const currentValues = prev[key] as unknown as string[];
      const isSelected = currentValues.includes(value);
      
      let updatedValues: string[];
      if (isSelected) {
        if (currentValues.length === 1) return prev;
        updatedValues = currentValues.filter((val) => val !== value);
      } else {
        updatedValues = [...currentValues, value];
      }

      return { ...prev, [key]: updatedValues as unknown as FilterState[K] };
    });
  }, []);

  const toggleAllFilter = useCallback(<K extends keyof FilterState>(key: K, action: 'select' | 'deselect') => {
    setFilters((prev) => {
      let updatedValues: string[];

      if (action === 'select') {
        if (key === 'country') updatedValues = filterOptions.countries.map(c => c.code);
        else if (key === 'jobTitle') updatedValues = filterOptions.jobTitles;
        else if (key === 'department') updatedValues = filterOptions.departments;
        else updatedValues = filterOptions.employmentStatuses.map(s => s.id);
      } else {
        if (key === 'country') updatedValues = [filterOptions.countries[0]?.code || 'US'];
        else if (key === 'jobTitle') updatedValues = [filterOptions.jobTitles[0] || 'Data Analyst'];
        else if (key === 'department') updatedValues = [filterOptions.departments[0] || 'Design'];
        else updatedValues = [filterOptions.employmentStatuses[0]?.id || 'FT'];
      }

      return { ...prev, [key]: updatedValues as unknown as FilterState[K] };
    });
  }, [filterOptions]);

  return {
    filters,
    filterOptions,
    computedMetrics,
    updateFilter,
    toggleAllFilter,
    isLoading
  };
}
