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
router.get("/user/:username",  getUser);//const  username  = req.params.username;
router.post(
  "/user",
  validateSchema(createUserSchema),
  CreateUsuario
);
router.delete("/user/:username",  deleteUser);
router.put("/user/:id",  updatePersonAndUser);

module.exports = router;