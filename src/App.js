import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import TaskList from "./pages/TaskList";
import TaskForm from "./pages/TaskForm";
import { useEffect, useState } from "react";
import { tasks } from "./db/initialtasks.db";
import { getTasksFromLocalStorage, storeTasksInLocalStorage } from "./utils";
import EditTask from "./pages/EditTask";

export default function App() {
  const navigate = useNavigate();
  const [tasksList, setTasksList] = useState([]);
  const [newTask, setNewTask] = useState({});
  const [editTask, setEditTask] = useState({});


  useEffect(() => {
    storeTasksInLocalStorage(
      "tasks",
      tasksList && tasksList.length > 0 ? tasksList : tasks
    );
    navigate("/tasks");
  }, []);

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-start h-screen">
        <Routes>
          <Route
            path="/tasks"
            element={
              <TaskList tasksList={tasksList} setTasksList={setTasksList} />
            }
          />
          <Route
            path="/add-new-task"
            element={
              <TaskForm
                newTask={newTask}
                setNewTask={setNewTask}
                tasksList={tasksList}
                setTasksList={setTasksList}
              />
            }
          />
          <Route
            path="/edit/:taskId"
            element={
              <EditTask
                editTask={editTask}
                setEditTask={setEditTask}
                tasksList={tasksList}
                setTasksList={setTasksList}
              />
            }
          />
        </Routes>
      </div>
    </>
  );
}
