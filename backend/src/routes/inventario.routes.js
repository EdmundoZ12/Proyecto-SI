const { Router } = require("express");

const { getInventarios, getInventario } = require("../controllers/inventario.controller")

const router = Router();



router.get("/inventario", getInventarios);

router.get("/inventario/:id", getInventario);




module.exports = router;