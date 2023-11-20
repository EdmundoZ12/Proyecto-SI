const { Router } = require("express");

const {
    CreateEntrenador,
    getEntrenador,
    getEntrenadores,
    updateEntrenador,
    getSoloEntrenadores
} = require("../controllers/entrenador.controller");

const router = Router();

router.get("/entrenador", getEntrenadores);
router.get("/entrenadores", getSoloEntrenadores);

router.get("/entrenador/:id", getEntrenador);

router.post("/entrenador", CreateEntrenador);

router.put("/entrenador/:id", updateEntrenador);



module.exports = router;
