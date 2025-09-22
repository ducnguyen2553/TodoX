const express = require("express");
const { getAllTasks, createTask, updateTask, deleteTask } = require("../controllers/tasksControllers.js");

const router = express.Router();

router.get("/", getAllTasks);

router.post("/", createTask);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

module.exports = router;