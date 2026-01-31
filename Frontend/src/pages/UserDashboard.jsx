import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
  });

  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/projects", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects", error);
    }
  };

  const createProject = async (e) => {
    e.preventDefault();

    try {
      await fetch("http://localhost:3000/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      setForm({ title: "", description: "", startDate: "" });
      fetchProjects();
    } catch (error) {
      console.error("Error creating project", error);
    }
  };

  const deleteProject = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/projects/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">User Dashboard</h2>

        <form onSubmit={createProject} className="space-y-4 mb-8">
          <input
            type="text"
            placeholder="Project title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            rows="3"
            required
          />

          <input
            type="date"
            value={form.startDate}
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />

          <button
            type="submit"
            className="w-full bg-amber-500 text-white py-2 rounded hover:bg-amber-600 transition"
          >
            Create Project
          </button>
        </form>

        {projects.length === 0 ? (
          <p className="text-center text-gray-500">No projects found</p>
        ) : (
          <div className="space-y-4">
            {projects.map((project) => (
              <div
                key={project._id}
                className="border border-gray-200 rounded p-4 bg-gray-50"
              >
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-3">
                  {project.description}
                </p>

                <div className="flex gap-4">
                  <button
                    onClick={() => navigate(`/projects/${project._id}`)}
                    className="text-amber-600 hover:underline"
                  >
                    View / Edit
                  </button>

                  <button
                    onClick={() => deleteProject(project._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
