import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SummaryApi } from "../common";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { displayARGCurrency } from "../utils/displayCurrency";
import CategroyWiseProductDisplay from "../components/CategoryWiseDisplay";

const initialState = {
	productName: "",
	brandName: "",
	category: "",
	productImage: [],
	description: "",
	price: "",
	sellingPrice: "",
};

function ProductDetails() {
	const { id } = useParams();
	const [data, setData] = useState(initialState);
	const [loading, setLoading] = useState(false);
	const [activeImage, setActiveImage] = useState("");
	const [zoomImageCoordinate, setZoomImageCoordinate] = useState({ x: 0, y: 0 });
	const [zoomImage, setZoomImage] = useState(false);
	const productImageListLoading = new Array(4).fill(null);

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
		setActiveImage(dataApi?.data?.productImage[0]);
	};

	useEffect(() => {
		getProductDetails();
	}, []);

	const handleMouseEnterProduct = imageURL => {
		setActiveImage(imageURL);
	};

	const handleZoomImage = e => {
		setZoomImage(true);
		const { left, top, width, height } = e.target.getBoundingClientRect();

		const x = (e.clientX - left) / width;
		const y = (e.clientY - top) / height;

		setZoomImageCoordinate({
			x,
			y,
		});
	};
	const handleLeaveImageZoom = () => {
		setZoomImage(false);
	};

	return (
		<div className='container mx-auto p-4'>
			<div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
				{/*product image*/}
				<div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>
					<div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative'>
						<img
							src={activeImage}
							alt={data?.productName}
							className='h-full w-full object-scale-down mix-blend-multiply'
							onMouseMove={handleZoomImage}
							onMouseLeave={handleLeaveImageZoom}
						/>

						{/*product zoom*/}
						{zoomImage && (
							<div className='hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0'>
								<div
									className='w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-125'
									style={{
										background: `url(${activeImage})`,
										backgroundRepeat: "no-repeat",
										backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}% `,
									}}
								></div>
							</div>
						)}
					</div>

					<div className='h-full'>
						{loading ? (
							<div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
								{productImageListLoading.map(img => (
									<div key={img} className='h-20 w-20 bg-slate-200 rounded animate-pulse'></div>
								))}
							</div>
						) : (
							<div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
								{data?.productImage?.map(img => (
									<div key={img} className='h-20 w-20 bg-slate-200 rounded'>
										<img
											src={img}
											alt={img}
											className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer'
											onMouseEnter={() => handleMouseEnterProduct(img)}
											onClick={() => handleMouseEnterProduct(img)}
										/>
									</div>
								))}
							</div>
						)}
					</div>
				</div>

				{/*product details*/}
				{loading ? (
					<div className='grid gap-1 w-full'>
						<p className='bg-slate-200 animate-pulse h-6 lg:h-8 w-full rounded-full inline-block'></p>
						<h2 className='text-2xl lg:text-4xl font-medium h-6 lg:h-8 bg-slate-200 animate-pulse w-full'></h2>
						<p className='capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8 w-full'></p>

						<div className='text-red-600 bg-slate-200 h-6 lg:h-8 animate-pulse flex items-center gap-1 w-full'></div>

						<div className='flex items-center gap-2 text-xl lg:text-2xl font-medium my-1 h-6 lg:h-8 animate-pulse w-full'>
							<p className='text-red-600 bg-slate-200 w-full'></p>
							<p className='text-slate-400 line-through bg-slate-200 w-full'></p>
						</div>

						<div className='flex items-center gap-3 my-2 w-full'>
							<button className='h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full'></button>
							<button className='h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full'></button>
						</div>

						<div className='w-full'>
							<p className='text-slate-600 font-medium my-1 h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full'></p>
							<p className='h-10 lg:h-12 bg-slate-200 rounded animate-pulse w-full'></p>
						</div>
					</div>
				) : (
					<div className='flex flex-col gap-1'>
						<p className='bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit'>{data?.productBrand}</p>
						<h2 className='text-2xl lg:text-4xl font-medium'>{data?.productName}</h2>
						<p className='capitalize text-slate-400'>{data?.category}</p>

						<div className='text-red-600 flex items-center gap-1'>
							<FaStar />
							<FaStar />
							<FaStar />
							<FaStar />
							<FaStarHalf />
						</div>

						<div className='flex items-center gap-2 text-xl lg:text-2xl font-medium my-1'>
							<p className='text-red-600'>{displayARGCurrency(data?.sellingPrice)}</p>
							<p className='text-slate-400 line-through'>{displayARGCurrency(data?.price)}</p>
						</div>

						<div className='flex items-center gap-3 my-2'>
							<button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] font-medium text-red-600 hover:bg-red-600 hover:text-white'>
								Buy
							</button>
							<button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-red-600 hover:text-red-600 hover:bg-white'>
								Add to Cart
							</button>
						</div>

						<div>
							<p className='text-slate-600 font-medium my-1'>Description:</p>
							<p>{data?.description}</p>
						</div>
					</div>
				)}
			</div>

			{data.category && <CategroyWiseProductDisplay category={data?.category} heading={"Recommended Product"} />}
		</div>
	);
}

export default ProductDetails;
