import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Link } from "react-router-dom";
import HTTPOFFICE from "../../utils/Api";
import { useCustomer } from "../../hooks/CustomerContext";

interface Product {
	name: string;
	price: number;
	description: string;
	customerId: number;
	image_data: string;
}

const AddProduct = () => {

	const [formData, setFormData] = useState<Product>({
		name: "",
		price: 0,
		description: "",
		customerId: 0,
		image_data: "",
	});

	const handleSubmit = () => {
		try{
			const response = HTTPOFFICE.post(`api/products`, {

			})
		}catch(err){

		}
	}


	

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		field: keyof Product
	) => {
		setFormData((prevData) => ({
			...prevData,
			[field]: e.target.value,
		}));
	};


	return (
		<>
			<DashboardLayout type="Add Product">
				<main>
					<div className="px-8 flex flex-col gap-4 ">
						<div className="flex items-center gap-2 hover:bg-blue-500 transition-all ease-in-out w-32 py-1 rounded-lg text-white bg-blue-300 px-4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								className="w-5 h-5">
								<path
									fillRule="evenodd"
									d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z"
									clipRule="evenodd"
								/>
							</svg>

							<Link to="/product">Product</Link>
						</div>
						<div className="flex flex-col py-2  rounded-lg bg-white shadow-lg">
							<div>
								<input type="file" value={formData.image_data}/>
							</div>
							<div>
								<input type="text" className="border-2" value={formData.name}/>
								<input type="text" className="border-2" value={formData.description}/>
								<input type="number" className="border-2" value={formData.price}/>
							</div>
						</div>
					</div>
				</main>
			</DashboardLayout>
		</>
	);
};

export default AddProduct;
