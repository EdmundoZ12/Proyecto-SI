const { Router } = require("express");
const { authRequired } = require("../middlewares/validateToken");
const {
  getTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
} = require("../controllers/tasks.controllers");
const { validateSchema } = require("../middlewares/validator.middleware");
const { createTaskSchema } = require("../schemas/task.schema");
const router = Router();

router.get("/tasks", authRequired, getTasks);
router.get("/tasks/:id", authRequired, getTask);
router.post(
  "/tasks",
  authRequired,
  validateSchema(createTaskSchema),
  createTask
);
router.delete("/tasks/:id", authRequired, deleteTask);
router.put("/tasks/:id", authRequired, updateTask);

module.exports = router;
