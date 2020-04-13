import React, { useState } from "react";
import shortid from "shortid";

function App() {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editTaskId, setEditTaskId] = useState("");
    const [error, setError] = useState(null);

    const addTask = (e) => {
        e.preventDefault();
        console.log("adding tassk");
        if (!task.trim()) {
            setError("Empty string!");
            return;
        }
        setTasks([...tasks, { id: shortid.generate(), nameTask: task }]);
        setTask("");
        setError(null);
    };

    const editTask = (e) => {
        e.preventDefault();
        console.log("editing tassk");
        if (!task.trim()) {
            setError("Empty string!");
            return;
        }
        const tasksEdited = tasks.map((t) =>
            t.id === editTaskId ? { id: editTaskId, nameTask: task } : t
        );

        setTasks(tasksEdited);
        setEditMode(false);
        setTask("");
        setEditTaskId("");
        setError(null);
    };

    const deleteTask = (taskId) => {
        const filterTask = tasks.filter((e) => e.id !== taskId);
        setTasks(filterTask);
    };

    const enableEditMode = (t) => {
        setEditMode(true);
        setTask(t.nameTask);
        setEditTaskId(t.id);
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Simple CRUD task</h1>
            <hr />
            <div className="row">
                <div className="col-8">
                    <h4 className="text-center">Task listing</h4>
                    <ul className="list-group">
                        {tasks.length === 0 ? (
                            <li className="list-group-item">NO TASK!</li>
                        ) : (
                            tasks.map((item) => (
                                <li
                                    key={item.id}
                                    id={item.id}
                                    className="list-group-item"
                                >
                                    <span className="lead">
                                        {item.nameTask}
                                    </span>
                                    <div
                                        className="btn btn-danger btn-sm float-right mx-2"
                                        onClick={() => deleteTask(item.id)}
                                    >
                                        Delete
                                    </div>
                                    <div
                                        className="btn btn-warning btn-sm float-right"
                                        onClick={() => enableEditMode(item)}
                                    >
                                        Edit
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
                <div className="col-4">
                    <h4 className="text-center">
                        {editMode ? "Edit Task" : "Add Task"}
                    </h4>
                    <form onSubmit={editMode ? editTask : addTask}>
                        {error ? (
                            <span className="text-danger">{error}</span>
                        ) : (
                            <span></span>
                        )}
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder={
                                editMode
                                    ? "Insert new task name"
                                    : "Insert task name"
                            }
                            onChange={(e) => setTask(e.target.value)}
                            value={task}
                        />
                        {editMode ? (
                            <button
                                className="btn-dark btn-block"
                                type="submit"
                            >
                                Change
                            </button>
                        ) : (
                            <button
                                className="btn-dark btn-block"
                                type="submit"
                            >
                                Add
                            </button>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App;
