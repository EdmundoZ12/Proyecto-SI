const { Router } = require("express");

const { getCategorias, createCategoria, updateCategoria, deleteCategoria, activateCategoria, getCategoria } = require("../controllers/categoria.controller")

const router = Router();



router.get("/categorias", getCategorias);

router.get("/categorias/:id", getCategoria);

router.post("/categorias", createCategoria);

router.put("/categorias/:id", updateCategoria);

router.delete("/categorias/:id", deleteCategoria);

router.get("/categorias/:id", activateCategoria);




module.exports = router;