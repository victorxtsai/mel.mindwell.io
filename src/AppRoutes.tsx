import { Routes, Route } from 'react-router-dom';
import SignIn from '@/src/pages/SignIn';
import SignUp from '@/src/pages/SignUp';
import ForgotPassword from '@/src/pages/ForgotPassword';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
}
