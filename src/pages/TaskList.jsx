import React, { useEffect, useState } from "react";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import TaskCard from "../components/TaskCard";
import { getTasksFromLocalStorage } from "../utils";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const TaskList = ({ tasksList, setTasksList }) => {
  const navigate = useNavigate();
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const tasks = getTasksFromLocalStorage("tasks");
    setTasksList(tasks);
  }, []);

  const handleNext = () => {
    if (startIndex + 3 < tasksList.length) {
      setStartIndex(startIndex + 3);
    }
  };

  const handlePrevious = () => {
    if (startIndex - 3 >= 0) {
      setStartIndex(startIndex - 3);
    }
  };
  console.log(startIndex);
  return (
    <>
      <motion.button
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="btn w-96 rounded-md flex items-center justify-center my-4"
        onClick={() => navigate("/add-new-task")}
      >
        <MdOutlineAddCircleOutline
          size={25}
          className="text-emerald-500 hover:text-emerald-600"
        />
        <p className="text-base font-semibold">Add a New Task</p>
      </motion.button>

      {tasksList &&
        tasksList.length > 0 &&
        tasksList
          .slice(startIndex, startIndex + 3)
          .map((task) => (
            <TaskCard
              task={task}
              key={task.id}
              tasksList={tasksList}
              setTasksList={setTasksList}
              setStartIndex={setStartIndex}
            />
          ))}
      {tasksList && tasksList.length > 3 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="left-0 right-0 flex justify-center gap-3"
        >
          <button
            className="btn btn-outline border-rose-500 outline-rose-500 hover:outline-rose-600 hover:bg-rose-400 hover:border-rose-600"
            onClick={handlePrevious}
            disabled={startIndex === 0 ? true : false}
          >
            Previous
          </button>
          <button
            className="btn btn-outline border-indigo-300 outline-indigo-300 hover:outline-indigo-500 hover:bg-indigo-200 hover:border-indigo-500"
            onClick={handleNext}
            disabled={startIndex === tasksList.length - 1 ? true : false}
          >
            Next
          </button>
        </motion.div>
      )}
    </>
  );
};

export default TaskList;
