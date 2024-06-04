import React, { useState, useEffect } from "react";
import CategoryItem from "./CategoryItem";

function Category({ onCategoryClick }) {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editingCategoryId, setEditingCategoryId] =
    useState(null);
  const [editingCategoryName, setEditingCategoryName] =
    useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://hyperducktivity.azurewebsites.net/categories"
        //"http://localhost:8000/categories"
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
        "https://hyperducktivity.azurewebsites.net/categories",
        //"http://localhost:8000/categories",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ title: newCategory })
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
      //`http://localhost:8000/categories/${categoryId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
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
          console.log("Category deleted successfully");
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
    setShowDropdown(true);
  };

  const updateCategory = async (id, updatedTitle) => {
    const updatedCategory = {
      _id: id,
      title: updatedTitle
    };

    const updatedCategories = categories.map((category) =>
      category._id === id ? updatedCategory : category
    );
    setCategories(updatedCategories);
    
    try {
      const response = await fetch(
        `https://hyperducktivity.azurewebsites.net/categories/${id}`,
        //`http://localhost:8000/categories/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ title: updatedTitle })
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
    if (editingCategoryName) {
      updateCategory(editingCategoryId, editingCategoryName);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg bg-white">
        <div className="mb-6">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Name your new category"
            className="w-full p-2 border border-gray-300 rounded-lg mb-2"
          />
          <button
            onClick={createCategory}
            className="w-full p-2 bg-blue-500 text-white rounded-lg"
          >
            Create
          </button>
        </div>
        <div>
          {categories.map((category) => (
            <div
              key={category._id}
              className="flex items-center justify-between mb-2"
            >
              <div className="flex-grow">
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
                >
                  Delete
                </button>
                {editingCategoryId === category._id &&
                  showDropdown && (
                    <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-10">
                      Edit Title
                      <input
                        type="text"
                        value={editingCategoryName}
                        onChange={(e) =>
                          setEditingCategoryName(e.target.value)
                        }
                        placeholder="Edit category Title"
                        className="w-full p-2 border border-gray-300 rounded-lg mb-2"
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
    </>
  );
}

export default Category;
