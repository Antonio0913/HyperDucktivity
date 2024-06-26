import categoryModel from "./category.js";
import User from "./userModel.js";

async function getCategories(username) {
  try {
    const user = await User.findOne({ username }).populate(
      "categories"
    );

    if (!user) {
      throw new Error("User not found in get Categories");
    }

    return user.categories;
  } catch (error) {
    console.error("Error getting categories:", error);
    throw error;
  }
}

function findCategoryById(id) {
  return categoryModel.findById(id);
}

function addCategory(category) {
  const categoryToAdd = new categoryModel(category);
  const promise = categoryToAdd.save();
  return promise;
}

async function addCategoryThree(category, username) {
  try {
    const categoryToAdd = new categoryModel(category);

    const currUser = await User.findOne({ username });

    if (!currUser) {
      throw new Error("User not found");
    }

    currUser.categories.push(categoryToAdd._id);

    await currUser.save();

    const savedCategory = await categoryToAdd.save();

    return savedCategory;
  } catch (error) {
    console.error(
      "Error adding category and updating user:",
      error
    );
    throw error;
  }
}

function removeCategory(id) {
  return categoryModel.findByIdAndDelete(id);
}

const updateCategory = async (id, updatedFields) => {
  console.log(
    `Updating category with ID: ${id} with fields: ${JSON.stringify(
      updatedFields
    )}`
  );

  const updatedCategory = await categoryModel.findByIdAndUpdate(
    id,
    updatedFields,
    { new: true }
  );
  if (!updatedCategory) {
    throw new Error("Category not found");
  }
  return updatedCategory;
};

export default {
  addCategory,
  getCategories,
  findCategoryById,
  removeCategory,
  updateCategory,
  addCategoryThree
};
