import LoginPage from "../pages/LoginPage/LoginPage";
import { it, describe, expect } from "vitest";
import { render, screen,beforeEach } from "@testing-library/react";
import { UserProvider } from "../context/UserContext";
import userEvent from "@testing-library/user-event";
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

    it("displays an error when fields are empty", () => {
        userEvent.click(screen.getByText("Login"));
        expect(screen.getByText("Both fields are required!")).toBeInTheDocument();
    });

    it("displays an error when the password is too short", () => {
        userEvent.type(screen.getByPlaceholderText("Username"), "admin");
        userEvent.type(screen.getByPlaceholderText("Password"), "123");

        userEvent.click(screen.getByText("Login"));
        expect(screen.getByText("Password should be more than 5 characters!")).toBeInTheDocument();
    });

    it("successfully logs in with valid credentials from mock data", () => {
        userEvent.type(screen.getByPlaceholderText("Username"), "admin");
        userEvent.type(screen.getByPlaceholderText("Password"), "admin123");

        userEvent.click(screen.getByText("Login"));
        expect(screen.queryByText("Invalid credentials.")).not.toBeInTheDocument();
    });

    it("displays an error with invalid credentials", () => {
        userEvent.type(screen.getByPlaceholderText("Username"), "unknown");
        userEvent.type(screen.getByPlaceholderText("Password"), "unknown123");

        userEvent.click(screen.getByText("Login"));
        expect(screen.getByText("Invalid credentials.")).toBeInTheDocument();
    });
});