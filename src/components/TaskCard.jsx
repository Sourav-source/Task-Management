import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { storeTasksInLocalStorage } from "../utils";
import { motion } from "framer-motion";

const TaskCard = ({ task, tasksList, setTasksList, setStartIndex }) => {
  const navigate = useNavigate();

  const deleteTaskHandler = () => {
    const updatedTasksList = tasksList.filter((tsk) => tsk.id !== task.id);
    setTasksList(updatedTasksList);
    storeTasksInLocalStorage("tasks", updatedTasksList);
    navigate("/tasks");
    setStartIndex(0);
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      duration: 0.8,
      delay: 0.5,
      ease: [0, 0.71, 0.2, 1.01]
    }} className="card w-96 bg-neutral text-neutral-content my-2 rounded-md">
      <div className="card-body flex flex-row">
        <div className="flex flex-col flex-1 gap-2">
          <p className="text-base font-semibold text-rose-500">{task.title}</p>
          <p className="text-sm font-medium">{task.description}</p>
          {task.priority && (
            <p className="text-sm font-medium">
              Priority:{" "}
              <span
                className={`text-base font-semibold ${
                  task.priority === "High"
                    ? "text-rose-500"
                    : task.priority === "Low"
                    ? "text-emerald-500"
                    : "text-amber-500"
                }`}
              >
                {task.priority}
              </span>
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <button
            className="btn btn-sm btn-circle"
            onClick={() => navigate(`/edit/${task.id}`)}
          >
            <MdEdit size={20} className="text-blue-500 hover:text-blue-600" />
          </button>
          <button className="btn btn-sm btn-circle" onClick={deleteTaskHandler}>
            <MdDelete size={20} className="text-rose-500 hover:text-rose-600" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;
