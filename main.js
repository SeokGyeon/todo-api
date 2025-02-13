import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import Task from "./task.js";

dotenv.config();
const app = express();

// const corsOptions = {
//   origin: ["https://todo.com"],
// };

app.use(cors());
app.use(express.json());

await mongoose.connect(process.env.DATABASE_URL);

function asyncHandler(handler) {
  return async function (req, res) {
    //라우트 핸들러와 같은 꼴의 함수를 리턴
    try {
      await handler(req, res);
    } catch (e) {
      if (e.name === "CastError") {
        res.status(404).send({ message: "Cannot find given id" });
      } else if (e.name === "ValidationError") {
        res.status(400).send({ message: e.message });
      } else {
        res.status(500).send({ message: e.message });
      }
    }
  };
}

app.post(
  "/tasks",
  asyncHandler(async (req, res) => {
    const data = req.body;
    const newTask = await Task.create(data);
    res.status(201).send(newTask);
  })
);

app.get(
  "/tasks",
  asyncHandler(async (req, res) => {
    const count = Number(req.query.count) || 0;
    const sortOption =
      req.query.sort === "oldest"
        ? ["createdAt", "asc"]
        : ["createdAt", "desc"];
    const tasks = await Task.find().limit(count).sort([sortOption]);
    res.send(tasks);
  })
);

app.get(
  "/tasks/:id",
  asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (task) {
      res.send(task);
    } else {
      res.status(404).send({ message: "Cannot find given ID" });
    }
  })
);

app.patch(
  "/tasks/:id",
  asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (task) {
      const data = req.body;
      Object.keys(req.body).forEach((key) => {
        task[key] = body[key];
      });
      await task.save();
      res.send(task);
    } else {
      res.status(404).send({ message: "Cannot find given ID" });
    }
  })
);

app.delete(
  "/tasks/:id",
  asyncHandler(async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (task) {
      res.sendStatus(200);
    } else {
      res.status(404).send({ message: "Cannot find given ID" });
    }
  })
);

app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);
