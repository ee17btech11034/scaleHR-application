# Engineering & Product Planning Notes

This document captures the structural thinking, product trade-offs, and technical optimizations designed for the Salary Management Tool.

## 1. User Persona & Product Goals
* **Persona:** HR Manager
* **Core Pain Points:** Managing payroll equity, monitoring departmental budgets across multiple countries, scaling headcounts, and verifying workforce allocation metrics without application lag.
* **Product Enhancements (Beyond Minimal Requirements):**
  * Added **Department** to trace operational expenses cleanly.
  * Added **Employment Status** (Full-Time, Part-Time, Contractor) to allow blended workforce evaluations.
  * Correlated **Country** with realistic currency bounds (e.g., USD for United States, INR for India) to provide professional-grade insight metrics.

## 2. System Architecture
We opted for a clean separation of concerns using a **Client-Side Rendered (CSR) Frontend** interacting with a **Stateless REST API Backend** connected to a **SQLite** relational database.

### Why CSR + REST API instead of SSR/Templates (EJS/Pug)?
1. **Interactive Fluidity:** HR Managers constantly adjust dashboard filters and open modals. A SPA framework (React) handles UI state switches instantaneously without full-page reloads.
2. **Bandwidth Optimization:** Instead of passing heavy pre-rendered HTML templates across the network on every filter click, the system transmits lightweight JSON strings containing page segments.

## 3. Core Technical Decisions & Guardrails

### Optimization A: 2-Stage Smart Seeding Engine
To fulfill the requirement that "engineers run this script regularly, and performance matters," we implemented **Cryptographic Change Detection**:
* **Mechanism:** The seeder computes a SHA-256 hash of `first_names.txt` and `last_names.txt` upon execution.
* **Short-Circuit Verification:** It queries a `seed_metadata` table in SQLite. If the calculated hash matches the database state, the system bypasses data processing entirely, protecting system I/O and finishing in **<5ms**.
* **Atomic Batching:** If changes occur, the database table drops records and loops 10,000 creations inside batch ** SQL Transactions**, reducing execution time from minutes to under 2 seconds.

### Optimization B: Dynamic Database Aggregations
* **The Trap:** Pulling 10,000 objects into application runtime memory to compute calculations via JavaScript filter arrays.
* **The Solution:** Offloading mathematical operations (`MIN`, `MAX`, `AVG`) entirely to the SQLite native engine using dynamic `WHERE` queries.
* **Indexing:** Added a multi-column compound index (`idx_employee_filters`) over `(country, employment_status, job_title, department, salary)` to process analytical operations instantly.

### Optimization C: Server-Driven Controlled Pagination Vs Client Side
* Front-end data tables pass explicit `page` and `limit` parameters to the backend routing layout.
* The SQLite engine fulfills requests using precise `LIMIT` and `OFFSET` constraints, keeping the active network payload size tightly managed.
