import { useState, useEffect } from "react";
import "./App.css";
import Task from "./components/Task.jsx";
import NewTask from "./components/NewTask.jsx";
import FontSize from './components/fontSize.jsx';

function App() {
  const [tasks, setTasks] = useState([]);
  const [textSize, setTextSize] = useState(12);
  useEffect(() => {
    fetchTasks()
      .then((res) => res.json())
      .then((json) => setTasks(json["tasks_list"]))
      .catch((error) => { console.log(error); });
  }, [] );


  function removeOneTask(Id) {
    const promise = fetch(`http://localhost:8000/tasks/${Id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(res =>{
      if(res.status == 204){
        deleteTask(Id)
        console.log("good res stat, task deleted")
      }else{
        throw new Error ("failed to delete task with status: " + res.status);
      }
    }).catch((error) => {
      console.log(error);
    })
  }

  function deleteTask(Id) {  
    const updated = tasks.filter((task) => {
          return task._id !== Id;
        });
        setTasks(updated);
    }

  const addTask = (title, content) => {
    const task = { title, content };
    // setTasks([...tasks, newTask]);
    postTasks(task)
      .then((res) => {
        if(res.status == 201){
          res.json().then(newTask =>{
          console.log("post works")
          setTasks([...tasks, newTask]);
        });
      }else{
        throw new Error ("failed to create task with status: " + res.status);
      }})
      .catch((error) => {
        console.log(error);
      })
  };



  const updateTask = (id, updatedTitle, updatedContent) => {
    const updatedTasks = tasks.map((task) =>
      task._id === id
        ? {
            ...task,
            title: updatedTitle,
            content: updatedContent
          }
        : task
    );
    setTasks(updatedTasks);
  };


  function fetchTasks() {
    const promise = fetch("http://localhost:8000/tasks");
    return promise;
  }
  function postTasks(task) {
    const promise = fetch("http://localhost:8000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    return promise;
  }
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
        <FontSize
        textSize = {textSize}
        setTextSize={setTextSize}
        >
        </FontSize>
        {tasks.map((task) => (
          <Task
            key={task._id}
            task={task}
            updateTask={updateTask}
            deleteTask={removeOneTask}
            textSize={textSize}
          />
        ))}
      </div>
    </>
  );
}

export default App;
