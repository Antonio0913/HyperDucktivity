import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../App.css";
import Task from "../components/Task.jsx";
import NewTask from "../components/NewTask.jsx";
import FontSize from "../components/fontSize.jsx";
import SearchBar from "../components/SearchBar.jsx";
import { addAuthHeader } from "../utilities/AuthHelper.jsx";
import { UNSAFE_convertRoutesToDataRoutes } from "@remix-run/router";

const TaskPage = ({ categoryId, textSize }) => {
  //const { categoryId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredTasks = searchQuery
    ? tasks.filter(
        (task) =>
          task.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          task.content
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      )
    : tasks;

  function sortTasksByDueDate() {
    const sortedTasks = [...filteredTasks].sort((a, b) => {
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return sortDirection === "asc" ? 1 : -1;
      if (!b.dueDate) return sortDirection === "asc" ? -1 : 1;
      return sortDirection === "asc"
        ? new Date(a.dueDate) - new Date(b.dueDate)
        : new Date(b.dueDate) - new Date(a.dueDate);
    });
    setTasks(sortedTasks);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  }

  useEffect(() => {
    if (categoryId) {
      console.log("categoryId:", categoryId); // Debugging line
      fetchTasks(categoryId)
        .then((res) => res.json())
        .then((json) => {
          console.log("Fetched tasks:", json.tasks_list); // Debugging line
          setTasks(json.tasks_list || []); // Ensure tasks_list is always an array
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [categoryId]);

  function removeOneTask(Id) {
    fetch(
      // `https://hyperducktivity.azurewebsites.net/tasks/${Id}`,
      `http://localhost:8000/tasks/${Id}`,
      {
        method: "DELETE",
        headers: addAuthHeader({
          "Content-Type": "application/json"
        })
      }
    )
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

  const completeTask = async (id) => {
    const taskToUpdate = tasks.find((task) => task._id === id);
    //update complete task on front end
    if (taskToUpdate) {
      const updatedTask = {
        ...taskToUpdate,
        isComplete: !taskToUpdate.isComplete
      };

      const updatedTasks = tasks.map((task) =>
        task._id === id ? updatedTask : task
      );
      setTasks(updatedTasks);
      //for backend update
      try {
        await updateTasks(
          updatedTask._id,
          updatedTask.title,
          updatedTask.content,
          updatedTask.dueDate,
          updatedTask.isPriority,
          updatedTask.isComplete
        );
      } catch (error) {
        console.error("Error updating task:", error);
        setTasks(tasks);
      }
    }
  };

  const prioritizeTask = async (id) => {
    const taskToUpdate = tasks.find((task) => task._id === id);
    if (taskToUpdate) {
      //finds tasks to update and changes priority
      const updatedTask = {
        ...taskToUpdate,
        isPriority: !taskToUpdate.isPriority
      };
      const updatedTasks = tasks.map((task) =>
        task._id === id ? updatedTask : task
      );
      setTasks(updatedTasks);
      //backend update
      try {
        await updateTasks(
          updatedTask._id,
          updatedTask.title,
          updatedTask.content,
          updatedTask.dueDate,
          updatedTask.isPriority,
          updatedTask.isComplete
        );
      } catch (error) {
        console.error("Error updating task:", error);
        setTasks(tasks);
      }
    }
  };

  const addTask = (title, content, dueDate) => {
    const task = {
      title,
      content,
      dueDate,
      isPriority: false,
      category: categoryId
    };
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

  const updateTasks = async (
    id,
    title,
    content,
    dueDate,
    priority,
    isComplete
  ) => {
    try {
      const response = await fetch(
        // `https://hyperducktivity.azurewebsites.net/tasks/${id}`,
        `http://localhost:8000/tasks/${id}`,
        {
          //using put for updating
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title,
            content,
            dueDate,
            isPriority: priority,
            isComplete: isComplete
          })
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const updatedTask = await response.json();
      return updatedTask;
    } catch (error) {
      console.error("Error:", error);
      throw error; // Re-throw the error to handle it in the caller function
      //needed so we can find error
    }
  };

  const updateTask = async (
    id,
    title,
    content,
    dueDate,
    priority,
    isComplete
  ) => {
    try {
      const updatedTask = await updateTasks(
        id,
        title,
        content,
        dueDate,
        priority,
        isComplete
      );
      const updatedTasks = tasks.map((task) =>
        task._id === id ? updatedTask : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error updating task:", error);
      // Optionally, revert the state update if the server update fails
      //good so front end matches backend
      setTasks(tasks);
    }
  };

  function fetchTasks(categoryId) {
    const promise = fetch(
      // `https://hyperducktivity.azurewebsites.net/tasks?category=${categoryId}`,
      `http://localhost:8000/tasks?category=${categoryId}`,
      {
        headers: addAuthHeader()
      }
    );
    return promise;
  }

  function postTasks(task) {
    const promise = fetch(
      // "https://hyperducktivity.azurewebsites.net/tasks",
      'http://localhost:8000/tasks',
      {
        method: "POST",
        headers: addAuthHeader({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(task)
      }
    );

    return promise;
  }

  return (
    <div className="relative w-full h-full">
      
      <button onClick={sortTasksByDueDate}>
        Sort by Due Date {sortDirection === "asc" ? "↑" : "↓"}
      </button>
      <div>
        <SearchBar
          placeholder="Search your tasks..."
          onSearch={handleSearch}
        />
        <NewTask addTask={addTask} />
  
        {filteredTasks
          .sort((a, b) => b.isPriority - a.isPriority)
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
    </div>
  );
};

export default TaskPage;
