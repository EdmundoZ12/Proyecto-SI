const { Router } = require("express");
const { authRequired } = require("../middlewares/validateToken");
const {
  getRol,
  createRol,
  deleteRol,
  updateRol,
  getRoles,
} = require("../controllers/rol.controllers");
const { validateSchema } = require("../middlewares/validator.middleware");
const { createRolSchema } = require("../schemas/rol.schema");
const router = Router();

router.get("/roles", authRequired, getRoles);
router.get("/roles/:id", authRequired, getRol);
router.post(
  "/roles",
  validateSchema(createRolSchema),
  createRol
);
router.delete("/roles/:id", authRequired, deleteRol);
router.put("/roles/:id", authRequired, updateRol);

module.exports = router;
