import "./App.css";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
	return (
		<>
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
		</>
	);
}

export default App;
