import React, { useState } from "react";
import pencil from "../assets/pencil.svg";

function Task({ task, updateTask, deleteTask }) {
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTask(task.id, editedTask.title, editedTask.content);
    setIsEditingTask(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl border border-beak-orange overflow-hidden md:max-w-2xl m-5">
      <div className="p-4">
        {isEditingTask ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4"
          >
            <input
              type="text"
              value={editedTask.title}
              onChange={(e) =>
                setEditedTask({
                  ...editedTask,
                  title: e.target.value
                })
              }
              placeholder="Name your task..."
              required
              className="p-2 border border-gray-300 focus:outline-none focus:border-beak-orange focus:ring-2 focus:ring-beak-orange rounded-lg"
            />
            <textarea
              value={editedTask.content}
              onChange={(e) =>
                setEditedTask({
                  ...editedTask,
                  content: e.target.value
                })
              }
              placeholder="Describe your task..."
              required
              className="p-2 border border-gray-300 focus:outline-none focus:border-beak-orange focus:ring-2 focus:ring-beak-orange rounded-lg h-32"
            />
            <div className="flex justify-end space-x-2">
              <button
                className="bg-background-gray text-beak-orange rounded-lg py-2 px-4"
                type="submit"
              >
                Save
              </button>
              <button
                className="bg-gray-300 text-black rounded-lg py-2 px-4"
                onClick={() => {
                  setIsEditingTask(false);
                  setEditedTask(task);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="uppercase text-sm text-beak-orange font-semibold">
              {task.title}
            </div>
            <p className="text-lg font-medium text-black">
              {task.content}
            </p>
            <button
              onClick={() => setIsEditingTask(true)}
              className="bg-background-gray text-beak-orange rounded-lg py-2 px-4 m-2"
            >
              <img
                src={pencil}
                alt="Edit Icon"
                className="w-4 h-4"
              />
            </button>
          </>
        )}
        <div>
          <button onClick={() => deleteTask(task.id)}
          className="bg-background-gray text-beak-orange rounded-lg py-2 px-4 m-2"
          >
            Delete</button>
        </div>
      </div>
    </div>
  );
}

export default Task;
