import { render, screen } from "@testing-library/react";
import { it, describe, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import SearchBar from "../components/Searchbar/Searchbar";

describe("SearchBar", () => {
  it("renders correctly", () => {
    const mockSetSearchQuery = vi.fn();
    render(<SearchBar setSearchQuery={mockSetSearchQuery} />);

    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  it("calls setSearchQuery with input value when changed", async () => {
    const mockSetSearchQuery = vi.fn();
    const user = userEvent.setup();
    render(<SearchBar setSearchQuery={mockSetSearchQuery} />);
    
    const input = screen.getByPlaceholderText("Search...");
    await user.type(input, "test query");
   
    expect(mockSetSearchQuery).toHaveBeenCalledWith("t");
    expect(mockSetSearchQuery).toHaveBeenCalledWith("te");
    expect(mockSetSearchQuery).toHaveBeenCalledWith("tes");
    expect(mockSetSearchQuery).toHaveBeenCalledWith("test");
  });
});