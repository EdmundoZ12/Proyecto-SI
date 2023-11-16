const { Router } = require("express");
const { route } = require("../app");

const { getClientes, createCliente, updateCliente, deleteCliente, activateCliente, getCliente } = require("../controllers/cliente.controller")

const router = Router();


router.get("/index", getClientes);

router.get("/get/:id", getCliente);

router.post("/create", createCliente);

router.post("/update/:id", updateCliente);

router.get("/delete/:id", deleteCliente);

router.get("/activate/:id", activateCliente);




module.exports = router;