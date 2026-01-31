import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

export default function UserRoute() {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/auth/me", {
          credentials: "include",
        });

        if (!res.ok) throw new Error();

        const data = await res.json();

        // ✅ ONLY USER
        if (data.role === "user") {
          setAllowed(true);
        }
      } catch {
        setAllowed(false);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  if (loading) return <p>Checking user access...</p>;

  return allowed ? <Outlet /> : <Navigate to="/unauthorized" replace />;
}
