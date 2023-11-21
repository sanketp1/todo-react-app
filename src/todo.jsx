import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Todo.css';

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
      setTasks([...tasks, { id: Date.now(), task: newTask, dueDate, completed: false }]);
      setNewTask('');
      setDueDate('');
    }
  };

  const removeTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
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
      <TransitionGroup className="list-group">
        {tasks.map((task) => (
          <CSSTransition
            key={task.id}
            timeout={{ enter: 300, exit: 300 }}
            classNames={{
              enter: 'task-check-enter',
              enterActive: 'task-check-enter-active',
              exit: 'task-check-exit',
              exitActive: 'task-check-exit-active',
            }}
          >
            <li
              className={`list-group-item ${task.completed ? 'list-group-item-success' : ''}`}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id)}
                    className="mr-2"
                  />
                  <span className='task' >{task.task}</span>
                </div>
                <div>
                  {task.dueDate && (
                    <span className="mr-2 duedate">
                      Due: {new Date(task.dueDate).toLocaleString()}
                    </span>
                  )}
                  <button className="btn btn-danger" onClick={() => removeTask(task.id)}>
                    Remove
                  </button>
                </div>
              </div>
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default Todo;
