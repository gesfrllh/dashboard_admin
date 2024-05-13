import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useClose } from "../hooks/useClose";

interface Dashboard{
	children: ReactNode
	type: string
}

const DashboardLayout:React.FC<Dashboard> = ({ children , type}) => {
  const [open, setOpen] = useClose(true);

	return (
		<>
			<div className="flex overflow-hidden relative">
				<Sidebar close={open}/>
				<div className="w-full overflow-hidden bg-gray-100">
					<Navbar toggleSideBar={setOpen} props={type}/>
					<main className=" h-screen  pt-24">{children}</main>
				</div>
			</div>
		</>
	);
};

export default DashboardLayout;
