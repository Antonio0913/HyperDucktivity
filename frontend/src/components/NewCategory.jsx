import React, { useState, useEffect } from "react";
import CategoryItem from "./CategoryItem";
import { addAuthHeader } from "../utilities/AuthHelper";

function Category({ onCategoryClick }) {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editingCategoryId, setEditingCategoryId] =
    useState(null);
  const [editingCategoryName, setEditingCategoryName] =
    useState("");
  const [editingCategoryColor, setEditingCategoryColor] =
    useState("#ECD632");
  const [showDropdown, setShowDropdown] = useState(false);
  const [username, setUsername] = useState("");

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://hyperducktivity.azurewebsites.net/categoriesTwo",
        {
          method: "POST",
          headers: {
            ...addAuthHeader(),
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: localStorage.getItem("username")
          })
        }
      );
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const createCategory = async () => {
    if (!newCategory) {
      return;
    }
    try {
      const response = await fetch(
        "https://hyperducktivity.azurewebsites.net/categoriesForUser",
        {
          method: "POST",
          headers: addAuthHeader({
            "Content-Type": "application/json"
          }),
          body: JSON.stringify({
            title: newCategory,
            username: username
          })
        }
      );
      const data = await response.json();
      setCategories([...categories, data]);
      setNewCategory("");
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  function deleteCategory(categoryId) {
    fetch(
      `https://hyperducktivity.azurewebsites.net/categories/${categoryId}`,
      {
        method: "DELETE",
        headers: addAuthHeader({
          "Content-Type": "application/json"
        })
      }
    )
      .then((res) => {
        if (res.status == 204) {
          // Remove deleted category
          setCategories((prevCategories) =>
            prevCategories.filter(
              (category) => category._id !== categoryId
            )
          );
          console.debug("Category deleted successfully");
        } else {
          throw new Error(
            "Failed to delete category with status: " +
              res.status
          );
        }
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
      });
  }

  const startEditingCategory = (category) => {
    setEditingCategoryId(category._id);
    setEditingCategoryName(category.title);
    setEditingCategoryColor(category.color);
    setShowDropdown(true);
  };

  const updateCategory = async (
    id,
    updatedTitle,
    updatedColor
  ) => {
    const updatedCategory = {
      _id: id,
      title: updatedTitle,
      color: updatedColor
    };

    const updatedCategories = categories.map((category) =>
      category._id === id ? updatedCategory : category
    );
    setCategories(updatedCategories);

    try {
      const response = await fetch(
        `https://hyperducktivity.azurewebsites.net/categories/${id}`,
        {
          method: "PUT",
          headers: addAuthHeader({
            "Content-Type": "application/json"
          }),
          body: JSON.stringify({
            title: updatedTitle,
            color: updatedColor
          })
        }
      );
      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          "Failed to update category with status:",
          response.status,
          "and message:",
          errorText
        );
        throw new Error(
          "Failed to update category with status: " +
            response.status
        );
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleSaveClick = () => {
    if (editingCategoryName && editingCategoryColor) {
      updateCategory(
        editingCategoryId,
        editingCategoryName,
        editingCategoryColor
      );
    }
  };

  useEffect(() => {
    fetchCategories();
    const username = localStorage.getItem("username");
    setUsername(username);
  }, []);

  return (
      <div className="max-w-md mx-auto mt-10 p-6 border border-beak-yellow rounded-lg bg-white">
        <div className="mb-6">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Name your new category"
            className="w-full p-2 border border-beak-yellow rounded-lg mb-2"
          />
          <button
            onClick={createCategory}
            className="w-full p-2 bg-blue-500 text-white rounded-lg border-beak-yellow"
          >
            Create
          </button>
        </div>
        <div style={{ maxHeight: "450px", overflowY: "auto" }}>
          {categories.map((category) => (
            <div
              key={category._id}
              className="flex items-center justify-between mb-2"
            >
              <div
                className="flex-grow"
                style={{ flexBasis: "auto", flexGrow: 1 }}
              >
                <CategoryItem
                  category={category}
                  onClick={onCategoryClick}
                />
              </div>
              <div className="relative">
                <button
                  onClick={() => startEditingCategory(category)}
                  className="ml-4 p-2 bg-yellow-500 text-white rounded-lg"
                  data-testid="edit-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteCategory(category._id)}
                  className="ml-4 p-2 bg-red-500 text-white rounded-lg"
                  data-testid="delete-button"
                >
                  Delete
                </button>
                {editingCategoryId === category._id &&
                  showDropdown && (
                    <div className="absolute right-0 mt-2 w-64 border border-beak-yellow rounded-lg shadow-lg p-4 z-10 bg-site-bg">
                      Edit Title
                      <input
                        type="text"
                        value={editingCategoryName}
                        onChange={(e) =>
                          setEditingCategoryName(e.target.value)
                        }
                        placeholder="Edit category Title"
                        className="w-full p-2 border border-beak-yellow rounded-lg mb-2"
                      />
                      <input
                        type="color"
                        value={editingCategoryColor}
                        onChange={(e) =>
                          setEditingCategoryColor(
                            e.target.value
                          )
                        }
                        className="w-full mb-2 h-8"
                      />
                      <div className="flex justify-end space-x-2">
                        <button
                          className="bg-background-gray text-beak-orange rounded-lg py-2 px-4"
                          onClick={handleSaveClick}
                          data-testid="submit-edit-button"
                        >
                          Save
                        </button>
                        <button
                          className="bg-gray-300 text-black rounded-lg py-2 px-4"
                          onClick={() => {
                            setEditingCategoryId(null);
                            setShowDropdown(false);
                          }}
                        >
                          Exit
                        </button>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          ))}
        </div>
      </div>
  );
}

export default Category;
