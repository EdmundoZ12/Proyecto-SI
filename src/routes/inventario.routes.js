const { Router } = require("express");
const { route } = require("../app");

const { getInventarios, getInventario } = require("../controllers/inventario.controller.js")

const router = Router();



router.get("/index", getInventarios);

router.get("/get/:id", getInventario);




module.exports = router;