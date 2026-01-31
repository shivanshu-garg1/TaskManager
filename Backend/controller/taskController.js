import Task from "../models/task.model.js";
import Project from "../models/project.model.js";

const checkProjectOwnership = async (projectId, userId) => {
  return await Project.findOne({ _id: projectId, owner: userId });
};

const createTask = async (req, res) => {
  try {
    const { title, description, project, status, priority, dueDate } = req.body;

    if (!title || !description || !project) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const ownsProject = await checkProjectOwnership(project, req.user.id);
    if (!ownsProject) {
      return res.status(403).json({ message: "Access denied" });
    }

    const task = await Task.create({
      title,
      description,
      project,
      status,
      priority,
      dueDate,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTasksByProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const ownsProject = await checkProjectOwnership(projectId, req.user.id);
    if (!ownsProject) {
      return res.status(403).json({ message: "Access denied" });
    }

    const tasks = await Task.find({ project: projectId }).sort({
      createdAt: -1,
    });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate("project");

    if (!task || task.project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    Object.assign(task, req.body);
    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate("project");

    if (!task || task.project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    await task.deleteOne();
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createTask, getTasksByProject, updateTask, deleteTask };
