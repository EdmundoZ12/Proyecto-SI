const { Router } = require("express");
const { route } = require("../app");

const { getClientes, createCliente, updateCliente, deleteCliente, activateCliente, getCliente } = require("../controllers/cliente.controller")

const router = Router();


router.get("/clientes", getClientes);

router.get("/cliente/:id", getCliente);

router.post("/cliente", createCliente);

router.put("/cliente/:id", updateCliente);

router.get("/cliente/:id", deleteCliente);

router.get("/cliente/:id", activateCliente);




module.exports = router;