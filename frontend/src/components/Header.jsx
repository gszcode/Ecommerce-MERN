import { useNavigate } from "react-router-dom";
import { GrSearch } from "react-icons/gr";
import Logo from "./Logo";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SummaryApi } from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";

const Header = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user } = useSelector(state => state.user);

	const handleLogout = async () => {
		const responseData = await fetch(SummaryApi.logout.url, {
			method: SummaryApi.logout.method,
			credentials: "include",
		});

		const dataApi = await responseData.json();
		if (dataApi.error) toast.error(dataApi.message);
		if (dataApi.success) {
			toast.success(dataApi.message);
			dispatch(setUserDetails(null));
			navigate("/");
		}
	};

	return (
		<header className='h-16 shadow-md bg-white'>
			<div className='h-full container mx-auto flex items-center px-4 justify-between'>
				<div className=''>
					<Link to='/'>
						<Logo w={90} h={50} />
					</Link>
				</div>

				<div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
					<input type='search' placeholder='search product here...' className='w-full outline-none' />
					<div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white'>
						<GrSearch />
					</div>
				</div>

				<div className='flex items-center gap-7'>
					<div className='text-3xl cursor-pointer relative flex justify-center'>
						{user?.profilePic ? (
							<img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
						) : (
							<FaRegCircleUser />
						)}
					</div>
					<div className='text-2xl relative'>
						<span>
							<FaShoppingCart />
						</span>
						<div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
							<p className='text-sm'>0</p>
						</div>
					</div>
					<div>
						{user?._id ? (
							<button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>
								Logout
							</button>
						) : (
							<Link to={"/login"} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>
								Login
							</Link>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
