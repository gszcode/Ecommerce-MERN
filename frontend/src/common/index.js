const backendDomain = "http://localhost:8080/api";

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
};
