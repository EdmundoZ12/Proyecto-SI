const { Router } = require("express");
const {
  login, register, logout, profile, verifyToken
} = require("../controllers/auth.controllers");
const pool = require("../db");
const {authRequired} = require('../middlewares/validateToken');
const  {validateSchema}= require('../middlewares/validator.middleware');
const {loginSchema} = require('../schemas/auth.schema');
const router = Router();



router.post("/login",validateSchema(loginSchema), login);
router.post("/logout",authRequired,logout);
router.get("/profile",authRequired,profile);
router.get("/verify",verifyToken)

module.exports = router;