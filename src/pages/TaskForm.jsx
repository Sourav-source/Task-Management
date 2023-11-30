import React, { useState } from "react";
import { MdSave, MdCancel, MdOutlineArrowDropDown } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import { storeTasksInLocalStorage } from "../utils";
import { useNavigate } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import { motion } from "framer-motion";

const TaskForm = ({ newTask, setNewTask, tasksList, setTasksList }) => {
  const navigate = useNavigate();
  const [priority, setPriority] = useState("Low");
  const taskFormHandler = (e) => {
    e.preventDefault();
    const updatedTask = { ...newTask, id: uuidv4(), priority: priority };
    console.log(updatedTask);
    setNewTask(updatedTask);
    const updatedTasksList = [...tasksList, updatedTask]; // Create a new array with the updated tasksList
    setTasksList(updatedTasksList);
    storeTasksInLocalStorage("tasks", updatedTasksList);
    setNewTask({});
    navigate("/tasks");
  };

  function handleDropdownMenu(event) {
    const priority = event.target.firstChild.textContent || "Low";
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
          <span className="label-text">Tasks Title:</span>
        </label>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter Task Title"
            className="input input-bordered w-96 outline-none"
            required="false"
            onChange={(e) => {
              setNewTask({ ...newTask, title: e.target.value });
            }}
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
          onChange={(e) => {
            setNewTask({ ...newTask, description: e.target.value });
          }}
        />
        <div className="flex items-start justify-between">
          <button
            className="btn  w-max rounded-md flex items-center justify-center my-4"
            onClick={taskFormHandler}
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

export default TaskForm;
