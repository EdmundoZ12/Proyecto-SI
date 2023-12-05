const { Router } = require("express");
const { authRequired } = require("../middlewares/validateToken");
const {
  getFuncionalidades,
  getFuncionalidad,
  createFuncionalidad,
  deleteFuncionalidad,
  updateFuncionalidad,
} = require("../controllers/funcionalidades.controllers");
const { validateSchema } = require("../middlewares/validator.middleware");
const {
  createFuncionalidadSchema,
} = require("../schemas/funcionalidades.schema");
const router = Router();

router.get("/funcionalidades", authRequired, getFuncionalidades);
router.get("/funcionalidades/:id", authRequired, getFuncionalidad);
router.post(
  "/funcionalidades",
  authRequired,
  validateSchema(createFuncionalidadSchema),
  createFuncionalidad
);
router.delete("/funcionalidades/:id", authRequired, deleteFuncionalidad);
router.put("/funcionalidades/:id", authRequired, updateFuncionalidad);

module.exports = router;
