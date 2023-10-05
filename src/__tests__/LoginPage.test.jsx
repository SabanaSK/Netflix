

import LoginPage from "../pages/LoginPage/LoginPage";
import { it, describe, expect,beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { UserProvider } from "../context/UserContext";
import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/react"; 

describe("LoginPage", () => {
    beforeEach(() => {
        render(
            <UserProvider>
                <LoginPage />
            </UserProvider>
        );
    });

   it("renders the login page", () => {
        expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    });

    it("displays an error when fields are empty", async () => { 
        const user = userEvent.setup();
        await user.click(screen.getByText("Login"));
        await waitFor(() => { 
            expect(screen.getByText("Both fields are required!")).toBeInTheDocument();
        });
    });

    it("displays an error when the password is too short", async () => {
        const user = userEvent.setup();
        await user.type(screen.getByPlaceholderText("Username"), "admin");
        await user.type(screen.getByPlaceholderText("Password"), "123");

        await user.click(screen.getByText("Login"));
        await waitFor(() => { 
            expect(screen.getByText("Password should be more than 5 characters!")).toBeInTheDocument();
        });
    });

    it("successfully logs in with valid credentials from mock data", async () => { 
        const user = userEvent.setup();
        await user.type(screen.getByPlaceholderText("Username"), "admin");
        await user.type(screen.getByPlaceholderText("Password"), "admin123");

        await user.click(screen.getByText("Login"));
        waitFor(() => { 
            expect(screen.queryByText("Invalid credentials.")).not.toBeInTheDocument();
        });
    });

    it("displays an error with invalid credentials", async () => { 
        const user = userEvent.setup();
        await user.type(screen.getByPlaceholderText("Username"), "unknown");
        await user.type(screen.getByPlaceholderText("Password"), "unknown123");

        await user.click(screen.getByText("Login"));
        await waitFor(() => { 
            expect(screen.getByText("Invalid credentials.")).toBeInTheDocument();
        });
    });
})