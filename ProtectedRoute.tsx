"import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: ("student" | "teacher" | "admin")[];
}
export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, role, isLoading } = useAuth();
  const location = useLocation();
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  if (allowedRoles && role && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}

Created
useAuth.tsx

Created
Auth.tsx

Created
20260205180025_ed64a5bc-09ef-4d1b-87d4-3e1f713a24f9.sql

Modified
App.tsx

Modified
Sidebar.tsx

Modified
src/integrations/supabase/types.ts


"
