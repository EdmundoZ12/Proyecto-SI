const { Router } = require("express");
const { route } = require("../app");

const { getRoles, createRol, updateRol, deleteRol, activateRol, getRol } = require("../controllers/rol.controller.js")

const router = Router();


router.get("/prueba", (req, res) => {
    res.send('esto es el rol');
});

router.get("/index", getRoles);

router.get("/get/:id", getRol);

router.post("/create", createRol);

router.post("/update/:id", updateRol);

router.get("/delete/:id", deleteRol);

router.get("/activate/:id", activateRol);




module.exports = router;