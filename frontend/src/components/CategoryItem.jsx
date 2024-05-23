import React from "react";

import { Link } from "react-router-dom";

function CategoryItem({ category }) {
  return (
    <div className="flex justify-between items-center p-4 border border-gray-300 rounded-lg bg-gray-100 mb-4">
      <Link
        // to={`/taskPage/${category._id}`}
        to={"/taskPage"}
        className="font-bold text-lg text-blue-500 hover:underline"
      >
        {category.title}
      </Link>
    </div>
  );
}

export default CategoryItem;
