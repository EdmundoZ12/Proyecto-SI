const { Router } = require("express");
const { route } = require("../app");
const { authRequired } = require("../middlewares/validateToken");

const { createCliente, getCliente, getClientes } = require("../controllers/membresia.controller")

const router = Router();


router.get("/membresias", getClientes);

router.get("/membresia/:id", getCliente);

router.post("/membresia", createCliente);

// router.put("/update/:id", updateCliente);

// router.get("/delete/:id", deleteCliente);

// router.get("/activate/:id", activateCliente);




module.exports = router;