const { Router } = require("express");
const { authRequired } = require("../middlewares/validateToken");
const { validateSchema } = require("../middlewares/validator.middleware");
const {
  getPermisos_Rols,
  getPermiso_Rol,
  createPermiso_Rol,
  deletePermiso_Rol,
  updatePermiso_Rol,
} = require("../controllers/rol_funcionalidades.controllers");
const { createRol_FuncionalidadesSchema } = require("../schemas/rol_funcionalidades.schemas");
const router = Router();

router.get("/permisos", authRequired, getPermisos_Rols);
router.get("/permisos/:id_Funcionalidad/:id_Rol", authRequired, getPermiso_Rol);
router.post(
  "/permisos",
  authRequired,
  validateSchema(createRol_FuncionalidadesSchema),
  createPermiso_Rol
);
router.delete(
  "/permisos/:id_Funcionalidad/:id_Rol",
  authRequired,
  deletePermiso_Rol
);
router.put(
  "/permisos/:id_Funcionalidad/:id_Rol",
  authRequired,
  updatePermiso_Rol
);

module.exports = router;
