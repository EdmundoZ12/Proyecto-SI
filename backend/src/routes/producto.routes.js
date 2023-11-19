const { Router } = require("express");

const { getProductos, createProducto, updateProducto, deleteProducto, activateProducto, getProducto } = require("../controllers/producto.controller")

const router = Router();



router.get("/productos", getProductos);

router.get("/productos/:id", getProducto);

router.post("/productos", createProducto);

router.put("/productos/:id", updateProducto);

router.delete("/productos/:id", deleteProducto);

router.get("/productos/:id", activateProducto);




module.exports = router;