const { Router } = require("express");

const { getClientes, createCliente, updateCliente, deleteCliente, activateCliente, getCliente } = require("../controllers/cliente.controller")

const router = Router();


router.get("/clientes", getClientes);

router.get("/clientes/:id", getCliente);

router.post("/clientes", createCliente);

router.put("/clientes/:id", updateCliente);

router.get("/clientes/:id", deleteCliente);

router.get("/clientes/:id", activateCliente);




module.exports = router;