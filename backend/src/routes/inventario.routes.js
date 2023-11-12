const { Router } = require("express");

const { getInventarios, getInventario } = require("../controllers/inventario.controller")

const router = Router();



router.get("/index", getInventarios);

router.get("/get/:id", getInventario);




module.exports = router;