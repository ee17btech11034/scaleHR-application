# Details about current commit or step:

## Frontend setup:
- Create seperate Header and footer components. 
```bash
npm install react-router-dom
```

## Layout Outlet over Simple Pages
- **Eliminates Code Duplication**: Define Header and Footer once instead of repeating them across dozens of page files.
- **Prevents Component Re-renders**: Stops React from destroying and rebuilding the layout DOM elements during navigation.
- **Boosts App Performance**: Renders transitions instantly by strictly updating the changing sub-page content.
- **Enables Nested Layouts**: Allows complex structures (like a dashboard sidebar inside a main site layout) with minimal code.
- **Centralizes Maintenance**: Updates to global layouts happen in one single router file rather than on individual pages.