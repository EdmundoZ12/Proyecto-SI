const { Router } = require("express");
const { route } = require("../app");

const router = Router();


router.get("/hola", (req, res) => {
    res.send('hola como estas sss');
});





module.exports = router;