# Details about current commit or step:

## Frontend setup:


## Country names list:
- Adding as const at the end makes the array read-only, turning it into a strict TypeScript literal type instead of a generic string[] array. This provides better type-safety across our app, ex in countries.ts file.
- **Option A: Keep it in code (Static Config File)**
    - **When to use**: If the company expands to new countries only once or twice a year.
    - **Pros**: Instantly loads with zero network latency, needs no API endpoints, and offers flawless TypeScript autocompletion.
    - **Cons**: To add a country, you must modify the code and redeploy the frontend application.
- **Option B: Fetch it from an API (Database Driven)**
    - **When to use**: If an admin dashboard exists where HR managers dynamically toggle operational countries on and off.
    - **Pros**: Updating operations requires no code changes or redeployments.
    - **Cons**: Introduces an asynchronous loading/fetching state (isLoading) on your form UI and requires runtime API error handling.