import App from "../App";
import { it, describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../context/UserContext";

describe("App.js", () => {
	it("Check if the App render very well", () => {
		//render our App properly
		render(
			<UserProvider>
				<MemoryRouter initialEntries={["/Netflix"]}>
					<App />
				</MemoryRouter>
			</UserProvider>
		);

		expect(screen.getByText("Login Page")).toBeInTheDocument();
	});
});
