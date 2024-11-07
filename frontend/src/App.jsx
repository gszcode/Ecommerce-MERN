import "./App.css";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ForgotPassword from "./pages/ForgotPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { SummaryApi } from "./common";
import Context from "./context";
import { setUserDetails } from "./store/userSlice";
import { useDispatch } from "react-redux";

function App() {
	const dispatch = useDispatch();

	const getUserDetails = async () => {
		const dataResponse = await fetch(SummaryApi.userDetails.url, {
			method: SummaryApi.userDetails.method,
			credentials: "include",
		});

		const dataApi = await dataResponse.json();
		if (dataApi.success) {
			dispatch(setUserDetails(dataApi.data));
		}
	};

	useEffect(() => {
		getUserDetails();
	}, []);

	return (
		<Context.Provider value={{ getUserDetails }}>
			<ToastContainer />
			<Header />
			<main className='min-h-[calc(100vh-120px)]'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='login' element={<Login />} />
					<Route path='forgot-password' element={<ForgotPassword />} />
					<Route path='sign-up' element={<SignUp />} />
				</Routes>
			</main>
			<Footer />
		</Context.Provider>
	);
}

export default App;
