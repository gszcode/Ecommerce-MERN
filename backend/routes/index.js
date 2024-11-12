const express = require("express");
const userSignUpCtrl = require("../controllers/userSignUp");
const userSignInCtrl = require("../controllers/userSignIn");
const userDetailsCtrl = require("../controllers/userDetails");
const authToken = require("../middleware/authToken");
const userLogoutCtrl = require("../controllers/userLogout");
const allUsersCtrl = require("../controllers/allUsers");
const updateUserRoleCtrl = require("../controllers/updateUserRole");
const router = express.Router();

router.post("/signup", userSignUpCtrl);
router.post("/signin", userSignInCtrl);
router.get("/user-details", authToken, userDetailsCtrl);
router.get("/logout", userLogoutCtrl);

//admin panel
router.get("/all-users", authToken, allUsersCtrl);
router.post("/update-user", authToken, updateUserRoleCtrl);

module.exports = router;
