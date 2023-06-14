import request from "supertest";
import sinon from "sinon";
import mongoose from "mongoose";
import { expect } from "chai";
import app from "../../../src/index";
import Task from "../../../src/models/Taks";

describe("GET /tasks", () => {
  it("should return all tasks", async () => {
    const tasks = [
      { title: "Task 1", description: "Description of task 1" },
      { title: "Task 2", description: "Description of task 2" },
    ];

    const taskFindStub = sinon.stub(Task, "find");
    taskFindStub.resolves(tasks);

    const res = await request(app).get("/tasks");

    expect(res.status).to.equal(200);
    expect(res.body).to.have.lengthOf(2);
    expect(res.body[0].title).to.equal("Task 1");
    expect(res.body[0].description).to.equal("Description of task 1");
    expect(res.body[1].title).to.equal("Task 2");
    expect(res.body[1].description).to.equal("Description of task 2");

    taskFindStub.restore();
  });

  it("should return an error message if there's an error getting all tasks", async () => {
    const taskFindStub = sinon.stub(Task, "find");
    taskFindStub.rejects("Error getting tasks");

    const res = await request(app).get("/tasks");

    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal("Error getting all tasks");

    taskFindStub.restore();
  });
});

describe("GET /tasks/:id", () => {
  it("should return task with given id", async () => {
    const taskId = new mongoose.mongo.ObjectId().toHexString();
    const task = {
      _id: taskId,
      title: "Task 1",
      description: "Description of task 1",
    };

    const taskFindByIdStub = sinon.stub(Task, "findById");
    taskFindByIdStub.resolves(task);

    const res = await request(app).get(`/tasks/${taskId}`);

    expect(res.status).to.equal(200);
    expect(res.body.title).to.equal("Task 1");
    expect(res.body.description).to.equal("Description of task 1");

    taskFindByIdStub.restore();
  });

  it("should return an error message if there's an error getting task by id", async () => {
    const taskId = new mongoose.mongo.ObjectId().toHexString();
    const taskFindByIdStub = sinon.stub(Task, "findById");
    taskFindByIdStub.rejects("Error getting task by id");

    const res = await request(app).get(`/tasks/${taskId}`);

    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal("Error getting task, invalid id");

    taskFindByIdStub.restore();
  });

  it("should return an error message if task with given id doesn't exist", async () => {
    const taskId = "648a2c1f5fc43408c1036505";
    const taskFindByIdStub = sinon.stub(Task, "findById");
    taskFindByIdStub.rejects("Error getting task, invalid id");

    const res = await request(app).get(`/tasks/${taskId}`);

    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal("Error getting task, invalid id");

    taskFindByIdStub.restore();
  });
});

describe("POST /tasks", () => {
  it("should create new task successfully", async () => {
    const newTask = { title: "Task 1", description: "Description of task 1" };

    const taskSaveStub = sinon.stub(Task.prototype, "save");
    taskSaveStub.resolves(newTask);

    const res = await request(app).post("/tasks").send(newTask);

    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal("Task created successfully");
    expect(res.body.task.title).to.equal("Task 1");
    expect(res.body.task.description).to.equal("Description of task 1");

    taskSaveStub.restore();
  });

  it("should return an error message if there's an error creating new task", async () => {
    const newTask = { title: "Task 1", description: "Description of task 1" };

    const taskSaveStub = sinon.stub(Task.prototype, "save");
    taskSaveStub.rejects("Error creating task");

    const res = await request(app).post("/tasks").send(newTask);

    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal("Error creating task");

    taskSaveStub.restore();
  });

  it("should return an error message if title or description are missing", async () => {
    const newTask = { title: " ", description: " " };

    const res = await request(app).post("/tasks").send(newTask);

    expect(res.status).to.equal(400);
    expect(res.body).to.equal("El titulo es requerido");
  });
});

describe("PUT /tasks/:id", () => {
  it("should update task with given id successfully", async () => {
    const updateTask = {
      title: "Task 1 updated",
      description: "Description of task 1 updated",
    };
    const taskId = new mongoose.mongo.ObjectId().toHexString();

    const taskFindByIdAndUpdateStub = sinon.stub(Task, "findByIdAndUpdate");
    taskFindByIdAndUpdateStub.resolves(updateTask);

    const res = await request(app).put(`/tasks/${taskId}`).send(updateTask);

    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal("Task updated successfully");
    expect(res.body.task.title).to.equal("Task 1 updated");
    expect(res.body.task.description).to.equal("Description of task 1 updated");

    taskFindByIdAndUpdateStub.restore();
  });

  it("should return an error message if there's an error updating task by id", async () => {
    const updateTask = {
      title: "Task 1 updated",
      description: "Description of task 1 updated",
    };
    const taskId = new mongoose.mongo.ObjectId().toHexString();

    const taskFindByIdAndUpdateStub = sinon.stub(Task, "findByIdAndUpdate");
    taskFindByIdAndUpdateStub.rejects("Error updating task");

    const res = await request(app).put(`/tasks/${taskId}`).send(updateTask);

    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal("Error updating task");

    taskFindByIdAndUpdateStub.restore();
  });

  it("should return an error message if title or description are missing", async () => {
    const updateTask = {
      description: "Description of task 1 updated",
      title: " ",
    };
    const taskId = new mongoose.mongo.ObjectId().toHexString();

    const res = await request(app).put(`/tasks/${taskId}`).send(updateTask);

    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal(undefined);
  });

  it("should return an error message when is updating task", async () => {
    const updateTask = { description: "Description of task 1 updated" };
    const taskId = new mongoose.mongo.ObjectId().toHexString();

    const res = await request(app).put(`/tasks/${taskId}`).send(updateTask);

    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal("Error updating task");
  });
});

describe("DELETE /tasks/:id", () => {
  it("should delete task with given id successfully", async () => {
    const taskId = new mongoose.mongo.ObjectId().toHexString();
    const task = {
      _id: taskId,
      title: "Task 1",
      description: "Description of task 1",
    };

    const taskFindByIdAndDeleteStub = sinon.stub(Task, "findByIdAndDelete");
    taskFindByIdAndDeleteStub.resolves(task);

    const res = await request(app).delete(`/tasks/${taskId}`);

    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal("Task deleted successfully");
    expect(res.body.task.title).to.equal("Task 1");
    expect(res.body.task.description).to.equal("Description of task 1");

    taskFindByIdAndDeleteStub.restore();
  });

  it("should return an error message if there's an error deleting task by id", async () => {
    const taskId = new mongoose.mongo.ObjectId().toHexString();

    const taskFindByIdAndDeleteStub = sinon.stub(Task, "findByIdAndDelete");
    taskFindByIdAndDeleteStub.rejects("Error deleting task");

    const res = await request(app).delete(`/tasks/${taskId}`);

    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal("Error deleting task, invalid id");

    taskFindByIdAndDeleteStub.restore();
  });
});
