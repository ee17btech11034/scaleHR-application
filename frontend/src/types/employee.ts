import { employmentStatusTypes, departmentTypes, jobTitletypes } from '../data/employementConstants'
import {operational_country_details} from '../data/countries'

export type EmploymentStatusId = typeof employmentStatusTypes[number]['id'];
export type departmentTypesId = typeof departmentTypes[number];
export type jobTitletypesId = typeof jobTitletypes[number];
export type operationalCountriesId = typeof operational_country_details[number]['code'];


export interface EmployeeFormFields {
  firstName: string;
  lastName: string;
  age: number;
  jobTitle: jobTitletypesId;
  department: departmentTypesId;
  country: operationalCountriesId;
  salary: number;
  employmentStatus: EmploymentStatusId;
}

// Inherits everything from FormFields
export interface EmployeeRecord extends EmployeeFormFields {
  id: string; 
}