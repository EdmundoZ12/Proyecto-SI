const { Router } = require("express");
const { route } = require("../app");

const { getBitacoras } = require("../controllers/bitacora.controller")

const router = Router();


router.get("/bitacoras", getBitacoras);

// router.get("/cliente/:id", getCliente);

// router.post("/cliente", createBitacora);

// router.put("/cliente/:id", updateCliente);

// router.get("/cliente/:id", deleteCliente);

// router.get("/cliente/:id", activateCliente);




module.exports = router;