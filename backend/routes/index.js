const express = require("express");
const userSignUpCtrl = require("../controllers/userSignUp");
const userSignInCtrl = require("../controllers/userSignIn");
const router = express.Router();

router.post("/signup", userSignUpCtrl);
router.post("/signin", userSignInCtrl);

module.exports = router;
