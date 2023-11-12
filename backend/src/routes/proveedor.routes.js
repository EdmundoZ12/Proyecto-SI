const { Router } = require("express");

const { getProveedores, createProveedor, updateProveedor, deleteProveedor, activateProveedor, getProveedor } = require("../controllers/proveedor.controller")

const router = Router();



router.get("/index", getProveedores);

router.get("/get/:id", getProveedor);

router.post("/create", createProveedor);

router.put("/update/:id", updateProveedor);

router.delete("/delete/:id", deleteProveedor);

router.get("/activate/:id", activateProveedor);




module.exports = router;