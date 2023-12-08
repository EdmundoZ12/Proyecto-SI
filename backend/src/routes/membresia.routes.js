const { Router } = require("express");
const { route } = require("../app");

const { createCliente, getCliente, getClientes,getClienteMembresia, getEntrenadorEstudiante,getPago } = require("../controllers/membresia.controller")

const router = Router();


router.get("/index", getClientes);

router.get("/get/:id", getCliente);

router.post("/create", createCliente);

router.get("/getclimem",getClienteMembresia);

router.get("/getentest",getEntrenadorEstudiante);

router.get("/pago/:id",getPago);


// router.put("/update/:id", updateCliente);

// router.get("/delete/:id", deleteCliente);

// router.get("/activate/:id", activateCliente);




module.exports = router;