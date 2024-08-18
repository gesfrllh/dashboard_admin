import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./App.css";
import { AuthProvider } from "./hooks/useAuth.tsx";

import { BrowserRouter } from "react-router-dom";
import { NotificationProvider } from "./context/NotificationContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	// <React>
	<BrowserRouter>
		<NotificationProvider>
			<AuthProvider>
				<App />
			</AuthProvider>
		</NotificationProvider>
	</BrowserRouter>
	// </React>/
);
