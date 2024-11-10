import { Outlet } from 'react-router-dom';
import Header from '../Header';

const MainLayout = () => {
  return (
    <main className="bg-primary dark:bg-black dark:text-white min-h-screen">
      <Header />
      <div className="bg-white dark:bg-dark">
        <Outlet />
      </div>
    </main>
  );
}

export default MainLayout;