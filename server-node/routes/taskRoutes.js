const express = require("express");
const router = express.Router();

const { createTask, getTasks, getTask, updateTask, deleteTask } = require("../controllers/taskController");

router.post("/create", createTask);
router.get("/show", getTasks);
router.get("/show/:task_id", getTask);
router.put("/update", updateTask);
router.delete("/delete/:id", deleteTask);

module.exports = router