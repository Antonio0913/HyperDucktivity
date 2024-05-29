import React from "react";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import "../App.css";
import Task from "../components/Task.jsx";
import NewTask from "../components/NewTask.jsx";
import FontSize from "../components/fontSize.jsx";
import SearchBar from "../components/SearchBar.jsx";

const TaskPage = () => {
  const { categoryId } = useParams();

  const [tasks, setTasks] = useState([]);
  const [textSize, setTextSize] = useState(12);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredTasks = searchQuery
    ? tasks.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : tasks;

    function sortTasksByDueDate() {
      const sortedTasks = [...filteredTasks].sort((a, b) => {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return sortDirection === 'asc' ? 1 : -1;
        if (!b.dueDate) return sortDirection === 'asc' ? -1 : 1;
        return sortDirection === 'asc'
          ? new Date(a.dueDate) - new Date(b.dueDate)
          : new Date(b.dueDate) - new Date(a.dueDate);
      });
      setTasks(sortedTasks);
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    }

  
    useEffect(() => {
      if (categoryId) {
        console.log('categoryId:', categoryId); // Debugging line
        fetchTasks(categoryId)
          .then((res) => res.json())
          .then((json) => {
            console.log('Fetched tasks:', json.tasks_list); // Debugging line
            setTasks(json.tasks_list || []); // Ensure tasks_list is always an array
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }, [categoryId]);

  function removeOneTask(Id) {
    const promise = fetch(`http://localhost:8000/tasks/${Id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        if (res.status == 204) {
          deleteTask(Id);
          console.log("good res stat, task deleted");
        } else {
          throw new Error(
            "failed to delete task with status: " + res.status
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function deleteTask(Id) {
    const updated = tasks.filter((task) => {
      return task._id !== Id;
    });
    setTasks(updated);
  }

  function completeTask(Id) {
    const updated = tasks.map((task) => {
      if (task._id === Id) {
        return { ...task, isComplete: !task.isComplete };
      }
      return task;
    });
    setTasks(updated);
  }

  const prioritizeTask = (id) => {
    const updatedTask = tasks.map((task) =>
      task._id === id
        ? {
            ...task,
            isPriority : !task.isPriority
          }
        : task
    );
    setTasks(updatedTask);
  };

  const addTask = (title, content, dueDate) => {
    const task = { title, content, dueDate, isPriority: false, category: categoryId };
    postTasks(task)
      .then((res) => {
        if (res.status == 201) {
          res.json().then((newTask) => {
            console.log("post works");
            setTasks([...tasks, newTask]);
          });
        } else {
          throw new Error(
            "failed to create task with status: " + res.status
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateTask = (id, updatedTitle, updatedContent, dueDate) => {
    const updatedTasks = tasks.map((task) =>
      task._id === id
        ? {
            ...task,
            title: updatedTitle,
            content: updatedContent,
            dueDate: dueDate
          }
        : task
    );
    setTasks(updatedTasks);
  };

  const fetchTasks = (categoryId) => {
    return fetch(`http://localhost:8001/tasks?category=${categoryId}`);
  };

  function postTasks(task) {
    const promise = fetch("http://localhost:8000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task)
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
        <button onClick={sortTasksByDueDate} className="sort-button">
          Sort by Due Date {sortDirection === 'asc' ? '↑' : '↓'}
      </button>
      </div>
      <div>
      <SearchBar placeholder="Search your tasks..." onSearch={handleSearch} />
        <NewTask addTask={addTask} />
        <FontSize
          textSize={textSize}
          setTextSize={setTextSize}
        ></FontSize>
        {filteredTasks.sort((a, b) => b.isPriority - a.isPriority)
        .map((task) => {
          console.log(task.isPriority);
          return (
            <Task
              key={task._id}
              task={task}
              updateTask={updateTask}
              deleteTask={removeOneTask}
              textSize={textSize}
              completeTask={completeTask}
              prioritizeTask={prioritizeTask}
            />
          );
        })}
    </div>
    </>
  );
};

export default TaskPage;
