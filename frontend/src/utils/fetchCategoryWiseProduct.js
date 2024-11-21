import { SummaryApi } from "../common";

export async function fetchCategoryWiseProduct(category) {
	const dataResponse = await fetch(SummaryApi.categoryProduct.url, {
		method: SummaryApi.categoryProduct.method,
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({
			category: category,
		}),
	});

	const dataApi = await dataResponse.json();
	return dataApi;
}
