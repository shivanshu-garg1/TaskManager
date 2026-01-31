import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
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
      const res = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      if (formData.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }

      setFormData({
        name: "",
        email: "",
        role: "user",
        password: "",
      });
    } catch (err) {
      console.log(err);
    } finally {
      console.log("Signup request completed");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center shadow-lg rounded w-fit mx-auto mt-20 p-10 flex-col">
        <h1 className="font-bold text-3xl">Create account</h1>

        <form className="mt-2" onSubmit={handleSubmit}>
          Name: <br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="border rounded p-1 w-sm"
            required
          />
          <br />
          Email: <br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="border rounded p-1 w-sm"
            required
          />
          <br />
          Role: <br />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="border rounded p-1 w-sm"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <br />
          Password: <br />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="border rounded p-1 w-sm"
            required
          />
          <br />
          <button
            type="submit"
            className="bg-amber-500 text-white px-4 py-2 rounded mt-2 w-full disabled:opacity-60"
          >
            Signup
          </button>
          {error && (
            <p className="mt-3 text-red-600 text-center font-medium">{error}</p>
          )}
          <Link to="/login" className="mt-3 text-center text-amber-400">
            Already have an account? Login
          </Link>
        </form>
      </div>
    </>
  );
}
