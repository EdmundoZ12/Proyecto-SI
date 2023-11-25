const { Router } = require("express");

const {
    createDisciplina,
    getDisciplina,
    getDisciplinas,
    updateDisciplina
} = require("../controllers/disciplina.controllers");

const router = Router();

router.get("/disciplinas", getDisciplinas);

router.get("/disciplinas/:cod", getDisciplina);

router.post("/disciplinas", createDisciplina);

router.put("/disciplinas/:cod", updateDisciplina);



module.exports = router;
