import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
import { CookiesProvider } from "react-cookie";
import { UserProvider } from "./context/UserContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<CookiesProvider>
			<UserProvider>
				<HashRouter>
					<App />
				</HashRouter>
			</UserProvider>
		</CookiesProvider>
	</React.StrictMode>
);
