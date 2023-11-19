import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {
    // Update the current date and time every second
    const intervalId = setInterval(() => {
      const now = new Date();
      setCurrentDateTime(now.toLocaleString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { task: newTask, dueDate, completed: false }]);
      setNewTask('');
      setDueDate('');
    }
  };

  const removeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Todo App</h1>
      <p className="text-center">Current Date and Time: {currentDateTime}</p>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <input
          type="datetime-local"
          className="form-control"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <div className="input-group-append">
          <button className="btn btn-primary" onClick={addTask}>
            Add
          </button>
        </div>
      </div>
      <ul className="list-group">
        {tasks.map((task, index) => (
          <li
            key={index}
            className={`list-group-item ${task.completed ? 'list-group-item-success' : ''}`}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(index)}
                  className="mr-2"
                />
                <span>{task.task}</span>
              </div>
              <div>
                {task.dueDate && (
                  <span className="mr-2">
                    Due: {new Date(task.dueDate).toLocaleString()}
                  </span>
                )}
                <button className="btn btn-danger" onClick={() => removeTask(index)}>
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
