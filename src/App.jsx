import "./App.css";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ForgotPassword from "./pages/ForgotPassword";
import SignUp from "./pages/SignUp";

function App() {
	return (
		<>
			<Header />
			<main className=''>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='login' element={<Login />} />
					<Route path='forgot-password' element={<ForgotPassword />} />
					<Route path='sign-up-password' element={<SignUp />} />
				</Routes>
			</main>
			<Footer />
		</>
	);
}

export default App;
