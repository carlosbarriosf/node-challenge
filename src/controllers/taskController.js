import { Task } from "../Models/task.js";

export const createTask = async (req, res) => {
  const { task } = req.body;
  const { id } = req.user;

  if (!task) return res.status(400).json({ msg: "Invalid task" });

  try {
    const newTask = await Task.create({
      task: task,
      completed: false,
      user: id,
    });

    return res.status(201).json({ msg: "Task created successfully", newTask });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const getTasks = async (req, res) => {
  //this is the users ID
  const { id } = req.user;

  try {
    const tasks = await Task.find({ user: id });
    return res.status(200).json({ msg: "Request ok", tasks: tasks });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const getTaskById = async (req, res) => {
  const { taskId } = req.params;
  const { userId } = req.body;

  try {
    const task = await Task.findOne({ _id: taskId, user: userId });
    if (!task) return res.status(404).json({ msg: "Task not found" });
    return res.status(200).json({ msg: "Task found", task });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const editTask = async (req, res) => {
  const { taskId } = req.params;
  const { userId } = req.user;
  const { task, completed } = req.body;
  if (task == undefined && completed == undefined)
    return res.status(400).json({ msg: "Nothing to update" });
  try {
    const taskToEdit = await Task.findOne({ _id: taskId, user: userId });
    if (!taskToEdit) return res.status(404).json({ msg: "Task not found" });
    if (task !== undefined) taskToEdit.task = task;
    if (completed !== undefined) taskToEdit.completed = completed;
    await taskToEdit.save();
    return res
      .status(200)
      .json({ msg: "Task updated successfully", taskToEdit });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  const { userId } = req.body;

  try {
    const taskToDelete = await Task.findOneAndDelete({
      _id: taskId,
      user: userId,
    });
    if (!taskToDelete) return res.status(404).json({ msg: "Task not found" });
    return res.status(200).json({ msg: "Task deleted successfully" });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};
