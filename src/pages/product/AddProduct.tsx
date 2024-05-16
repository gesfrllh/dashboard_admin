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
	const [imgUrl, setImgUrl] = useState<string>("");
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [formData, setFormData] = useState<Product>({
		name: "",
		price: 0,
		description: "",
		customerId: 0,
		image_data: "",
	});

	const handleSubmit = () => {
		// try{
		// 	const response = HTTPOFFICE.post(`api/products`, {

		// 	})
		// }catch(err){

		// }
		console.log(formData);
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		field: keyof Product
	) => {
		setFormData((prevData) => ({
			...prevData,
			[field]: e.target.value,
		}));
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.currentTarget.files;
		if (files && files.length > 0) {
			const file = files[0];
			const fileUrl = URL.createObjectURL(file);
			console.log("URL file: ", fileUrl);
			setImgUrl(fileUrl);
		}
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
							<div className="px-4 py-4 border-b-2 text-end">Add Product</div>
							<div className="px-32 py-4 flex justify-between items-center">
								<div className="flex flex-col gap-4 ">
									<div>
										<p>Upload Image</p>
									</div>
									<div className="flex gap-12">
										<div className="border-2 rounded-xl w-36 hover:bg-blue-50 hover:border-blue-500 relative h-36 flex items-center justify-center">
											<div className="absolute  text-blue-500">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="currentColor"
													viewBox="0 0 20 20"
													className="w-5 h-5">
													<path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
													<path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
												</svg>
											</div>
											<input
												type="file"
												onChange={handleFileChange}
												className="text-sm relative text-white border-
													file:h-36 file:rounded-xl file:w-36 file:py-1 file:border-0 file:text-transparent
													file:text-xs file:font-medium file:outline-none
													file:bg-transparent 
													hover:file:cursor-pointer"
											/>
										</div>
										<div>
											<img src={imgUrl} alt="" height={32} className="h-36" />
										</div>
									</div>
								</div>
								<div className="flex flex-col w-56 py-4">
									<div className="flex flex-col gap-2 pb-2">
										<label htmlFor="">Product Name</label>
										<input
											type="text"
											className="border-2 focus:border-blue-500 hover:border-blue-300 outline-none rounded-lg px-4 text-sm py-1"
											onChange={(e) => handleInputChange(e, "name")}
											value={formData.name}
										/>
									</div>
									<div className="flex flex-col gap-2 py-2">
										<label htmlFor="">Price</label>
										<input
											type="number"
											className="border-2 focus:border-blue-500 hover:border-blue-300 outline-none rounded-lg px-4 text-sm py-1"
											onChange={(e) => handleInputChange(e, "price")}
											value={formData.price}
										/>
									</div>
									<div className="flex flex-col gap-2 py-2">
										<label htmlFor="">Description</label>
										<textarea
											rows={4}
											className="border-2 textar focus:border-blue-500 hover:border-blue-300 outline-none rounded-lg px-4 text-sm py-1"
											onChange={(e) => handleInputChange(e, "description")}
											value={formData.description}
										/>
									</div>
									<div className="flex py-2 justify-center">
										<button className="text-white hover:bg-blue-500 px-4 py-1 rounded-lg bg-blue-300">Submit</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</main>
			</DashboardLayout>
		</>
	);
};

export default AddProduct;
