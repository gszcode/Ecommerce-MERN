import "./App.css";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
	return (
		<>
			<Header />
			<main className=''>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='login' element={<Login />} />
				</Routes>
			</main>
			<Footer />
		</>
	);
}

export default App;
