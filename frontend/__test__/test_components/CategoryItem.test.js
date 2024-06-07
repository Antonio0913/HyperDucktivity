import React from "react";
import {
  render,
  screen,
  fireEvent
} from "@testing-library/react";
import "@testing-library/jest-dom";
import CategoryItem from "../../src/components/CategoryItem";

describe("CategoryItem Component", () => {
  const category = { _id: "1", title: "Test Category" };
  const handleClick = jest.fn();

  test("renders CategoryItem component", () => {
    render(
      <CategoryItem category={category} onClick={handleClick} />
    );

    // Check if the category title is rendered
    const categoryTitle = screen.getByText("Test Category");
    expect(categoryTitle).toBeInTheDocument();

    // Check if the button has the correct class
    expect(categoryTitle).toHaveClass(
      "font-bold text-lg text-blue-500 hover:underline"
    );
  });

  test("calls onClick when button is clicked", () => {
    render(
      <CategoryItem category={category} onClick={handleClick} />
    );

    // Click the button
    const categoryButton = screen.getByText("Test Category");
    fireEvent.click(categoryButton);

    // Check if handleClick was called with the correct category ID
    expect(handleClick).toHaveBeenCalledWith("1");
  });
});
