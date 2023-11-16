const { Router } = require("express");
const { route } = require("../app.js");

const { getCategorias, createCategoria, updateCategoria, deleteCategoria, activateCategoria, getCategoria } = require("../controllers/categoria.controller.js")

const router = Router();



router.get("/index", getCategorias);

router.get("/get/:id", getCategoria);

router.post("/create", createCategoria);

router.put("/update/:id", updateCategoria);

router.delete("/delete/:id", deleteCategoria);

router.get("/activate/:id", activateCategoria);




module.exports = router;