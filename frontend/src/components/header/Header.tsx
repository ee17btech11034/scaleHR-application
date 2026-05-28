import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useEmployeeDirectory } from '../../hooks/useEmployeeDirectory'; // New: Pull backend fetch hook

export default function Header() {
  const location = useLocation();
  const { prefetchFirstChunk } = useEmployeeDirectory(); // New: Destructure the prefetch cache engine

  // Highlight navigation links based on the current active URL path
  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const links: { id: string; label: string; idName: string }[] = [
    { id: '/', label: 'Home', idName: 'home' },
    { id: '/employees', label: 'Employees', idName: 'employees' }, // Target idName reference matching criteria
    { id: '/analytics', label: 'Analytics', idName: 'analytics' },
  ];

  const navLinkClass = (path: string) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
      isActive(path)
        ? 'bg-indigo-50 text-indigo-700 shadow-sm'
        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
    }`;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link to="/" className="text-xl font-bold tracking-tight text-indigo-600 hover:opacity-90">
            ScaleHR
          </Link>
        </div>
        
        {/* Navigation Menu */}
        <nav className="flex space-x-8 text-sm font-medium">
          {links.map((link) => (
            <Link 
              to={link.id} 
              key={link.id} 
              className={navLinkClass(link.id)}
              // ⚡ Injects the high-performance on-demand hover trigger exclusively for the employees route
              onMouseEnter={link.idName === 'employees' ? prefetchFirstChunk : undefined}
            >
               {link.label}
            </Link>
          ))}
        </nav>

      </div>
    </header>
  );
}
