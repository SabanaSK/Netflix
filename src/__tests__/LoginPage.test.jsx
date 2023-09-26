

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
        expect(screen.getByText("Login Page")).toBeInTheDocument();
    });

    it("displays an error when fields are empty", async () => { 
       await userEvent.click(screen.getByText("Login"));
        await waitFor(() => { 
            expect(screen.getByText("Both fields are required!")).toBeInTheDocument();
        });
    });

    it("displays an error when the password is too short", async () => {
      await  userEvent.type(screen.getByPlaceholderText("Username"), "admin");
       await userEvent.type(screen.getByPlaceholderText("Password"), "123");

        userEvent.click(screen.getByText("Login"));
        await waitFor(() => { 
            expect(screen.getByText("Password should be more than 5 characters!")).toBeInTheDocument();
        });
    });

    it("successfully logs in with valid credentials from mock data", async () => { 
    await   userEvent.type(screen.getByPlaceholderText("Username"), "admin");
     await   userEvent.type(screen.getByPlaceholderText("Password"), "admin123");

        userEvent.click(screen.getByText("Login"));
        await waitFor(() => { // Use waitFor
            expect(screen.queryByText("Invalid credentials.")).not.toBeInTheDocument();
        });
    });

    it("displays an error with invalid credentials", async () => { // Mark the test as async
     await  userEvent.type(screen.getByPlaceholderText("Username"), "unknown");
       await userEvent.type(screen.getByPlaceholderText("Password"), "unknown123");

       await userEvent.click(screen.getByText("Login"));
        await waitFor(() => { 
            expect(screen.getByText("Invalid credentials.")).toBeInTheDocument();
        });
    });
})