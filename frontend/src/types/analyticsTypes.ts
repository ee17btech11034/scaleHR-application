import type { EmploymentStatusId, departmentTypesId, jobTitletypesId, operationalCountriesId } from './employee';

export interface SalaryMetrics {
  min: number;
  avg: number;
  max: number;
}

export interface FilterState {
  country: operationalCountriesId[];
  jobTitle: jobTitletypesId[];
  department: departmentTypesId[];
  employmentStatus: EmploymentStatusId[];
}