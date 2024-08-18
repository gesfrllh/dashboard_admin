import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Icons from "../components/background/Icons";
import HTTPOFFICE from "../utils/Api";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../context/NotificationContext";
import Notification from "../components/Notification";
type LoginProps = {
	onLoginSuccess: (email: string, password: string) => void;
};

interface DataForm {
	email?: string;
	name?: string;
	password?: string;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
	const [isLoginOpen, setLoginOpen] = useState<boolean>(true);
	const [isRegisterOpen, setRegisterOpen] = useState<boolean>(false);
	const [isFocusedEmail, setIsFocusedEmail] = useState<boolean>(false);
	const [isFocusedName, setIsFocusedName] = useState<boolean>(false);
	const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
	const [sendEmail, setSendEmail] = useState<boolean>(false);
	const { showNotification } = useNotification();
	const [isFocusedPassword, setIsFocusedPassword] = useState<boolean>(false);
	const { login } = useAuth();
	const [formData, setFormData] = useState<DataForm>({
		email: "",
		name: "",
		password: "",
	});

	const openLogin = () => {
		setLoginOpen(true);
		setRegisterOpen(false);
		setSendEmail(false);
	};

	const openRegister = () => {
		setLoginOpen(false);
		setRegisterOpen(true);
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		field: keyof DataForm
	) => {
		setFormData((prevData) => ({
			...prevData,
			[field]: e.target.value,
		}));
	};

	const handleInputFocus = (
		setState: React.Dispatch<React.SetStateAction<boolean>>
	) => {
		setState(true);
	};

	const handleInputBlur = (
		e: React.ChangeEvent<HTMLInputElement>,
		setState: React.Dispatch<React.SetStateAction<boolean>>
	) => {
		if (!e.target.value) {
			setState(false);
		}
	};

	const navigate = useNavigate();
	const handleFormSubmit = async () => {
		const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

		if (formData?.email?.match(emailRegex)) {
			setIsValidEmail(true);
		} else {
			setIsValidEmail(false);
			setTimeout(() => {
				setIsValidEmail(true);
			}, 3000);

			return;
		}

		if (sendEmail) {
			try {
				const response = await HTTPOFFICE.post("api/password/forgot-password", {
					email: formData.email
				});
				if (response.status === 200) {
					setSendEmail(false);
					showNotification('Email reset password telah dikirim', 'success');
				} else {
					showNotification('Gagal mengirim email reset password', 'error');
				}
			} catch (err) {
				console.error(err);
				showNotification('Gagal mengirim email reset password', 'error');
			}
		} else if (isLoginOpen) {
			try {
				login(formData.email, formData.password!);
				navigate("/");
				onLoginSuccess(formData.email, formData.password!);
			} catch (err) {
				showNotification('Login gagal. Periksa email dan password Anda.', 'error');
			}
		} else {
			try {
				const response = await HTTPOFFICE.post("api/auth/register", {
					email: formData.email,
					name: formData.name,
					password: formData.password
				});
				console.log(response);
				setLoginOpen(true);
				setRegisterOpen(false);
				showNotification('Pendaftaran berhasil. Silakan login.', 'success');
			} catch (err) {
				console.log(err);
				showNotification('Pendaftaran gagal. Coba lagi.', 'error');
			}
		}
	};

	const resetPassword = async () => {
		setSendEmail(true);
	};

