import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import logo from "../assets/logo/1.png";
import { SiHomebridge } from "react-icons/si";
import { RiDashboardFill } from "react-icons/ri";
import { IoFileTrayStackedSharp } from "react-icons/io5";
import { HiDocumentReport } from "react-icons/hi";
import { FaShoppingBasket } from "react-icons/fa";
import { FaUserAstronaut } from "react-icons/fa";
import { RiLogoutCircleFill } from "react-icons/ri";

interface SidebarProps {
	close: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ close }) => {
	const { logout } = useAuth();
	const data = [
		{
			icon: <SiHomebridge color="#7EBFED" size={close ? "" : "24"} />,
			desc: "Home",
			link: "/",
		},
		{
			icon: <RiDashboardFill color="#7EBFED" size={close ? "" : "24"} />,
			desc: "Dashboard",
			link: "/dashboard",
		},
		{
			icon: <IoFileTrayStackedSharp color="#7EBFED" size={close ? "" : "24"} />,
			desc: "Product",
			link: "/product",
		},
		{
			icon: <HiDocumentReport color="#7EBFED" size={close ? "" : "24"} />,
			desc: "Report",
			link: "/report",
		},
		{
			icon: <FaShoppingBasket color="#7EBFED" size={close ? "" : "24"} />,
			desc: "Order",
			link: "/order",
		},
		{
			icon: <FaUserAstronaut color="#7EBFED" size={close ? "" : "24"} />,
			desc: "Profile",
			link: "/profile",
		},
	];

	return (
		<>
			<div
				className={
					close
						? `shadow-lg w-[15%] h-screen relative transition-all duration-500 ease-in-out`
						: "w-[6%] transition-all duration-500 shadow-lg ease-in-out"
				}>
				<div
					className={`flex items-center border-b border-blue-300 justify-between transition-all duration-500 ${
						close ? "px-8" : "py-[7px]"
					}`}>
						<p className="py-6 logo px-2 text-blue-300"><span className="font-outline-2-blue text-white">Kaos</span> Admin</p>
				</div>
				<div className="py-4 flex flex-col  transition-all duration-500 px-4">
					{data.map((item, id) => (
						<div
							key={id}
							className={`py-2  flex gap-2  w-full ${
								close ? `hoverSidebar px-4` : "hover:bg-gray-100 px-[12px]"
							}`}>
							<div className="flex cursor-pointer  gap-2 items-center py-1">
								<Link to={item.link}>{item.icon}</Link>
								<Link
									className={
										close
											? `opacity-100 transition-all duration-700 ease-in-out`
											: "opacity-0 ease-in-out transition-all duration-700"
									}
									to={item.link}>
									<p>{item.desc}</p>
								</Link>
							</div>
						</div>
					))}
				</div>
				<div className={close ? "py-12 " : "py-12 px-4"}>
					<div
						className={`py-2  flex gap-2 px-8 cursor-pointer  w-full ${
							close ? `hoverSidebar px-4` : "hover:bg-gray-100 px-[12px]"
						}`}
						onClick={() => logout()}>
						<div className="flex items-center gap-2">
							<div>
								<RiLogoutCircleFill color="#7EBFED" size={close ? "" : "24"} />
							</div>
							<p
								className={
									close
										? `opacity-100 transition-all duration-700 ease-in-out`
										: "opacity-0 ease-in-out transition-all duration-700"
								}>
								logout
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Sidebar;
