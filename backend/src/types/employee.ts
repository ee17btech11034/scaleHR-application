// ==========================================
// EMPLOYEE ROSTER MANAGEMENT TYPES
// ==========================================
export interface EmployeeFormFields {
  firstName: string;
  lastName: string;
  age: number;
  jobTitle: string;
  department: string;
  country: string;
  salary: number;
  employmentStatus: string;
}

export interface EmployeeRecord extends EmployeeFormFields {
  id: string;
  createdAt?: string;
}

export interface PaginationMetadata {
  currentPage: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
}

export interface PaginatedResponse {
  success: boolean;
  data: EmployeeRecord[];
  pagination: PaginationMetadata;
}

// ==========================================
// COMPENSATION ANALYTICS ENGINE TYPES
// ==========================================
export interface SalaryMetrics {
  min: number;
  avg: number;
  max: number;
}

export interface FilterState {
  country: string[];
  jobTitle: string[];
  department: string[];
  employmentStatus: string[];
}
