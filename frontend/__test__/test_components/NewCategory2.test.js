import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor
} from "@testing-library/react";
import "@testing-library/jest-dom";
import Category from "../../src/components/NewCategory";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

global.fetch = require("jest-fetch-mock");

const mockCategories = [
  { _id: "1", title: "Category 1", color: "#ff0000" },
  { _id: "2", title: "Category 2", color: "#00ff00" }
];

beforeEach(() => {
  fetch.resetMocks();
});

describe("Category Component", () => {
  const mockFetch = (data, status = 200) => {
    return jest.fn().mockImplementation(() =>
      Promise.resolve({
        status,
        json: () => Promise.resolve(data)
      })
    );
  };

  const mockFetchReject = (errorMessage, status = 400) => {
    return jest.fn().mockImplementation(() =>
      Promise.resolve({
        status,
        ok: false,
        text: () => Promise.resolve(errorMessage)
      })
    );
  };

  const renderComponent = (props = {}) => {
    return render(<Category {...props} />);
  };

  beforeEach(() => {
    global.fetch.mockClear();
    jest.clearAllMocks();
  });

  test("renders categories and allows delete", async () => {
    fetch.mockResponseOnce(JSON.stringify(mockCategories));

    render(<Category onCategoryClick={jest.fn()} />);

    // Verify that the categories are fetched and rendered
    await waitFor(() => {
      expect(
        screen.getByText("Category 1")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Category 2")
      ).toBeInTheDocument();
    });

    // Verify that delete buttons are present
    const deleteButtons =
      screen.getAllByTestId("delete-button");
    expect(deleteButtons).toHaveLength(2);

    // Simulate clicking the delete button for the first category
    fireEvent.click(deleteButtons[0]);

    // Verify that the delete function is called with the correct id
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "https://hyperducktivity.azurewebsites.net/categories/1",
        expect.objectContaining({
          method: "DELETE"
        })
      );
    });
  });

  test("handles fetch categories error", async () => {
    global.fetch.mockImplementation(
      mockFetchReject("Error fetching categories:")
    );

    renderComponent();
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining("Error fetching categories:"),
        expect.any(Error)
      );
    });

    consoleErrorSpy.mockRestore();
  });

  test("handles create category error", async () => {
    global.fetch
      .mockImplementationOnce(mockFetch([]))
      .mockImplementationOnce(
        mockFetchReject("Error creating category")
      );
    renderComponent();

    fireEvent.change(
      screen.getByPlaceholderText("Name your new category"),
      {
        target: { value: "New Category" }
      }
    );

    fireEvent.click(screen.getByText("Create"));

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining("Error creating category"),
        expect.any(Error)
      );
    });

    consoleErrorSpy.mockRestore();
  });

  test("handles null create category", async () => {
    global.fetch
      .mockImplementationOnce(mockFetch([]))
      .mockImplementationOnce(
        mockFetchReject("Error creating category")
      );
    renderComponent();

    fireEvent.change(
      screen.getByPlaceholderText("Name your new category"),
      {
        target: { value: "" }
      }
    );

    fireEvent.click(screen.getByText("Create"));

    await waitFor(() => {
      const categories = screen.queryAllByText("New Category");
      expect(categories).toHaveLength(0);
    });
  });

  test("edits a category", async () => {
    fetch.mockResponseOnce(JSON.stringify(mockCategories));

    render(<Category onCategoryClick={jest.fn()} />);

    // Verify that the categories are fetched and rendered
    await waitFor(() => {
      expect(
        screen.getByText("Category 1")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Category 2")
      ).toBeInTheDocument();
    });

    const editButtons = screen.getAllByTestId("edit-button");
    expect(editButtons).toHaveLength(2);

    // Simulate clicking the edit button for the first category
    fireEvent.click(editButtons[0]);

    fireEvent.change(
      screen.getByPlaceholderText("Edit category Title"),
      {
        target: { value: "Updated Category 1" }
      }
    );

    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(
        screen.getByText("Updated Category 1")
      ).toBeInTheDocument();
    });
  });

  test("does not save if editingCategoryName is empty", async () => {
    const categories = [{ _id: "1", title: "Category 1" }];
    global.fetch.mockImplementationOnce(mockFetch(categories));
    renderComponent();

    fireEvent.click(await screen.findByText("Edit"));

    fireEvent.change(
      screen.getByPlaceholderText("Edit category Title"),
      {
        target: { value: "" }
      }
    );

    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(global.fetch).not.toHaveBeenCalledWith(
        expect.stringContaining("/categories/1"),
        expect.any(Object)
      );
    });
  });

  test("handles fetch error during category update", async () => {
    const categories = [{ _id: "1", title: "Category 1" }];
    global.fetch.mockImplementationOnce(mockFetch(categories));
    renderComponent();

    fireEvent.click(await screen.findByText("Edit"));
    fireEvent.change(
      screen.getByPlaceholderText("Edit category Title"),
      {
        target: { value: "Updated Category 1" }
      }
    );

    global.fetch.mockImplementationOnce(
      mockFetchReject("Internal Server Error", 500)
    );

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining("Error updating category:"),
        expect.any(Error)
      );
    });

    consoleErrorSpy.mockRestore();
  });

  test("handles update when no category matches id", async () => {
    const categories = [{ _id: "1", title: "Category 1" }];
    global.fetch.mockImplementationOnce(mockFetch(categories));
    renderComponent();

    fireEvent.click(await screen.findByText("Edit"));
    fireEvent.change(
      screen.getByPlaceholderText("Edit category Title"),
      {
        target: { value: "Updated Category 1" }
      }
    );

    global.fetch.mockImplementationOnce(
      mockFetch({ _id: "2", title: "Updated Category 1" }, 200)
    );

    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(
        screen.queryByText("Updated Category 1")
      ).not.toBeInTheDocument();
      expect(
        screen.getByText("Category 1")
      ).toBeInTheDocument();
    });
  });

  test("handles delete category error", async () => {
    const categories = [{ _id: "1", title: "Category 1" }];
    global.fetch
      .mockImplementationOnce(mockFetch(categories))
      .mockImplementationOnce(
        mockFetchReject("Error deleting category", 400)
      );

    renderComponent();

    fireEvent.click(await screen.findByText("Delete"));

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error deleting category:",
        expect.any(Error)
      );
    });

    consoleErrorSpy.mockRestore();
  });

  test("toggles dropdown", async () => {
    const categories = [{ _id: "1", title: "Category 1" }];
    global.fetch.mockImplementation(mockFetch(categories));

    renderComponent();

    fireEvent.click(await screen.findByText("Edit"));
    expect(
      screen.getByPlaceholderText("Edit category Title")
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText("Exit"));
    expect(
      screen.queryByPlaceholderText("Edit category Title")
    ).not.toBeInTheDocument();
  });
});
