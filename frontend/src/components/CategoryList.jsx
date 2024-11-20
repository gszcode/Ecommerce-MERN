import { useEffect, useState } from "react";
import { SummaryApi } from "../common";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function CategoryList() {
	const [categoryProduct, setCategoryProduct] = useState([]);
	const [loading, setLoading] = useState(false);

	const categoryLoading = new Array(13).fill(null);

	const getCategoryProduct = async () => {
		setLoading(true);
		const dataResponse = await fetch(SummaryApi.categoryProduct.url, {
			method: SummaryApi.categoryProduct.method,
			credentials: "include",
		});

		const dataApi = await dataResponse.json();
		setLoading(false);

		if (dataApi.success) setCategoryProduct(dataApi.data);
		if (dataApi.error) toast.error(dataApi.message);
	};

	useEffect(() => {
		getCategoryProduct();
	}, []);

	return (
		<div className='container mx-auto p-4'>
			<div className='flex items-center gap-4 justify-between overflow-scroll scrollbar-none'>
				{loading
					? categoryLoading.map((el, index) => (
							<div
								className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse'
								key={"categoryLoading" + index}
							></div>
					  ))
					: categoryProduct.map(prod => (
							<Link to={`/product-category/${prod?.category}`} key={prod._id} className='cursor-pointer'>
								<div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center'>
									<img
										src={prod?.productImage[0]}
										alt={prod?.categoty}
										className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all'
									/>
								</div>
								<p className='text-center text-sm md:text-base capitalize'>{prod?.category}</p>
							</Link>
					  ))}
			</div>
		</div>
	);
}

export default CategoryList;
