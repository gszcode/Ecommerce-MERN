const express = require("express");
const userSignUpCtrl = require("../controllers/user/userSignUp");
const userSignInCtrl = require("../controllers/user/userSignIn");
const userDetailsCtrl = require("../controllers/user/userDetails");
const authToken = require("../middleware/authToken");
const userLogoutCtrl = require("../controllers/user/userLogout");
const allUsersCtrl = require("../controllers/user/allUsers");
const updateUserRoleCtrl = require("../controllers/user/updateUserRole");
const uploadProductCtrl = require("../controllers/product/uploadProduct");
const allProductsCtrl = require("../controllers/product/allProducts");
const updateProductCtrl = require("../controllers/product/updateProduct");
const getCategoryProductCtrl = require("../controllers/product/getCategoryProductOne");
const getCategoryWiseProduct = require("../controllers/product/getCategoryWiseProduct");
const getProductDetailsCtrl = require("../controllers/product/getProductDetails");
const addToCartCtrl = require("../controllers/user/addToCart");
const countAddToCartCtrl = require("../controllers/user/countAddToCart");
const viewProductCartCtrl = require("../controllers/user/viewProductCart");
const updateCartProductCtrl = require("../controllers/user/updateCartProduct");
const deleteCartProductCtrl = require("../controllers/user/deleteCartProduct");
const searchProductCtrl = require("../controllers/product/searchProduct");
const filterProductCtrl = require("../controllers/product/filterProduct");
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
router.get("/all-products", allProductsCtrl);
router.post("/update-product", authToken, updateProductCtrl);
router.get("/categories-product", getCategoryProductCtrl);
router.post("/category-product", getCategoryWiseProduct);
router.post("/product-details", getProductDetailsCtrl);
router.get("/search", searchProductCtrl);
router.post("/filter-product", filterProductCtrl);

//user add to cart
router.post("/add-cart", authToken, addToCartCtrl);
router.get("/count-cart", authToken, countAddToCartCtrl);
router.get("/view-cart", authToken, viewProductCartCtrl);
router.post("/update-cart-product", authToken, updateCartProductCtrl);
router.post("/update-cart-product", authToken, updateCartProductCtrl);
router.post("/delete-cart-product", authToken, deleteCartProductCtrl);

module.exports = router;
