import { Routes, Route } from "react-router-dom";
import "./css/App.css";
import React from "react";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Landing from "./components/Landing";
import CreateProduct from "./components/CreateProduct";
import Details from "./components/Details";
import UserDashboard from "./components/UserDashboard";
import Cart from "./components/Cart";
import CheckoutSucces from "./components/CheckoutSucces";
import Error404 from "./components/Error404";
import PrivateRoute from "./auth/PrivateRoute";
import Favorites from "./components/Favorites";

function App() {
	return (
		<div className="App">
			<Nav />
			<Routes>
				<Route index element={<Landing />} />
				<Route path="/home" element={<Home />} />
				<Route path="/create" element={<CreateProduct />} />
				<Route path="/detail/:id" element={<Details />} />
				<Route path="/dashboard" element={<PrivateRoute />}>
					<Route index element={<UserDashboard />} />
				</Route>
				<Route path="/cart" element={<Cart />} />
				<Route path="/checkout-success" element={<CheckoutSucces />} />
				<Route path="*" element={<Error404 />} />
				<Route path="/favorites" element={<Favorites />} />
			</Routes>
		</div>
	);
}

export default App;
