import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SummaryApi } from "../common";

function ProductDetails() {
	const { id } = useParams();
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState({
		productName: "",
		brandName: "",
		category: "",
		productImage: [],
		description: "",
		price: "",
		sellingPrice: "",
	});

	console.log(data);

	const getProductDetails = async () => {
		setLoading(true);
		const dataResponse = await fetch(SummaryApi.productDetails.url, {
			method: SummaryApi.productDetails.method,
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				productId: id,
			}),
		});

		setLoading(false);
		const dataApi = await dataResponse.json();
		setData(dataApi?.data);
	};

	useEffect(() => {
		getProductDetails();
	}, []);

	return <div></div>;
}

export default ProductDetails;
