const { Router } = require("express");

const { getBitacoras } = require("../controllers/bitacora.controller")

const router = Router();


router.get("/bitacoras", getBitacoras);





module.exports = router;