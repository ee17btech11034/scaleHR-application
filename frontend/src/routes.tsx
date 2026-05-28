import { createBrowserRouter } from 'react-router-dom';
// import { Home, Employees, Analytics } from './components';
import { Home, Employees } from './components';
import  RootLayout  from './layouts/RootLayout';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // The Layout is now the parent
    children: [
      {
        index: true, // Matches exactly "/"
        element: <Home />,
      },
      {
        path: "employees", // path ==>  /employees   as "/" is coming from parent
        element: <Employees />,
      },
      // {
      //   path: "analytics",
      //   element: <Analytics />,
      // },
    ],
  },
]);
