import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import SetPasswordPage from "./pages/auth/SetPasswordPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import DashboardPage from "./pages/DashboardPage";
import RolesPage from "./pages/admin/RolesPage";
import PermissionsPage from "./pages/admin/PermissionsPage";
import UsersPage from "./pages/admin/UsersPage";
import CustomersPage from "./pages/admin/CustomersPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";

// No /register route here — the Admin Panel is admin-created-accounts-only
// (FSD §2.3). The backend's POST /auth/register (User-Service) is still
// there and still creates CUSTOMER accounts + a linked Customer profile —
// it just doesn't have a UI home in this repo. That UI belongs to the
// future customer-frontend (Phase 2), not the Admin Panel.
//
// Every signed-in screen nests under one <AdminLayout/> (sidebar + topbar) —
// Day 3 onward adds routes here as children of the same layout, not as new
// top-level pages.
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/activate/:token" element={<SetPasswordPage mode="activate" />} />
        <Route path="/reset-password/:token" element={<SetPasswordPage mode="reset" />} />

        <Route
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/roles" element={<RolesPage />} />
          <Route path="/permissions" element={<PermissionsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}