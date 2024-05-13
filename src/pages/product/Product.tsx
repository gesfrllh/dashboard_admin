import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { FormatIDR } from "../../utils/Api";
import { Link } from "react-router-dom";

const Product: React.FC = () => {
	const dataProduct = [
		{ id: 1, productName: "Product 1", price: 280000, unit: 2 },
		{ id: 4, productName: "Product 4", price: 280000, unit: 2 },
		{ id: 3, productName: "Product 3", price: 280000, unit: 2 },
		{ id: 2, productName: "Product 2", price: 280000, unit: 2 },
		{ id: 5, productName: "Product 5", price: 280000, unit: 2 },
		{ id: 6, productName: "Product 6", price: 280000, unit: 2 },
		{ id: 7, productName: "Product 7", price: 280000, unit: 2 },
	];
	const productHeader = [
		{ id: 1, name: "Product Name" },
		{ id: 2, name: "Price" },
		{ id: 3, name: "Unit" },
	];

	return (
		<>
			<DashboardLayout type="product">
				<main>
					<div className="px-8">
						<div className="flex flex-col py-2  rounded-lg bg-white shadow-lg">
							<div className="border-b-2 flex py-2 justify-between items-center px-4">
								<div>
									<p>Product</p>
								</div>
								<div className="flex items-center gap-2 bg-blue-300 p-2 rounded-lg text-white hover:bg-blue-500 
								transition-all ease-in-out cursor-pointer">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-4 h-4">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M12 4.5v15m7.5-7.5h-15"
										/>
									</svg>

									<Link to='/add-product'className="text-sm font-medium">Product</Link>
								</div>
							</div>
							<div className="flex justify-between px-4 border-b-2 py-2">
								{productHeader.map((item) => (
									<div key={item.id}>{item.name}</div>
								))}
							</div>
							<div>
								{dataProduct.map((item) => (
									<div
										key={item.id}
										className="flex justify-between px-4 py-2 border-b">
										<p className="text-sm font-medium">{item.productName}</p>
										<p className="pl-20 text-sm font-medium">
											{FormatIDR(item.price)}
										</p>
										<p className="text-sm font-medium">{item.unit}</p>
									</div>
								))}
							</div>
							<div className=" justify-center py-2 flex gap-2">
								<p className="pagination">1</p>
								<p className="pagination">2</p>
								<p className="pagination">3</p>
							</div>
						</div>
					</div>
				</main>
			</DashboardLayout>
		</>
	);
};

export default Product;
