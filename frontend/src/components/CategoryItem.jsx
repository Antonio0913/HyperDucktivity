import React from "react";

const CategoryItem = ({ category, onClick }) => {
  return (
    <div className="flex justify-between items-center p-4 border border-gray-300 rounded-lg bg-gray-100 mb-4">
      <button
         onClick={() => onClick(category._id)}
        className="font-bold text-lg text-blue-500 hover:underline"
      >
        {category.title}
      </button>
    </div>
  );
};

export default CategoryItem;
