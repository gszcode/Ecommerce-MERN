import { SummaryApi } from "../common";
import { toast } from "react-toastify";

export async function addToCart(e, id) {
	e.stopPropagation();
	e.preventDefault();

	const dataResponse = await fetch(SummaryApi.addToCart.url, {
		method: SummaryApi.addToCart.method,
		credentials: "include",
		headers: {
			"Content-type": "application/json",
		},
		body: JSON.stringify({ productId: id }),
	});

	const dataApi = await dataResponse.json();
	if (dataApi.success) toast.success(dataApi.message);
	if (dataApi.error) toast.error(dataApi.message);

	return dataApi;
}
