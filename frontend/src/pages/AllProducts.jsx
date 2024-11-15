import { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import { SummaryApi } from "../common";
import { toast } from "react-toastify";
import AdminProductCard from "../components/AdminProductCard";

function AllProducts() {
	const [openUploadProduct, setOpenUploadProduct] = useState(false);
	const [allProducts, setAllProducts] = useState([]);

	const getAllProducts = async () => {
		const dataResponse = await fetch(SummaryApi.allProducts.url, {
			method: SummaryApi.allProducts.method,
			credentials: "include",
		});

		const dataApi = await dataResponse.json();
		if (dataApi.error) toast.error(dataApi.message);
		if (dataApi.success) setAllProducts(dataApi?.data || []);
	};

	useEffect(() => {
		getAllProducts();
	}, []);

	return (
		<div>
			<div className='bg-white p-2 px-4 flex justify-between items-center'>
				<h2 className='font-bold text-lg'>All Product</h2>
				<button
					className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full'
					onClick={() => setOpenUploadProduct(!openUploadProduct)}
				>
					Upload Product
				</button>
			</div>

			{/* all products */}
			<div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
				{allProducts.map(prod => (
					<AdminProductCard key={prod._id} data={prod} getProducts={getAllProducts} />
				))}
			</div>

			{/* upload product component */}
			{openUploadProduct && (
				<UploadProduct onclose={() => setOpenUploadProduct(!openUploadProduct)} getProducts={getAllProducts} />
			)}
		</div>
	);
}

export default AllProducts;
