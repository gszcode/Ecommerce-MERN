import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SummaryApi } from "../common";
import ProductCard from "../components/ProductCard";

function SearchProduct() {
	const query = useLocation();
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);

	const fetchSearchProduct = async () => {
		setLoading(true);
		const dataResponse = await fetch(SummaryApi.searchProduct.url + query.search);
		const dataApi = await dataResponse.json();
		setLoading(false);

		setData(dataApi.data);
	};

	useEffect(() => {
		fetchSearchProduct();
	}, [query]);

	return (
		<div className='container mx-auto p-4'>
			{loading && <p className='text-lg text-center'>Loading ...</p>}

			<p className='text-lg font-semibold my-3'>Search Results : {data?.length}</p>

			{data?.length === 0 && !loading && <p className='bg-white text-lg text-center p-4'>No Data Found....</p>}

			{data?.length !== 0 && !loading && <ProductCard loading={loading} data={data} />}
		</div>
	);
}

export default SearchProduct;
