import { Outlet } from 'react-router-dom';
import { Header, Footer} from '../components';

export default function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 font-sans antialiased text-gray-900">
      {/* Decoupled Header Row */}
      <Header />

      {/* Dynamic Main Workspace Box via Outlet Viewports */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      {/* Decoupled Footer Row */}
      <Footer />
    </div>
  );
}
