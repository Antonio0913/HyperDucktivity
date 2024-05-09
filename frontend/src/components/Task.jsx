import React, { useState } from "react";
import pencil from "../assets/pencil.svg";
import deleteIcon from "../assets/delete.png";
import colors from "../assets/colors.js";
import check from "../assets/temp.png";
import box from "../assets/box.png";

function Task({ task, updateTask, deleteTask, completeTask, textSize}) {
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const [isPriority, setIsPriority] = useState(false);

  const taskStyle = `relative max-w-md mx-auto bg-white rounded-xl border border-beak-orange overflow-hidden md:max-w-2xl m-5 ${task.isComplete ? 'opacity-50' : ''}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTask(task._id, editedTask.title, editedTask.content);
    setIsEditingTask(false);
    setIsPriority(false);
  };

  const togglePriority = () => {
    setIsPriority(!isPriority);
  }

  return (
    <div className={taskStyle}>
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
                  setIsPriority(isPriority);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
            <div>
              <button
                onClick={() => togglePriority()}
                className="focus:outline-none bg-site-bg border-none p-0 overflow-hidden absolute top-2 left-2"
              >
                <svg width="24" height="24" viewBox="0 0 460 457" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill={isPriority ? 'yellow' : 'none'}
                    stroke="yellow"
                    strokeWidth="10"
                    d="M444.281 203.334L352.124 280.036L381.379 398.36C383.097 404.97 382.779 411.945 380.468 418.372C378.156 424.799 373.958 430.378 368.423 434.379C363.075 438.281 356.674 440.478 350.057 440.683C343.44 440.887 336.916 439.09 331.337 435.525L228.58 370.427C228.293 370.267 228.166 370.331 228.038 370.427L132.539 430.926C126.385 434.841 119.196 436.814 111.906 436.586C104.616 436.359 97.5629 433.943 91.6651 429.652C85.5563 425.235 80.9236 419.076 78.3733 411.982C75.8231 404.887 75.474 397.188 77.3719 389.893L104.908 281.58L12.3368 203.334C7.09299 198.965 3.28641 193.117 1.41273 186.554C-0.460947 179.99 -0.314909 173.015 1.83183 166.535C3.86678 160.146 7.7801 154.519 13.0612 150.388C18.3423 146.257 24.746 143.814 31.4367 143.377L151.766 135.561L197.319 21.8853C199.743 15.6457 203.992 10.2826 209.513 6.49726C215.033 2.71188 221.568 0.680404 228.261 0.668457H228.293C234.997 0.669599 241.544 2.69591 247.077 6.48185C252.61 10.2678 256.869 15.6368 259.298 21.8853L304.183 134.909L425.181 143.377C431.872 143.814 438.275 146.257 443.557 150.388C448.838 154.519 452.751 160.146 454.786 166.535C456.933 173.015 457.079 179.99 455.205 186.554C453.331 193.117 449.525 198.965 444.281 203.334Z"/>
                </svg>
              </button>
              <div className="uppercase text-beak-orange font-semibold" style={{ fontSize: `${textSize}px` }}>
                {task.title}
              </div>
              <p className="font-medium text-black" style={{ fontSize: `${textSize / 1.2}px` }}>
                {task.content}
              </p>
              <button
                onClick={() => setIsEditingTask(true)}
                className="bg-background-gray text-beak-orange rounded-lg py-2 px-4 m-2"
              >
                <img src={pencil} alt="Edit Icon" className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteTask(task._id)}
                className="bg-background-gray text-beak-orange rounded-lg py-2 px-4 m-2"
              >
                <img src={deleteIcon} alt="Delete Button" className="w-4 h-4" />
              </button>
              <button
                onClick={() => completeTask(task._id)}
                className="bg-background-gray text-beak-orange rounded-lg py-2 px-4 m-2"
              >
                {task.isComplete ? <img src={check} alt="Completed" className="w-4 h-4" /> : <img src={box} alt="Completed" className="w-4 h-4" />}
              </button>
            </div>
        )}
      </div>
    </div>
  );
}

export default Task;
