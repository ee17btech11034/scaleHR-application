# Enterprise Salary Management Tool

A minimal, high-performance web application designed for HR Managers to track compensation scales, manage personnel directory configurations, and extract operational data insights across an organization of 10,000+ employees.

## 🏗️ Project Architecture
The workspace is cleanly divided into decoupled development layers:
* `/frontend`: Single Page Application (SPA) built with **React**, **TypeScript**, and **Tailwind CSS**.
* `/backend`: RESTful API Gateway managing data schemas and connections with **SQLite**.
* `PLANNING.md`: Engineering blueprints and structural trade-offs document.
* `CHANGELOG.md`: Detailed incremental commit narrative tracking development milestones.

---

## 🚀 Key Features

* **High-Performance Seeder:** Generates 10,000 records smoothly. Employs SHA-256 checksum monitoring to instantly skip execution if source name files are unmodified.
* **Dynamic Analytics Engine:** Live metric cards displaying headcount, minimum compensation, maximum compensation, and average salaries grouped across four synchronized data filters.
* **Server-Side Pagination:** Data views load progressively through managed SQL offset adjustments, ensuring low latency.
* **Full CRUD Operations:** Interfaces to securely capture full names, titles, departments, locations, and salaries.

---

## 🛠️ Getting Started

### 1. Backend Initialization
Navigate into the server environment to provision the relational schema and handle data seeding:
```bash
cd backend
npm install       # Or your language equivalent install command

# Run the seeding engine (Performance optimized)
npm run generate-names # to generate names
npm run seed # generate db
npm run dev
```

### 2. Frontend Initialization
Launch the Client interface:
```bash
cd ../frontend
npm install
npm run dev
```
Open your browser to the designated local port (typically `http://localhost:5173` or `3000`) to test the system.

---

## 🧪 Verification & Test Suites

To validate consistency and ensure the mathematical logic operates deterministically without side effects, execute our targeted unit tests:

```bash
cd backend
npm run test  # Validates SQL aggregate queries and seed hashing logic
```

---

## 📊 Performance Benchmark Summary
* **Seeder Execution (Fresh Run):** ~1.8 Seconds (10,000 records processed inside a unified transaction block)
* **Seeder Execution (Cached Run):** <5 Milliseconds (Safeguarded by SHA-256 validation)
* **Analytics Aggregation Query Latency:** ~2 Milliseconds (Optimized using indexing)

## Demo:
- [video](https://1drv.ms/v/c/7cdada698e72fc3c/IQBpCiMHAhBJQrjMURfZ8gSzAdSkDTqqmD_6dIbC3dyGGzc?e=eYYEwU)
- images: in folder "demo img files"
