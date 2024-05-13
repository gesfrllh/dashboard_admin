import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Icons from "../components/background/Icons";
import HTTPPOST from "../utils/Api";
import { useNavigate } from "react-router-dom";


interface DataForm {
	newPassword?: string;
	confirmNewPassword?: string;
}

const ResetPassword: React.FC = () => {
	const [isRegisterOpen, setRegisterOpen] = useState<boolean>(false);
	const [isFocusedEmail, setIsFocusedEmail] = useState<boolean>(false);
	const [isValidPassword, setIsValidPassword] = useState<boolean>(true);
	const [isMatchPassword, setIsMatchPassword] = useState<boolean>(true);

	const [isFocusedPassword, setIsFocusedPassword] = useState<boolean>(true);

	const [formData, setFormData] = useState<DataForm>({
		newPassword: "",
		confirmNewPassword: "",
	});

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
		const passwordRegex =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}|:"<>?`\-=[\]\\;',./])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*()_+{}|:"<>?`\-=[\]\\;',./]{8,}$/;
		if (formData.newPassword?.match(passwordRegex)) {
			setIsValidPassword(true);
			console.log('Password Valid: ', formData.newPassword)
		} else {
            console.log('Password tidak valid:', formData.confirmNewPassword)
            setIsValidPassword(false)
        }
		if (formData.newPassword !== formData.confirmNewPassword) {
			setIsMatchPassword(false);

			setTimeout(() => {
				setIsMatchPassword(true);
			}, 3000);
			return;
		} else {
			try{
				const urlParams = new URLSearchParams(window.location.search)
				const token = urlParams.get('token');
				const response = HTTPPOST.post('api/password/reset-password', {
					newPassword: formData.newPassword,
					token: token
				})
				
				console.log(response)
				// navigate('/')
			} catch(err){
				console.error(err)
			}
		}

        setTimeout(() => {
            setIsValidPassword(true);
        }, 8000);
        return;
	};

	return (
		<>
			<div className="h-screen flex md:flex-col md:border-2 overflow-hidden">
				<div className="w-1/2 md:w-full md:shadow-transparent bg-white flex flex-col items-center justify-center shadow-xl">
					<div className="w-[70%] flex text-xl flex-col gap-4 md:py-12 md:w-[80%]">
						<div className="flex gap-1 ">
							<h1
								className={`text-4xl md:text-xl lg:text-2xl text-blue-400 logo 
								`}>
								Reset Password
							</h1>
						</div>
						<div className="text-sm">
							<p>
								If you encounter any issues during the password reset process,
								please contact the administrator immediately.
							</p>
						</div>
						<div className="flex justify-end text-xs gap-8 items-center">
							<p>dwiaryasfrllh@gmail.com</p>
						</div>
					</div>
				</div>
				<div className="w-1/2 md:w-full h-screen flex items-center justify-center relative">
					<Icons />
					<div
						className={`flex flex-col bg-white border w-80 rounded-lg shadow-sm ${
							isRegisterOpen
								? "border border-orange-800 [transform-style:preserve-3d] [transform:rotateY(180deg)] transition-all duration-500 shadow-orange-500 absolute"
								: "absolute [transform-style:preserve-3d] [transform:rotateY()] transition-all duration-500 border shadow-blue-500 border-blue-500"
						}`}>
						<div
							className={`px-8 py-4 border-b font-medium text-lg ${
								isRegisterOpen
									? "border-orange-800 text-orange-800 [transform:rotateY(180deg)]"
									: "border-blue-500 text-blue-500"
							}`}>
							Reset Password
						</div>
						<div className="flex flex-col py-12 gap-8 items-center justify-center w-full">
							<div
								className={`flex border-b  relative flex-col ${
									isRegisterOpen
										? "border-orange-800 [transform:rotateY(180deg)]"
										: "border-blue-500"
								}`}>
								<label
									htmlFor="email"
									className={`absolute ${
										isFocusedEmail
											? "-top-4 text-xs  transition-all ease-in-out"
											: "-top-1 text-sm text-black"
									} ${isRegisterOpen ? "text-orange-800 " : "text-blue-500"}`}>
									New Password
								</label>
								<input
									type="password"
									id="password"
									value={formData?.newPassword || ""}
									onChange={(e) => handleInputChange(e, "newPassword")}
									onFocus={() => handleInputFocus(setIsFocusedEmail)}
									onBlur={(e) => handleInputBlur(e, setIsFocusedEmail)}
									className={`outline-none ${
										!isValidPassword && "border-red-500"
									}`}
								/>
							</div>
							<div className="px-16">
								{!isValidPassword && (
									<p className="text-red-500 text-xs mt-1">
										Password must contain at least one lowercase letter (a-z),
										one uppercase letter (A-Z), one special character, one
										number, and be at least 8 characters long.
									</p>
								)}
							</div>
							<div
								className={`flex border-b  relative flex-col ${
									isRegisterOpen
										? "border-orange-800 [transform:rotateY(180deg)]"
										: "border-blue-500"
								}`}>
								<label
									htmlFor="password"
									className={`absolute ${
										isFocusedPassword
											? "-top-4 text-xs  transition-all ease-in-out"
											: ""
									} ${isRegisterOpen ? "text-orange-800" : "text-blue-500"}`}>
									Confirm New Password
								</label>
								<input
									type="password"
									id="password"
									value={formData?.confirmNewPassword || ""}
									onChange={(e) => handleInputChange(e, "confirmNewPassword")}
									onFocus={() => handleInputFocus(setIsFocusedPassword)}
									onBlur={(e) => handleInputBlur(e, setIsFocusedPassword)}
									className={`outline-none ${
										!isMatchPassword && "border-red-500"
									}`}
								/>
								{!isMatchPassword && (
									<p className="text-red-500 text-xs mt-1">
										Password Not Match
									</p>
								)}
							</div>
							<div className="flex flex-col gap-2">
								<button
									onClick={handleFormSubmit}
									className={` px-4 rounded-lg ${
										isRegisterOpen
											? "[transform:rotateY(180deg)] relative h-8 w-40 overflow-hidden  text-orange-800 shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-orange-800 before:duration-700 before:ease-out hover:text-white hover:shadow-indigo-600 hover:before:h-40 hover:before:w-40 hover:before:opacity-80"
											: "before:ease-in-out relative h-8 w-40 overflow-hidden shadow-2xl before:absolute before:left-0 before:-ml-2 before:h-48 before:w-48 before:origin-top-right text-blue-500 before:-translate-x-full before:translate-y-12 before:-rotate-90 before:bg-blue-500 before:transition-all before:duration-1000 hover:text-white hover:shadow-black hover:before:-rotate-180"
									}`}>
									<p className="relative z-10">confirm</p>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ResetPassword    ;
