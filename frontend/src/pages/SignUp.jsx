import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import signupIcon from "../assest/signin.gif";
import { imageTobase64 } from "../utils/imageTobase64";
import { SummaryApi } from "../common";
import { toast } from "react-toastify";

const SignUp = () => {
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [data, setData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
		profilePic: "",
	});

	const handleChange = e => {
		const { name, value } = e.target;

		setData({
			...data,
			[name]: value,
		});
	};

	const handleUploadPic = async e => {
		const file = e.target.files[0];
		const imagePic = await imageTobase64(file);
		setData({
			...data,
			profilePic: imagePic,
		});
	};

	const hanleSubmit = async e => {
		e.preventDefault();

		if (data.password === data.confirmPassword) {
			const dataResponse = await fetch(SummaryApi.signUp.url, {
				method: SummaryApi.signUp.method,
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			const dataApi = await dataResponse.json();
			if (dataApi.success) {
				toast.success(dataApi.message);
				navigate("/login");
			}
			if (dataApi.error) {
				toast.error(dataApi.message);
			}
		} else {
			console.log("Please check password and confirm");
		}
	};

	return (
		<section id='signup'>
			<div className='mx-auto container p-4'>
				<div className='bg-white p-5 w-full max-w-sm mx-auto'>
					<div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
						<div>
							<img src={data.profilePic || signupIcon} alt='Login Icon' />
						</div>
						<form>
							<label>
								<div className='text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
									Upload Photo
								</div>
								<input type='file' className='hidden' onChange={handleUploadPic} />
							</label>
						</form>
					</div>

					<form className='pt-6 flex flex-col gap-2' onSubmit={hanleSubmit}>
						<div className='grid'>
							<label>Name: </label>
							<div className='bg-slate-100 p-2'>
								<input
									type='text'
									placeholder='enter your name'
									className='w-full h-full outline-none bg-transparent'
									onChange={handleChange}
									value={data.name}
									name='name'
								/>
							</div>
						</div>
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
						</div>
						<div className='grid'>
							<label>Confirm password: </label>
							<div className='bg-slate-100 p-2 flex'>
								<input
									type={showConfirmPassword ? "" : "password"}
									placeholder='enter confirm password'
									className='w-full h-full outline-none bg-transparent'
									onChange={handleChange}
									value={data.confirmPassword}
									name='confirmPassword'
								/>
								<div className='cursor-pointer text-xl' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
									<span>{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}</span>
								</div>
							</div>
						</div>

						<button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>
							Sing up
						</button>
					</form>

					<p className='my-4'>
						Already have account?{" "}
						<Link to='/login' className='text-red-600 hover:text-red-700 hover:underline'>
							Login
						</Link>
					</p>
				</div>
			</div>
		</section>
	);
};

export default SignUp;
