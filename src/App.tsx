import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/layout/MainLayout';
import HomePage from '@/pages/HomePage';
const App = () => {
  return (
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
  );
}

export default App;