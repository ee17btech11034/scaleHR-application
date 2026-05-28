# Details about current commit or step:

## Backend Setup:
```bash
npm init -y
npm install express better-sqlite3 dotenv cors
npm install -D typescript @types/express @types/node tsx @types/cors
```

## Points:
- **Hover-Triggered Loading**: Postpones API requests until the user hovers over the "Employee" navigation component, reducing unnecessary initial load times.
- **On-Demand Pagination**: Fetches data in optimized chunks of 12 records only when the user interacts with pagination controls ("Next" or "Previous").
- **Server-Side Filtering**: Offloads complex search and filter processing to the backend via a explicit form submission, minimizing client-side memory usage and rendering lag.

## Directory:
salary-management-backend/
├── data/                       # Contains name asset .txt strings
├── src/
│   ├── config/                 # Initializer environments
│   ├── controllers/            # Request handlers
│   ├── database/               # SQLite core instances & seeders
│   ├── routes/                 # API endpoint routers
│   ├── types/                  # Shared contract interfaces
│   └── utils/                  # Reusable utility scripts
├── package.json
└── tsconfig.json

## Running Flow:
```bash 
# 1. Generate text files inside src/data/
npm run generate-names

# 2. Run the high-performance transaction seeder 
npm run seed

# 3. Boot up the Express application layer
npm run dev
```