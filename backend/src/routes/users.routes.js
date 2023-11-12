const { Router } = require("express");
const { authRequired } = require("../middlewares/validateToken");
const {
  getUser,
  getUsers,
  CreateUsuario,
  deleteUser,
  updatePersonAndUser,
} = require("../controllers/user.controllers");
const { validateSchema } = require("../middlewares/validator.middleware");
const { createUserSchema } = require("../schemas/users.schema");
const router = Router();

router.get("/user", getUsers);
router.get("/user/:username", authRequired, getUser);//const  username  = req.params.username;
router.post(
  "/user",
  authRequired,
  validateSchema(createUserSchema),
  CreateUsuario
);
router.delete("/user/:username", authRequired, deleteUser);
router.put("/user/:id", authRequired, updatePersonAndUser);

module.exports = router;