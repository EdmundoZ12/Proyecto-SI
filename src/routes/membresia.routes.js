const { Router } = require("express");
const { route } = require("../app");

const { createCliente, getCliente, getClientes } = require("../controllers/membresia.controller")

const router = Router();


router.get("/index", getClientes);

router.get("/get/:id", getCliente);

router.post("/create", createCliente);

// router.put("/update/:id", updateCliente);

// router.get("/delete/:id", deleteCliente);

// router.get("/activate/:id", activateCliente);




module.exports = router;