import { useState } from "react";

function NewTask({ addTask }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(title, content, dueDate || null);
    setTitle("");
    setContent("");
    setDueDate("");
    setIsOpen(false);
  };

  const toggleForm = () => setIsOpen(!isOpen);

  return (
    <div>
      <button
        className="bg-background-gray text-beak-orange rounded-lg py-2 px-4"
        onClick={toggleForm}
      >
        {isOpen ? "Cancel" : "Add Task"}
      </button>
      {isOpen && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-lg">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4"
          >
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Name your task..."
              required
              className="p-2 border border-gray-300 focus:outline-none focus:border-beak-orange focus:ring-2 focus:ring-beak-orange rounded-lg"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Describe your task..."
              required
              className="p-2 border border-gray-300 focus:outline-none focus:border-beak-orange focus:ring-2 focus:ring-beak-orange rounded-lg h-32"
            />
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="p-2 border border-gray-300 focus:outline-none focus:border-beak-orange focus:ring-2 focus:ring-beak-orange rounded-lg"
            />
            <button
              className="self-end bg-background-gray text-beak-orange rounded-lg py-2 px-4"
              type="submit"
            >
              Submit Task
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default NewTask;
