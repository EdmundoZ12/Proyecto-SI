const { Router } = require("express");

const { getProveedores, createProveedor, updateProveedor, deleteProveedor, activateProveedor, getProveedor } = require("../controllers/proveedor.controller")

const router = Router();



router.get("/proveedores", getProveedores);

router.get("/proveedores/:id", getProveedor);

router.post("/proveedores", createProveedor);

router.put("/proveedores/:id", updateProveedor);

router.delete("/proveedores/:id", deleteProveedor);

router.get("/proveedores/:id", activateProveedor);




module.exports = router;