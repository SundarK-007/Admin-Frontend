import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../lib/authStore";
import { isAdminPanelType } from "../lib/userTypes";

/**
 * Signed in AND an admin-panel user type. The Customer check matters:
 * /auth/login is shared with the future Customer Portal, so a CUSTOMER
 * account gets a perfectly valid token — it just has no business here
 * (FSD §2.1: "No Admin Panel access — Customer Portal only"). Without this
 * they'd land on a dashboard where every panel answers 403.
 *
 * The API enforces the same rule independently via its adminOnly
 * middleware; this exists so the person sees an honest redirect instead of
 * a broken screen.
 */
export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);

  if (!token) return <Navigate to="/login" replace />;
  if (user && !isAdminPanelType(user.userType)) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}
