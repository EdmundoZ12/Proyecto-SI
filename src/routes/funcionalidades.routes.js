const { Router } = require("express");
const { route } = require("../app");

const { getFuncionalidades, createFuncionalidad, updateFuncionalidad, deleteFuncionalidad, activateFuncionalidad, getFuncionalidad } = require("../controllers/funcionalidad.controller.js")

const router = Router();


router.get("/prueba", (req, res) => {
    res.send('esto es el rol');
});

router.get("/index", getFuncionalidades);

router.get("/get/:id", getFuncionalidad);

router.post("/create", createFuncionalidad);

router.post("/update/:id", updateFuncionalidad);

router.get("/delete/:id", deleteFuncionalidad);

router.get("/activate/:id", activateFuncionalidad);




module.exports = router;