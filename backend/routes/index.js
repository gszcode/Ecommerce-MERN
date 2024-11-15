const express = require("express");
const userSignUpCtrl = require("../controllers/userSignUp");
const userSignInCtrl = require("../controllers/userSignIn");
const userDetailsCtrl = require("../controllers/userDetails");
const authToken = require("../middleware/authToken");
const userLogoutCtrl = require("../controllers/userLogout");
const allUsersCtrl = require("../controllers/allUsers");
const updateUserRoleCtrl = require("../controllers/updateUserRole");
const uploadProductCtrl = require("../controllers/uploadProduct");
const allProductsCtrl = require("../controllers/allProducts");
const updateProductCtrl = require("../controllers/updateProduct");
const router = express.Router();

router.post("/signup", userSignUpCtrl);
router.post("/signin", userSignInCtrl);
router.get("/user-details", authToken, userDetailsCtrl);
router.get("/logout", userLogoutCtrl);

//admin panel
router.get("/all-users", authToken, allUsersCtrl);
router.post("/update-user", authToken, updateUserRoleCtrl);

//product
router.post("/upload-product", authToken, uploadProductCtrl);
router.get("/all-products", authToken, allProductsCtrl);
router.post("/update-product", authToken, updateProductCtrl);

module.exports = router;
