const { Router } = require("express");

const { getHorarios, createHorario, updateHorario, deleteHorario, getHorario } = require("../controllers/horario.controller")

const router = Router();



router.get("/horario", getHorarios);

router.get("/horario/:id", getHorario);

router.post("/horario", createHorario);

router.put("/horario/:id", updateHorario);

router.delete("/horario/:id", deleteHorario);





module.exports = router;