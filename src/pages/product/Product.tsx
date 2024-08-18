import React, { useEffect, useState, useRef } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import HTTPOFFICE, { FormatIDR } from "../../utils/Api";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface Product {
	name: string;
	price: number;
	description: string;
	customerId: number;
	image: { url: string } | null;
}

const Product: React.FC = () => {
	const { user } = useAuth();
	const [data, setData] = useState<Product[]>([]);
	const [focusedSearch, setFocusedSearch] = useState<boolean>(false);
	const [searchInput, setSearchInput] = useState<string>("");
	const searchRef = useRef<HTMLInputElement>(null);

	const productHeader = [
		{ id: 1, name: "Product Name" },
		{ id: 2, name: "Price" },
		{ id: 3, name: "Description" },
	];

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFocusedSearch(true);
		getData(event.target.value);
		if (event.target.value !== "") {
			setSearchInput(event.target.value);
		}
	};

	const getData = async (query: string) => {
		try {
			const response = await HTTPOFFICE.get(`api/products?query=${query}`);
			setData(response.data.data);
			console.log("Received data:", response); // Debugging line

		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (user?.token) {
			setTimeout(() => {
				getData(searchInput);
			}, 300)
		}
	}, [user?.token]);

	const handleClickOutside = (event: MouseEvent) => {
		if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
			setFocusedSearch(false);
		}
	};

	return (
		<>
			<DashboardLayout type="product">
				<main>
					<div className="px-8">
						<div className="flex flex-col py-2 rounded-lg bg-white shadow-lg">
							<div className="border-b-2 flex py-2 justify-between items-center px-4">
								<div>
									<p>Product</p>
								</div>
								<div className="flex items-center">
									<div ref={searchRef} className={`py-2 border-2 px-4 flex items-center right-10 relative bg-white rounded-lg ${focusedSearch ? "border-2 border-blue-500" : "border-2 border-gray-200"}`}>
										<input
											type="text"
											className="outline-none text-sm"
											placeholder="search"
											onFocus={() => setFocusedSearch(true)}
											onChange={handleSearch}
										/>
										<CiSearch color="gray" />
									</div>
									<div className="flex items-center gap-2 bg-blue-300 p-2 rounded-lg text-white hover:bg-blue-500 transition-all ease-in-out cursor-pointer">
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
										<Link to={`/add-product`} className="text-sm font-medium">
											Add Product
										</Link>
									</div>
								</div>
							</div>
							<table className="min-w-full divide-y divide-gray-200">
								<thead className="bg-gray-50">
									<tr>
										{productHeader.map((item) => (
											<th key={item.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												{item.name}
											</th>
										))}
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
									{data.map((item) => (
										<tr key={item.name}>
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="flex items-center gap-4">
													{item.image && (
														<img src={item.image.url} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
													)}
													<p className="text-sm font-medium">{item.name}</p>
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<p className="text-sm font-medium">{FormatIDR(item.price)}</p>
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<p className="text-sm font-medium">{item.description}</p>
											</td>
										</tr>
									))}
								</tbody>
							</table>
							<div className="justify-center py-2 flex gap-2">
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
