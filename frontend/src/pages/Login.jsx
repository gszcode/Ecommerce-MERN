import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useState } from "react";
import { Link } from "react-router-dom";
import { SummaryApi } from "../common";
import { toast } from "react-toastify";
import loginIcon from "../assest/signin.gif";

const Login = () => {
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const [data, setData] = useState({
		email: "",
		password: "",
	});

	const handleChange = e => {
		const { name, value } = e.target;

		setData({
			...data,
			[name]: value,
		});
	};

	const hanleSubmit = async e => {
		e.preventDefault();

		const dataResponse = await fetch(SummaryApi.signIn.url, {
			method: SummaryApi.signIn.method,
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		const dataApi = await dataResponse.json();
		if (dataApi.success) {
			toast.success(dataApi.message);
			navigate("/");
		}
		if (dataApi.error) {
			toast.error(dataApi.message);
		}
	};

	return (
		<section id='login'>
			<div className='mx-auto container p-4'>
				<div className='bg-white p-5 w-full max-w-sm mx-auto'>
					<div className='w-20 h-20 mx-auto'>
						<img src={loginIcon} alt='Login Icon' />
					</div>

					<form className='pt-6 flex flex-col gap-2' onSubmit={hanleSubmit}>
						<div className='grid'>
							<label>Email: </label>
							<div className='bg-slate-100 p-2'>
								<input
									type='email'
									placeholder='enter email'
									className='w-full h-full outline-none bg-transparent'
									onChange={handleChange}
									value={data.email}
									name='email'
								/>
							</div>
						</div>
						<div className='grid'>
							<label>Password: </label>
							<div className='bg-slate-100 p-2 flex'>
								<input
									type={showPassword ? "" : "password"}
									placeholder='enter password'
									className='w-full h-full outline-none bg-transparent'
									onChange={handleChange}
									value={data.password}
									name='password'
								/>
								<div className='cursor-pointer text-xl' onClick={() => setShowPassword(!showPassword)}>
									<span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
								</div>
							</div>
							<Link to='/forgot-password' className='block w-fit ml-auto hover:underline hover:text-red-600'>
								Forgot password?
							</Link>
						</div>

						<button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>
							Login
						</button>
					</form>

					<p className='my-4'>
						Don&apos;t have account?{" "}
						<Link to='/sign-up' className='text-red-600 hover:text-red-700 hover:underline'>
							Sign up
						</Link>
					</p>
				</div>
			</div>
		</section>
	);
};

export default Login;
