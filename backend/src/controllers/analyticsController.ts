import { Request, Response } from 'express';
import { db } from '../config/db.js';
import type { FilterState } from '../types/employee.js';

interface QueryResult {
  min: number | null;
  max: number | null;
  avg: number | null;
}

export const calculateCompensationMetrics = async (req: Request, res: Response): Promise<void> => {
  try {
    const filters = req.body as FilterState;

    // 1. If an HR Manager deselects everything completely, immediately return $0 safely
    if (
      !filters ||
      !filters.country?.length ||
      !filters.jobTitle?.length ||
      !filters.department?.length ||
      !filters.employmentStatus?.length
    ) {
      res.status(200).json({ success: true, data: { min: 0, max: 0, avg: 0 } });
      return;
    }

    // 2. Safely dynamically construct placeholder binders for the arrays
    const countryPlaceholders = filters.country.map(() => '?').join(',');
    const titlePlaceholders = filters.jobTitle.map(() => '?').join(',');
    const deptPlaceholders = filters.department.map(() => '?').join(',');
    const statusPlaceholders = filters.employmentStatus.map(() => '?').join(',');

    // 3. Build indexed B-Tree SQL query
    const query = `
      SELECT 
        MIN(salary) as min,
        MAX(salary) as max,
        AVG(salary) as avg
      FROM employees
      WHERE country IN (${countryPlaceholders})
        AND job_title IN (${titlePlaceholders})
        AND department IN (${deptPlaceholders})
        AND employment_status IN (${statusPlaceholders})
    `;

    // 4. Flatten the arguments sequence vector list
    const queryArguments = [
      ...filters.country,
      ...filters.jobTitle,
      ...filters.department,
      ...filters.employmentStatus
    ];

    // Execute the database request
    const row = db.prepare(query).get(queryArguments) as QueryResult;

    res.status(200).json({
      success: true,
      data: {
        min: row.min ?? 0,
        max: row.max ?? 0,
        avg: row.avg ? Math.round(row.avg) : 0
      }
    });
  } catch (error) {
    console.error('❌ Analytics pipeline fault:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
