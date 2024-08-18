import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import HTTPOFFICE, { FormatIDR } from "../utils/Api";
import { useAuth } from "../hooks/useAuth";
import { Dashboards } from "../type";
import { MdOutlineTrendingUp } from "react-icons/md";

const Dashboard: React.FC = () => {
	const [dataDashboard, setDataDashboard] = useState<Dashboards[]>([]);
	const { user } = useAuth();

	const currentDate = new Date();

	const dayOfWeek = currentDate.toLocaleDateString("en-US", {
		weekday: "long",
	});

	const dayOfMonth = currentDate.getDate();
	const month = currentDate.toLocaleDateString("en-US", { month: "long" });
	const year = currentDate.getFullYear();

	const getMaxItem = (price: string[]) => {
		const priceAsNumbers: number[] = price.map((prices) => parseFloat(prices));
		return Math.max(...priceAsNumbers);
	};

	const getTotal = (total: number[]) => {
		const totalAll: number[] = total.map((item) => item)
		const totalSum = totalAll.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
		return FormatIDR(totalSum);
	}

	useEffect(() => {
		const getDashboard = async () => {
			try {
				if (user?.token) {
					const response = await HTTPOFFICE.get(`api/dashboard`, {
						headers: {
							Authorization: `Bearer ${user.token}`,
						},
					});
					const dashboardData = response.data;
					setDataDashboard(dashboardData);
					console.log(dashboardData);
				}
			} catch (err) {
				console.log("Error fetching Dashboard Data:", err);
			}
		};
		getDashboard();
	}, []);

	return (
		<div>
			<DashboardLayout type={'dashboard'}>
				<main>
					{dataDashboard.map((item) => (
						<div className="h-full flex flex-col gap-4 px-8 py-4" key={item.id}>
							<div className=" py-1 px-2 w-[200px] font-medium bg-white rounded-lg">
								<p className="uppercase">{item.name || '-'}</p>
								<p className="text-sm font-medium text-gray-500">
									{dayOfWeek}, {dayOfMonth} {month} {year} 
								</p>
							</div>
							<div className="flex gap-8">
								<div className="w-60 rounded-lg bg-white hover:bg-gray-50">
									<div className="px-4 py-2 border-b font-semibold">
										<p>Price Per Month</p>
									</div>
									<div className="py-4 flex items-center gap-4 justify-end px-8">
										<div className="border border-blue-500 rounded-sm">
											<MdOutlineTrendingUp color="blue" />
										</div>
										<p className="font-bold text-lg">
											<span>Rp. </span>
											{getMaxItem(item.price_per_month) || '-'}
										</p>
									</div>
								</div>

								<div className="w-60 rounded-lg bg-white hover:bg-gray-50">
									<div className="px-4 py-2 border-b font-semibold">
										<p>Total</p>
									</div>
									<div className="py-4 flex items-center gap-4 justify-end px-8">
										<div className="flex flex-col justify-center items-center gap-1">
											<div className="border border-blue-500 rounded-sm">
												<MdOutlineTrendingUp color="blue" />
											</div>
										</div>
										<div>
											<p className="text-xs text-blue-500">+ 2% Month</p>

											<p className="font-bold text-lg">
												{getTotal(item.total)}
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</main>
			</DashboardLayout>
		</div>
	);
};

export default Dashboard;
