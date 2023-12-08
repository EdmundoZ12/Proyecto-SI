const { Router } = require("express");

const {  Create_Factura, getFacturas } = require("../controllers/factura.controller")

const router = Router();



router.post("/facturas", Create_Factura);

router.get("/facturas", getFacturas);




module.exports = router;