// const backendDomain = "http://localhost:8080/api";
const backendDomain = "https://ecommerce-shop-nueg.onrender.com/api";

export const SummaryApi = {
	signUp: {
		method: "POST",
		url: `${backendDomain}/signup`,
	},
	signIn: {
		method: "POST",
		url: `${backendDomain}/signin`,
	},
	userDetails: {
		method: "GET",
		url: `${backendDomain}/user-details`,
	},
	logout: {
		method: "GET",
		url: `${backendDomain}/logout`,
	},
	allUsers: {
		method: "GET",
		url: `${backendDomain}/all-users`,
	},
	updateUser: {
		method: "POST",
		url: `${backendDomain}/update-user`,
	},
	uploadProduct: {
		method: "POST",
		url: `${backendDomain}/upload-product`,
	},
	allProducts: {
		method: "GET",
		url: `${backendDomain}/all-products`,
	},
	updateProduct: {
		method: "POST",
		url: `${backendDomain}/update-product`,
	},
	categoriesProduct: {
		method: "GET",
		url: `${backendDomain}/categories-product`,
	},
	categoryProduct: {
		method: "POST",
		url: `${backendDomain}/category-product`,
	},
	productDetails: {
		method: "POST",
		url: `${backendDomain}/product-details`,
	},
	addToCart: {
		method: "POST",
		url: `${backendDomain}/add-cart`,
	},
	countCart: {
		method: "GET",
		url: `${backendDomain}/count-cart`,
	},
	viewProductCart: {
		method: "GET",
		url: `${backendDomain}/view-cart`,
	},
	updateProductCart: {
		method: "POST",
		url: `${backendDomain}/update-cart-product`,
	},
	deleteCartProduct: {
		method: "POST",
		url: `${backendDomain}/delete-cart-product`,
	},
	searchProduct: {
		method: "GET",
		url: `${backendDomain}/search`,
	},
	filterProduct: {
		method: "POST",
		url: `${backendDomain}/filter-product`,
	},
};
