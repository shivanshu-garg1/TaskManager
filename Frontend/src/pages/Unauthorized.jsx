import React from "react";
import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md text-center max-w-md">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          403 – Unauthorized
        </h1>

        <p className="text-gray-700 mb-6">
          You do not have permission to access this page.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700"
          >
            Go to Login
          </button>

          <button
            onClick={() => navigate(-1)}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
