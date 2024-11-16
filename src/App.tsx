import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/layout/MainLayout';
import HomePage from '@/pages/HomePage';
import { FormProvider, useForm } from 'react-hook-form';
const App = () => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </FormProvider> 
  );
}

export default App;