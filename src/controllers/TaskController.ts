import { Request, Response } from "express";
import { TGetAllTasks, ITask, IDataValid } from "../interfaces/TaskInterfaces";
import Task from "./../models/Taks";
import { validateData } from "../utils/validateData";
import _ from "lodash";

export async function getAllTask(req: Request, res: Response) {
  try {
    const tasks: TGetAllTasks = await Task.find();
    if (tasks.length > 0) return res.status(200).json(tasks);
  } catch (error) {
    return res.status(400).json({ message: "Error getting all tasks", error });
  }
}

export async function getTaskById(req: Request, res: Response) {
  const id = req.params.id;
  try {
    const task: ITask = (await Task.findById(id))!;
    if (task) return res.status(200).json(task);
  } catch (error) {
    return res.status(400).json({ message: "Error getting task, invalid id", error });
  }
}

export async function createTask(req: Request, res: Response) {
  const title: string = req.body.title ? req.body.title : "";
  const description: string = req.body.description ? req.body.description : "";
  let newTask: ITask;
  const dataValid = {
    title: title,
    description: description,
  };
  const dataValided = await validateData(dataValid);
  if (!dataValided.isValid) {
    return res.status(400).json(dataValided.message);
  }
  try {
    newTask = new Task({ title, description });
    await newTask.save();
    return res
      .status(200)
      .json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    return res.status(400).json({ message: "Error creating task", error });
  }
}

export async function updateTask(req: Request, res: Response) {
  const taskId = req.params.id;
  let updateTask: ITask;

  const updateData: IDataValid = _.pick(req.body, ["title", "description"]);

  const updateDataJson = JSON.parse(JSON.stringify(updateData));

  const dataValided = await validateData(updateDataJson);
  if (!dataValided.isValid) {
    return res.status(400).json(dataValided.message);
  }
  try {
    updateTask = (await Task.findByIdAndUpdate(taskId, updateDataJson, {
      new: true,
    }))!;
    if (updateTask === null)
      return res.status(400).json({ message: "Error updating task" });
  } catch (error) {
    return res.status(400).json({ message: "Error updating task", error });
  }
  return res
      .status(200)
      .json({ message: "Task updated successfully", task: updateTask });
}


export async function deleteTask(req: Request, res: Response) {
  const taskId = req.params.id;
  try {
    const task: ITask = (await Task.findByIdAndDelete(taskId))!;
    if (task) return res.status(200).json({ message: "Task deleted successfully", task });
  } catch (error) {
    return res.status(400).json({ message: "Error deleting task, invalid id", error });
  }
}
