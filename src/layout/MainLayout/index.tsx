import ThemeToggle from '@/components/ThemeToggle';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <main className="bg-primary dark:bg-black dark:text-white min-h-screen">
      <ThemeToggle />
      <Outlet />
    </main>
  );
}

export default MainLayout;