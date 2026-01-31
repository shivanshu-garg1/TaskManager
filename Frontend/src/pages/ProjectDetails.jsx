import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProjectDetails() {
  const { id } = useParams(); // projectId
  const [tasks, setTasks] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
  });

  const fetchTasks = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/tasks/project/${id}`, {
        credentials: "include",
      });
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  const createTask = async (e) => {
    e.preventDefault();

    try {
      await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...form,
          project: id, // 🔥 important
        }),
      });

      setForm({
        title: "",
        description: "",
        priority: "medium",
        dueDate: "",
      });

      fetchTasks();
    } catch (error) {
      console.error("Error creating task", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
        method: "DELETE",
        credentials: "include",
      });
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-6">Project Tasks</h2>

        <form onSubmit={createTask} className="space-y-4 mb-8">
          <input
            type="text"
            placeholder="Task title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border rounded px-3 py-2"
            required
          />

          <textarea
            placeholder="Task description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border rounded px-3 py-2"
            rows="3"
            required
          />

          <select
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
            className="w-full border rounded px-3 py-2"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <input
            type="date"
            value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />

          <button
            type="submit"
            className="w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-700"
          >
            Add Task
          </button>
        </form>

        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center">No tasks found</p>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task._id} className="border p-4 rounded bg-gray-50">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{task.title}</h3>
                  <span className="text-xs text-gray-500">{task.priority}</span>
                </div>

                <p className="text-sm text-gray-600">{task.description}</p>

                {task.dueDate && (
                  <p className="text-xs text-gray-500 mt-1">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                )}

                <button
                  onClick={() => deleteTask(task._id)}
                  className="text-red-600 text-sm mt-2 hover:underline"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
