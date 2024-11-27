import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { displayARGCurrency } from "../utils/displayCurrency";
import { fetchCategoryWiseProduct } from "../utils/fetchCategoryWiseProduct";
import { addToCart } from "../utils/addToCart";
import { scrollTop } from "../utils/scrollTop";
import Context from "../context";

// eslint-disable-next-line react/prop-types
function CategroyWiseProductDisplay({ category, heading }) {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const loadingList = new Array(13).fill(null);
	const { getCountCart } = useContext(Context);

	const handleAddToCart = async (e, id) => {
		await addToCart(e, id);
		getCountCart();
	};

	const fetchData = async () => {
		setLoading(true);
		const categoryProduct = await fetchCategoryWiseProduct(category);
		setLoading(false);

		setData(categoryProduct?.data);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className='container mx-auto px-4 my-6 relative'>
			<h2 className='text-2xl font-semibold py-4'>{heading}</h2>

			<div className='grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-between md:gap-6 overflow-x-scroll scrollbar-none transition-all'>
				{loading
					? loadingList.map(product => (
							<div
								key={product?._id}
								className='w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow '
							>
								<div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'></div>
								<div className='p-4 grid gap-3'>
									<h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200'></h2>
									<p className='capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200  py-2'></p>
									<div className='flex gap-3'>
										<p className='text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2'></p>
										<p className='text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2'></p>
									</div>
									<button className='text-sm  text-white px-3  rounded-full bg-slate-200  py-2 animate-pulse'></button>
								</div>
							</div>
					  ))
					: data.map(product => (
							<Link
								key={product?._id}
								to={"/product/" + product?._id}
								className='w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow '
								onClick={scrollTop}
							>
								<div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
									<img
										src={product.productImage[0]}
										className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply'
									/>
								</div>
								<div className='p-4 grid gap-3'>
									<h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>
										{product?.productName}
									</h2>
									<p className='capitalize text-slate-500'>{product?.category}</p>
									<div className='flex gap-3'>
										<p className='text-red-600 font-medium'>{displayARGCurrency(product?.sellingPrice)}</p>
										<p className='text-slate-500 line-through'>{displayARGCurrency(product?.price)}</p>
									</div>
									<button
										className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full'
										onClick={e => handleAddToCart(e, product?._id)}
									>
										Add to Cart
									</button>
								</div> 
							</Link>
					  ))}
			</div>
		</div>
	);
}

export default CategroyWiseProductDisplay;
