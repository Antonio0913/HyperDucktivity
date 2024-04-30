import { useState } from "react";
import "./App.css";
import Task from "./components/Task.jsx";
import NewTask from "./components/NewTask.jsx";

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (title, content) => {
    const newTask = { title, content, id: tasks.length };
    setTasks([...tasks, newTask]);
  };

  function deleteTask(id) {
    
    const updated = tasks.filter((task, i) => {
          return i !== id;
        });
        setTasks(updated);
  
    }


  const updateTask = (id, updatedTitle, updatedContent) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            title: updatedTitle,
            content: updatedContent
          }
        : task
    );
    setTasks(updatedTasks);
  };

  return (
    <>
      <h1 className="text-background-gray">HyperDucktivity</h1>
      <div>
        <p className="text-beak-yellow">
          {" "}
          _<br />
          &#62;(.)__
          <br />
          &#40;___/
          <br />
          <br />
        </p>
      </div>
      <div>
        <NewTask addTask={addTask} />
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        ))}
      </div>
    </>
  );
}

export default App;
