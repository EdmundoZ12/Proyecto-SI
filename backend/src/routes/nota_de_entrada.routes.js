const { Router } = require("express");

const { Notas_Entrada, CreateNota_Entrada } = require("../controllers/nota_entrada.controller")

const router = Router();



router.post("/nota-de-entrada", CreateNota_Entrada);

router.get("/nota-de-entrada", Notas_Entrada);




module.exports = router;