	return (
		<div className="h-screen flex md:flex-col md:border-2 overflow-hidden">
			<Notification />
			<div className="w-1/2 md:w-full md:shadow-transparent bg-white flex flex-col items-center justify-center shadow-xl">
				<div className="w-[70%] flex text-xl flex-col gap-4 md:py-12 md:w-[80%]">
					<div className="flex gap-1 ">
						<h1
							className={`text-4xl md:text-xl lg:text-2xl text-white logo ${isRegisterOpen
									? "font-outline-2-orange"
									: "font-outline-2-blue"
								} `}
						>
							admin
						</h1>
						<h1
							className={`text-4xl md:borde-r2 lg:text-2xl logo ${isRegisterOpen
									? "text-orange-800 transition-all duration-300"
									: "transition-all duration-300 text-[#7EBFED]"
								}`}
						>
							<span className="">Dashboard</span>
						</h1>
					</div>
					<div className="text-sm">
						<p>Is a wonderful dashboard website.</p>
						<p>
							If you want to make your data more secure, register right now on
							this website.
						</p>
					</div>
					<div className="flex justify-end gap-8 items-center">
						<button
							onClick={openLogin}
							className="group relative min-h-[30px] w-28 overflow-hidden text-blue-500 shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-0 before:w-1/4 before:bg-blue-500 before:duration-500 after:absolute after:bottom-0 after:right-0 after:h-0 after:w-1/4 after:bg-blue-500  after:duration-500 hover:text-blue-500 hover:before:h-full hover:after:h-full"
						>
							<span className="top-0 flex h-full w-full items-center justify-center before:absolute before:bottom-0 before:left-1/4 before:z-0 before:h-0 before:w-1/4 before:bg-blue-500 before:duration-500 after:absolute after:right-1/4 after:top-0 after:z-0 after:h-0 after:w-1/4 after:bg-blue-500 after:duration-500 hover:text-blue-500 group-hover:before:h-full group-hover:after:h-full"></span>
							<span className="absolute text-sm bottom-0 left-0 right-0 top-0 z-10 flex h-full w-full items-center justify-center group-hover:text-white">
								Login
							</span>
						</button>
						<button
							onClick={openRegister}
							className="relative h-[30px] w-28 overflow-hidden bg-white text-orange-800 shadow-2xl transition-all before:absolute before:left-0 before:right-0 before:top-0 before:h-0 before:w-full before:bg-orange-800 before:duration-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0 after:w-full after:bg-orange-800 after:duration-500 hover:text-white hover:shadow-green-900 hover:before:h-2/4 hover:after:h-2/4"
						>
							<span className="absolute z-10 text-sm top-1 bottom-0 left-0 right-0">
								Register
							</span>
						</button>
					</div>
				</div>
			</div>
			<div className="w-1/2 md:w-full h-screen flex items-center justify-center relative">
				<Icons />
				<div
					className={`flex flex-col bg-white border w-80 rounded-lg shadow-sm ${isRegisterOpen
							? "border border-orange-800 [transform-style:preserve-3d] [transform:rotateY(180deg)] transition-all duration-500 shadow-orange-500 absolute"
							: "absolute [transform-style:preserve-3d] [transform:rotateY()] transition-all duration-500 border shadow-blue-500 border-blue-500"
						}`}
				>
					<div
						className={`px-8 py-4 border-b font-medium text-lg ${isRegisterOpen
								? "border-orange-800 text-orange-800 [transform:rotateY(180deg)]"
								: "border-blue-500 text-blue-500"
							}`}
					>
						{sendEmail ? "Email" : isLoginOpen ? "Login" : "Register"}
					</div>
					<div className="flex flex-col py-12 gap-8 items-center justify-center w-full">
						<div
							className={`flex border-b w-48 relative flex-col ${isRegisterOpen
									? "border-orange-800 [transform:rotateY(180deg)]"
									: "border-blue-500"
								}`}
						>
							<label
								htmlFor="email"
								className={`absolute ${isFocusedEmail
										? "-top-4 text-xs  transition-all ease-in-out"
										: "-top-1 text-sm text-black"
									} ${isRegisterOpen ? "text-orange-800 " : "text-blue-500"}`}
							>
								Email
							</label>
							<input
								type="text"
								id="email"
								value={formData?.email || ""}
								onChange={(e) => handleInputChange(e, "email")}
								onFocus={() => handleInputFocus(setIsFocusedEmail)}
								onBlur={(e) => handleInputBlur(e, setIsFocusedEmail)}
								className={`outline-none text-sm pt-2 ${!isValidEmail && "border-red-500"
									}`}
							/>
							{!isValidEmail && (
								<p className="text-red-500 text-xs mt-1">Email tidak valid</p>
							)}
						</div>
						{isRegisterOpen && (
							<div
								className={`flex border-b w-48 relative flex-col ${isFocusedName
										? "focused border-orange-800 [transform:rotateY(180deg)]"
										: "[transform:rotateY(180deg)] border-orange-800"
									} `}
							>
								<label
									htmlFor="name"
									className={`absolute ${isFocusedName
											? "-top-4 text-xs text-orange-800 transition-all ease-in-out"
											: "text-orange-800"
										}`}
								>
									Name
								</label>
								<input
									type="text"
									id="name"
									value={formData?.name || ""}
									onChange={(e) => handleInputChange(e, "name")}
									onFocus={() => handleInputFocus(setIsFocusedName)}
									onBlur={(e) => handleInputBlur(e, setIsFocusedName)}
									className="outline-none text-sm pt-2"
								/>
							</div>
						)}
						{!sendEmail && (
							<div
								className={`flex border-b w-48 relative flex-col ${isRegisterOpen
										? "border-orange-800 [transform:rotateY(180deg)]"
										: "border-blue-500"
									}`}
							>
								<label
									htmlFor="password"
									className={`absolute ${isFocusedPassword
											? "-top-4 text-xs  transition-all ease-in-out"
											: ""
										} ${isRegisterOpen ? "text-orange-800" : "text-blue-500"}`}
								>
									Password
								</label>
								<input
									type="password"
									id="password"
									value={formData?.password || ""}
									onChange={(e) => handleInputChange(e, "password")}
									onFocus={() => handleInputFocus(setIsFocusedPassword)}
									onBlur={(e) => handleInputBlur(e, setIsFocusedPassword)}
									className="outline-none text-sm pt-2"
								/>
							</div>
						)}

						<div className="flex flex-col gap-2">
							<button
								onClick={handleFormSubmit}
								className={` px-4 rounded-lg ${isRegisterOpen
										? "[transform:rotateY(180deg)] relative h-8 w-40 overflow-hidden  text-orange-800 shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-orange-800 before:duration-700 before:ease-out hover:text-white hover:shadow-indigo-600 hover:before:h-40 hover:before:w-40 hover:before:opacity-80"
										: "before:ease-in-out relative h-8 w-40 overflow-hidden shadow-2xl before:absolute before:left-0 before:-ml-2 before:h-48 before:w-48 before:origin-top-right text-blue-500 before:-translate-x-full before:translate-y-12 before:-rotate-90 before:bg-blue-500 before:transition-all before:duration-1000 hover:text-white hover:shadow-black hover:before:-rotate-180"
									}`}
							>
								<p className="relative z-10">
									{sendEmail ? "Send" : isLoginOpen ? "Login" : "Register"}
								</p>
							</button>
							{!sendEmail && (
								<button
									onClick={resetPassword}
									className={` px-4 rounded-lg ${isRegisterOpen
											? ""
											: "before:ease-in-out relative h-8 w-40 overflow-hidden shadow-2xl before:absolute before:left-0 before:-ml-2 before:h-48 before:w-48 before:origin-top-right text-blue-500 before:-translate-x-full before:translate-y-12 before:-rotate-90 before:bg-blue-500 before:transition-all before:duration-1000 hover:text-white hover:shadow-black hover:before:-rotate-180"
										}`}
								>
									<p className="relative z-10 text-xs">
										{isLoginOpen ? "Forgot Password ?" : ""}
									</p>
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
