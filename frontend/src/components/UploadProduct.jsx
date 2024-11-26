import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { productsCategory } from "../utils/productsCategory";
import { uploadImage } from "../utils/uploadImage";
import { SummaryApi } from "../common";
import { toast } from "react-toastify";
import DisplayImage from "./DisplayImage";

// eslint-disable-next-line react/prop-types
function UploadProduct({ onclose, getProducts }) {
	const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
	const [fullScreenImage, setFullScreenImage] = useState(false);
	const [data, setData] = useState({
		productName: "",
		productBrand: "",
		category: "",
		productImage: [],
		description: "",
		price: "",
		sellingPrice: "",
	});

	const handleOnChange = e => {
		const { name, value } = e.target;

		setData({
			...data,
			[name]: value,
		});
	};

	const handleUploadProduct = async e => {
		const file = e.target.files[0];
		const uploadImageCloudinary = await uploadImage(file);

		setData(preve => {
			return {
				...preve,
				productImage: [...preve.productImage, uploadImageCloudinary.url],
			};
		});
	};

	const handleDeleteProductImage = image => { 
		setData({
			...data,
			productImage: data.productImage.filter(img => img !== image),
		});
	};

	const handleSubmit = async e => {
		e.preventDefault();

		const dataResponse = await fetch(SummaryApi.uploadProduct.url, {
			method: SummaryApi.uploadProduct.method,
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		const dataApi = await dataResponse.json();
		if (dataApi.error) toast.error(dataApi.message);
		if (dataApi.success) {
			toast.success(dataApi.message);
			onclose();
			getProducts()
		}
	};

	return (
		<div className='fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
			<div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
				<div className='flex justify-between items-center'>
					<h2 className='font-bold text-lg'>Upload Product</h2>
					<div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onclose}>
						<CgClose />
					</div>
				</div>

				<form className='grid p-4 gap-3 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
					<label htmlFor='productName'>Product Name:</label>
					<input
						type='text'
						id='productName'
						name='productName'
						placeholder='Enter product name'
						value={data.productName}
						onChange={handleOnChange}
						className='p-2 bg-slate-100 border rounded'
					/>

					<label htmlFor='productBrand' className='mt-3'>
						Brand Name:
					</label>
					<input
						type='text'
						id='productBrand'
						name='productBrand'
						placeholder='Enter product brand'
						value={data.productBrand}
						onChange={handleOnChange}
						className='p-2 bg-slate-100 border rounded'
					/>

					<label htmlFor='category' className='mt-3'>
						Category:
					</label>
					<select
						value={data.category}
						name='category'
						className='p-2 bg-slate-100 border rounded'
						onChange={handleOnChange}
					>
						<option value=''>Select Category</option>
						{productsCategory.map(category => (
							<option key={category.id} value={category.value}>
								{category.label}
							</option>
						))}
					</select>

					<label htmlFor='productImage' className='mt-3'>
						Product Image:
					</label>
					<label htmlFor='uploadImageInput'>
						<div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
							<div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
								<span className='text-4xl'>
									<FaCloudUploadAlt />
								</span>
								<p className='text-sm'>Upload Product Image</p>
								<input type='file' id='uploadImageInput' onChange={handleUploadProduct} className='hidden' />
							</div>
						</div>
					</label>
					<div>
						{data.productImage[0] ? (
							<div className='flex items-center gap-2'>
								{data.productImage.map(img => (
									<div key={img} className='relative group'>
										<img
											src={img}
											alt={data.productName}
											width={80}
											height={80}
											className='bg-slate-100 border cursor-pointer'
											onClick={() => {
												setOpenFullScreenImage(!openFullScreenImage), setFullScreenImage(img);
											}}
										/>
										<div
											className='absolute bottom-1 right-1 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer'
											onClick={() => handleDeleteProductImage(img)}
										>
											<MdDelete />
										</div>
									</div>
								))}
							</div>
						) : (
							<p className='text-red-600 text-xs'>*Please upload product image</p>
						)}
					</div>

					<label htmlFor='price' className='mt-3'>
						Price:
					</label>
					<input
						type='number'
						id='price'
						name='price'
						placeholder='Enter product price'
						value={data.price}
						onChange={handleOnChange}
						className='p-2 bg-slate-100 border rounded'
					/>

					<label htmlFor='sellingPrice' className='mt-3'>
						Selling price:
					</label>
					<input
						type='number'
						id='sellingPrice'
						name='sellingPrice'
						placeholder='Enter selling price'
						value={data.sellingPrice}
						onChange={handleOnChange}
						className='p-2 bg-slate-100 border rounded'
					/>

					<label htmlFor='description' className='mt-3'>
						Description:
					</label>
					<textarea
						rows={3}
						type='text'
						id='description'
						name='description'
						placeholder='Enter product description'
						value={data.description}
						onChange={handleOnChange}
						className='h-28 bg-slate-100 border resize-none p-1 rounded'
					></textarea>

					<button className='px-3 py-2 bg-red-600 text-white mb-6 hover:bg-red-700'>Upload Product</button>
				</form>
			</div>

			{/* display image full screen */}
			{openFullScreenImage && (
				<DisplayImage onclose={() => setOpenFullScreenImage(!openFullScreenImage)} imgUrl={fullScreenImage} />
			)}
		</div>
	);
}

export default UploadProduct;
