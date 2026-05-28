import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
// ⚡ Import the schema initialization function along with the db instance
import { db, initializeDatabaseSchema } from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const operationalCountries = ['US', 'GB', 'KR', 'IN', 'FR', 'DE', 'JP'];
const employmentStatuses = ['FT', 'PT', 'CT', 'IN'];
const departmentTypes = ['Engineering', 'Product', 'People', 'Data', 'Design', 'Finance'] as const;

const jobTitles: Record<typeof departmentTypes[number], string[]> = {
  Engineering: ['Software Engineer', 'Senior Developer', 'Engineering Manager', 'DevOps Specialist'],
  Product: ['Product Manager', 'Associate PM', 'VP of Product'],
  People: ['HR Specialist', 'People Operations Lead', 'Recruiter'],
  Data: ['Data Analyst', 'Data Scientist', 'BI Engineer'],
  Design: ['UX Designer', 'UI Lead', 'Product Designer'],
  Finance: ['Accountant', 'Financial Analyst', 'Controller']
};

function runBulkSeedFromFiles(): void {
  // ⚡ FIX: Explicitly call schema builder to ensure tables exist before query compilation
  initializeDatabaseSchema();

  console.log('🔄 Sourcing streaming tokens from data files...');

  const firstNamesPath = path.join(__dirname, '../data/first_names.txt');
  const lastNamesPath = path.join(__dirname, '../data/last_names.txt');

  if (!fs.existsSync(firstNamesPath) || !fs.existsSync(lastNamesPath)) {
    throw new Error('❌ Missing name vectors files inside src/data/ directory.');
  }

  const firstNames = fs.readFileSync(firstNamesPath, 'utf-8').split('\n').map(n => n.trim()).filter(Boolean);
  const lastNames = fs.readFileSync(lastNamesPath, 'utf-8').split('\n').map(n => n.trim()).filter(Boolean);

  if (firstNames.length === 0 || lastNames.length === 0) {
    throw new Error('❌ Source asset buffers returned empty.');
  }

  const insertStmt = db.prepare(`
    INSERT INTO employees (id, first_name, last_name, age, job_title, department, country, salary, employment_status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  console.time('⚡ Database Seeding Elapsed Time');

  const executeBatchTransaction = db.transaction(() => {
    db.prepare('DELETE FROM employees').run();

    for (let i = 0; i < 10000; i++) {
      const id = `EMP-${10000 + i}`;
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const age = Math.floor(Math.random() * (65 - 18 + 1)) + 18;
      
      const department = departmentTypes[Math.floor(Math.random() * departmentTypes.length)];
      const titleOptions = jobTitles[department];
      const jobTitle = titleOptions[Math.floor(Math.random() * titleOptions.length)];
      
      const country = operationalCountries[Math.floor(Math.random() * operationalCountries.length)];
      const employmentStatus = employmentStatuses[Math.floor(Math.random() * employmentStatuses.length)];
      const salary = Math.floor(Math.random() * (160000 - 45000 + 1)) + 45000;

      insertStmt.run(id, firstName, lastName, age, jobTitle, department, country, salary, employmentStatus);
    }
  });

  executeBatchTransaction();
  console.timeEnd('⚡ Database Seeding Elapsed Time');
  console.log('✅ 10,000 workforce records written successfully to SQLite.');
}

try {
  runBulkSeedFromFiles();
} catch (e) {
  console.error(e);
  process.exit(1);
}
