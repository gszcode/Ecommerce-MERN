const express = require("express");
const userSignUpCtrl = require("../controllers/userSignUp");
const router = express.Router();

router.post("/signup", userSignUpCtrl);

module.exports = router;
