import "./App.css";
import Home from "./pages/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";
import { useAuth } from "./hooks/useAuth";
import Dashboard from "./pages/Dashboard";
import Product from "./pages/product/Product";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import AddProduct from "./pages/product/AddProduct";

function App() {
	const { user } = useAuth();

	return (
		<Routes>
			<Route
				path="/"
				element={user ? <Home /> : <Navigate to={"/login"} replace />}
			/>
			<Route
				path="/dashboard"
				element={user ? <Dashboard /> : <Navigate to={"/login"} replace />}
			/>
			<Route
				path="/product"
				element={user ? <Product /> : <Navigate to={"/login"} replace />}
			/>
			<Route
				path="/product"
				element={user ? <Product /> : <Navigate to={"/login"} replace />}
			/>
			<Route
				path="/add-product"
				element={user ? <AddProduct /> : <Navigate to={"/login"} replace />}
			/>
			<Route
				path="/profile"
				element={user ? <Profile /> : <Navigate to={"/login"} replace />}
			/>
			<Route path="/login" element={<Login onLoginSuccess={() => {}} />} />
			<Route path="/*" element={<ErrorPage />} />
			<Route path="/reset-password" element={<ResetPassword />} />
		</Routes>
	);
}

export default App;
