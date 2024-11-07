const backendDomain = "http://localhost:8080";

export const SummaryApi = {
	signUp: {
		method: "POST",
		url: `${backendDomain}/api/signup`,
	},
	signIn: {
		method: "POST",
		url: `${backendDomain}/api/signin`,
	},
	userDetails: {
		method: "GET",
		url: `${backendDomain}/api/user-details`,
	},
	logout: {
		method: "GET",
		url: `${backendDomain}/api/logout`,
	},
};
