const { Router } = require("express");

const { getProductos, createProducto, updateProducto, deleteProducto, activateProducto, getProducto } = require("../controllers/producto.controller")

const router = Router();



router.get("/index", getProductos);

router.get("/get/:id", getProducto);

router.post("/create", createProducto);

router.put("/update/:id", updateProducto);

router.delete("/delete/:id", deleteProducto);

router.get("/activate/:id", activateProducto);




module.exports = router;