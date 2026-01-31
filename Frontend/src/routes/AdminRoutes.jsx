import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AdminRoute() {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/auth/me", {
          credentials: "include",
        });

        if (!res.ok) throw new Error();

        const data = await res.json();

        // ✅ ONLY ADMIN
        if (data.role === "admin") {
          setAllowed(true);
        }
      } catch {
        setAllowed(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, []);

  if (loading) return <p>Checking admin access...</p>;

  return allowed ? <Outlet /> : <Navigate to="/unauthorized" replace />;
}
