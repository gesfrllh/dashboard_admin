import React from "react";
import Sidebar from "../components/Sidebar";
import DashboardLayout from "../components/DashboardLayout";

const Home: React.FC = () => {
	return (
		<>
			<DashboardLayout type="home">
				<main>
					<div className="px-8  h-96 flex justify-center">
						<div className="flex rounded-lg items-center shadow-lg bg-white w-full justify-center">
							<div className="flex flex-col justify-center items-center">
								<h1>Welcome to dashboard admin.</h1>
								
							</div>
						</div>
					</div>
				</main>
			</DashboardLayout>
		</>
	);
};

export default Home;
