import { useState } from "react";
import "../styles/TaskTracker.css";
import Sidebar from "./Sidebar";
import { ToastContainer, toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

function TaskTracker() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  const handleSuccesToast = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });
  };

  const handleErrorToast = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });
  };

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask("");
      handleSuccesToast("Task added");
    } else {
      handleErrorToast("Task cannot be empty");
    }
  };

  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);
  };

  const removeTask = (index) => {
    handleSuccesToast("Task removed");
    setTimeout(() => {
      setTasks(tasks.filter((_, i) => i !== index));
    }, 300); // Delay removal to match animation
  };

  return (
    <div className="task-tracker">
      <h1>Task Tracker</h1>
      <div className="input-container">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task"
        />
        <button id="add" onClick={addTask}>
          Add Task
        </button>
        <ToastContainer />
      </div>

      <ul>
        <AnimatePresence>
          {tasks.map((t, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className={t.completed ? "completed" : ""}>
              <span>{t.text}</span>
              <div className="buttons">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleComplete(index)}>
                  Toggle
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeTask(index)}>
                  Remove
                </motion.button>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <Sidebar />
    </div>
  );
}

export default TaskTracker;
