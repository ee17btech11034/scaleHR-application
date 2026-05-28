import { Request, Response } from 'express';
import { db } from '../config/db.js';
import type { EmployeeRecord } from '../types/employee.js';

interface CountResult {
  count: number;
}

export const getPaginatedEmployees = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 12;
    const search = (req.query.search as string || '').trim().toLowerCase();

    const offset = (page - 1) * limit;

    let employees: EmployeeRecord[];
    let totalCountRow: CountResult;

    if (search) {
      const wildCard = `%${search}%`;
      
      totalCountRow = db.prepare(`
        SELECT COUNT(*) as count FROM employees 
        WHERE LOWER(first_name) LIKE ? OR LOWER(last_name) LIKE ? OR LOWER(job_title) LIKE ?
      `).get(wildCard, wildCard, wildCard) as CountResult;

      employees = db.prepare(`
        SELECT id, first_name as firstName, last_name as lastName, age, job_title as jobTitle, 
               department, country, salary, employment_status as employmentStatus, created_at as createdAt
        FROM employees 
        WHERE LOWER(first_name) LIKE ? OR LOWER(last_name) LIKE ? OR LOWER(job_title) LIKE ?
        ORDER BY created_at DESC LIMIT ? OFFSET ?
      `).all(wildCard, wildCard, wildCard, limit, offset) as EmployeeRecord[];
    } else {
      totalCountRow = db.prepare('SELECT COUNT(*) as count FROM employees').get() as CountResult;
      
      employees = db.prepare(`
        SELECT id, first_name as firstName, last_name as lastName, age, job_title as jobTitle, 
               department, country, salary, employment_status as employmentStatus, created_at as createdAt
        FROM employees 
        ORDER BY created_at DESC LIMIT ? OFFSET ?
      `).all(limit, offset) as EmployeeRecord[];
    }

    const totalRecords = totalCountRow?.count || 0;
    const totalPages = Math.ceil(totalRecords / limit) || 1;

    res.status(200).json({
      success: true,
      data: employees,
      pagination: { currentPage: page, pageSize: limit, totalRecords, totalPages }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
