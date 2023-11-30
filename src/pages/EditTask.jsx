import React, { useEffect, useState } from "react";
import { MdSave, MdCancel, MdOutlineArrowDropDown } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import { storeTasksInLocalStorage } from "../utils";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import { motion } from "framer-motion";

const EditTask = ({ editTask, setEditTask, tasksList, setTasksList }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const [priority, setPriority] = useState(editTask.priority);

  console.log(tasksList, "jgvsgcv", params.taskId);

  useEffect(() => {
    if (tasksList && tasksList.length > 0) {
      const filteredTask = tasksList.find((task) => task.id === params.taskId);
      setEditTask(filteredTask);
      setPriority(filteredTask.priority);
    }
  }, [tasksList, params.taskId]);

  const handleTitleChange = (e) => {
    setEditTask((prevEditTask) => ({
      ...prevEditTask,
      title: e.target.value,
    }));
  };

  const handleDescriptionChange = (e) => {
    setEditTask((prevEditTask) => ({
      ...prevEditTask,
      description: e.target.value,
    }));
  };

  const editTaskHandler = (e) => {
    e.preventDefault();
    const updatedEditTask = { ...editTask, priority: priority };
    const updatedTasksList = tasksList.map((task) =>
      task.id === params.taskId ? updatedEditTask : task
    );
    setTasksList(updatedTasksList);
    storeTasksInLocalStorage("tasks", updatedTasksList);
    navigate("/tasks");
  };

  function handleDropdownMenu(event) {
    const priority = event.target.firstChild.textContent || editTask.priority;
    setPriority(priority);
  }

  return (
    <>
      <motion.form
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="form-control mt-16"
      >
        <label className="label">
          <span className="label-text">Task Title:</span>
        </label>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter Task Title"
            className="input input-bordered w-96 outline-none"
            required="false"
            value={editTask.title}
            onChange={handleTitleChange}
          />
          <div className="flex items-start justify-start gap-3">
            <label className="label -mt-2">
              <span className="label-text">Priority:</span>
            </label>
            <div className="dropdown dropdown-right">
              <div tabIndex={0} role="button" className="btn btn-sm btn-circle">
                <MdOutlineArrowDropDown
                  size={25}
                  className="text-emerald-500 hover:text-emerald-600"
                />
              </div>
              <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li onMouseOver={handleDropdownMenu}>
                  <a className="flex items-center justify-between">
                    <p>Low</p>
                    <GoDotFill size={20} className="text-emerald-500" />
                  </a>
                </li>
                <li onMouseOver={handleDropdownMenu}>
                  <a className="flex items-center justify-between">
                    <p>Medium</p>
                    <GoDotFill size={20} className="text-amber-500" />
                  </a>
                </li>
                <li onMouseOver={handleDropdownMenu}>
                  <a className="flex items-center justify-between">
                    <p>High</p>
                    <GoDotFill size={20} className="text-rose-500" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="text-sm font-medium mt-2">
          Priority:{" "}
          <span
            className={`ml-6 text-base font-semibold ${
              priority === "High"
                ? "text-rose-500"
                : priority === "Low"
                ? "text-emerald-500"
                : "text-amber-500"
            }`}
          >
            {priority}
          </span>
        </p>

        <textarea
          placeholder="Enter the tasks...."
          className="textarea textarea-bordered w-full h-32 outline-none mt-4"
          required="true"
          value={editTask.description}
          onChange={handleDescriptionChange}
        />
        <div className="flex items-start justify-between">
          <button
            className="btn  w-max rounded-md flex items-center justify-center my-4"
            onClick={editTaskHandler}
          >
            <MdSave size={25} className="text-blue-500" />
            <p className="text-base font-semibold">Save Changes</p>
          </button>
          <button
            className="btn  w-max rounded-md flex items-center justify-center my-4"
            onClick={() => navigate("/tasks")}
          >
            <MdCancel size={25} className="text-rose-500" />
            <p className="text-base font-semibold">Discard Changes</p>
          </button>
        </div>
      </motion.form>
    </>
  );
};

export default EditTask;
