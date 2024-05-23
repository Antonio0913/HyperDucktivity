import React, { useState, useEffect } from "react";
import CategoryItem from "./CategoryItem";

function Category() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/categories"
      );
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const createCategory = async () => {
    if (!newCategory) return;
    try {
      const response = await fetch(
        "http://localhost:8000/categories",
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
    fetch(`http://localhost:8000/categories/${categoryId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
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

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg bg-white">
      <div className="mb-6">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Enter category name"
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
            <CategoryItem category={category} />
            <button
              onClick={() => deleteCategory(category._id)}
              className="ml-4 p-2 bg-red-500 text-white rounded-lg"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
