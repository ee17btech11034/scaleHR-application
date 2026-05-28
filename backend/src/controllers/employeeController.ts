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

// CREATE EMPLOYEE
export const createEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, age, jobTitle, department, country, salary, employmentStatus } = req.body;

    // Strict validation check
    if (!firstName || !lastName || !jobTitle || !department || !country || !salary || !employmentStatus) {
      res.status(400).json({ success: false, message: 'All record parameters are required.' });
      return;
    }

    // Calculate next incremental layout identifier
    const countRow = db.prepare('SELECT COUNT(*) as count FROM employees').get() as { count: number };
    const newId = `EMP-${10000 + countRow.count}`;

    db.prepare(`
      INSERT INTO employees (id, first_name, last_name, age, job_title, department, country, salary, employment_status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(newId, firstName.trim(), lastName.trim(), age, jobTitle.trim(), department.trim(), country.trim(), salary, employmentStatus.trim());

    res.status(201).json({ success: true, message: 'Employee file created successfully.', data: { id: newId } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to insert employee record.' });
  }
};

// UPDATE EMPLOYEE
export const updateEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { firstName, lastName, age, jobTitle, department, country, salary, employmentStatus } = req.body;

    const result = db.prepare(`
      UPDATE employees 
      SET first_name = ?, last_name = ?, age = ?, job_title = ?, department = ?, country = ?, salary = ?, employment_status = ?
      WHERE id = ?
    `).run(firstName.trim(), lastName.trim(), age, jobTitle.trim(), department.trim(), country.trim(), salary, employmentStatus.trim(), id);

    if (result.changes === 0) {
      res.status(404).json({ success: false, message: 'Employee record not found.' });
      return;
    }

    res.status(200).json({ success: true, message: 'Employee record updated smoothly.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to modify employee record.' });
  }
};

// DELETE EMPLOYEE
export const deleteEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const result = db.prepare('DELETE FROM employees WHERE id = ?').run(id);

    if (result.changes === 0) {
      res.status(404).json({ success: false, message: 'Target profile not found.' });
      return;
    }

    res.status(200).json({ success: true, message: 'Record permanently purged from database.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to drop registry node.' });
  }
};