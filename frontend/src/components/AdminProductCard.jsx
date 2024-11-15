import { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import { displayARGCurrency } from "../utils/displayCurrency";

/* eslint-disable react/prop-types */
function AdminProductCard({ data, getProducts }) {
	const [editProduct, setEditProduct] = useState();

	return (
		<div className='bg-white p-4 rounded'>
			<div className='w-40'>
				<div className='w-32 h-32 flex justify-center items-center'>
					<img src={data.productImage[0]} width={120} height={120} className='mx-auto object-fill h-full' />
				</div>
				<h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>

				<div>
					<p className='font-semibold'>{displayARGCurrency(data.sellingPrice)}</p>
					<div
						className='w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer'
						onClick={() => setEditProduct(!editProduct)}
					>
						<MdModeEditOutline />
					</div>
				</div>
			</div>

			{editProduct && (
				<AdminEditProduct prod={data} onclose={() => setEditProduct(!editProduct)} getProducts={getProducts} />
			)}
		</div>
	);
}

export default AdminProductCard;
