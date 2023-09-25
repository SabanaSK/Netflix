import App from "../App";
import { it, describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";

describe("App.js", () => {
	it("Check if the App render very well", () => {
		//render our App properly
		render(
			<MemoryRouter initialEntries={["/Netflix"]}>
				<App />
			</MemoryRouter>
		);

		expect(screen.getByText("HomePage")).toBeInTheDocument();
	});
});
