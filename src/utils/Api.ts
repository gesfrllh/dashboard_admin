import axios from "axios";
import CryptoJS from "crypto-js";

const HTTPOFFICE: any = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		"ngrok-skip-browser-warning": "true",
		Authorization: "Bearer",
	},
});

export default HTTPOFFICE;

const secretKey = import.meta.env.VITE_SECRET_KEY;

export const decryptToken = (encryptedToken: string) => {
	const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
	return bytes.toString(CryptoJS.enc.Utf8);
};

export const FormatIDR = (amount: number): string => {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
	}).format(amount);
};
