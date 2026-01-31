import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Login failed");
      }

      const meRes = await fetch("http://localhost:3000/api/auth/me", {
        credentials: "include",
      });

      if (!meRes.ok) throw new Error("Failed to fetch user");

      const meData = await meRes.json();

      if (meData.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center shadow-lg rounded w-fit mx-auto mt-20 p-10 flex-col">
      <h1 className="font-bold text-3xl">Login</h1>

      <form className="mt-2" onSubmit={handleSubmit}>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border rounded p-1 w-sm"
          required
        />
        <br />
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="border rounded p-1 w-sm"
          required
        />
        <br />
        <button className="bg-amber-500 text-white px-4 py-2 rounded mt-2 w-full">
          Login
        </button>
        {error && (
          <p className="mt-3 text-red-600 text-center font-medium">{error}</p>
        )}
        <Link to="/" className="block mt-3 text-amber-300 text-center">
          Don't have an account? Sign up
        </Link>
      </form>
    </div>
  );
}
