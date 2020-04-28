import React, { useState } from "react";
import { firebase } from "./firebase";
import Header from "./components/Header";
import Login from "./components/Login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [editTaskId, setEditTaskId] = useState("");
    const [error, setError] = useState(null);

    React.useEffect(() => {
        const getData = async () => {
            try {
                const db = firebase.firestore();
                const data = await db.collection("tasks").get();
                const arrayData = data.docs.map((t) => ({
                    id: t.id,
                    ...t.data(),
                }));
                setTasks(arrayData);
            } catch (e) {}
        };
        getData();
    }, []);

    const addTask = async (e) => {
        e.preventDefault();
        console.log("adding tassk");
        if (!task.trim()) {
            setError("Empty string!");
            return;
        }
        try {
            const db = firebase.firestore();
            const newTask = {
                name: task,
                fecha: Date.now(),
            };
            const data = await db.collection("tasks").add(newTask);
            setTasks([...tasks, { ...newTask, id: data.id }]);
            setTask("");
            setError(null);
        } catch (e) {}
    };

    const editTask = async (e) => {
        e.preventDefault();
        if (!task.trim()) {
            setError("Empty string!");
            return;
        }
        try {
            const db = firebase.firestore();
            db.collection("tasks").doc(editTaskId).update({
                name: task,
            });

            const tasksEdited = tasks.map((t) =>
                t.id === editTaskId ? { id: editTaskId, name: task } : t
            );

            setTasks(tasksEdited);
            setEditMode(false);
            setTask("");
            setEditTaskId("");
            setError(null);
        } catch (e) {}
    };

    const deleteTask = async (taskId) => {
        try {
            const db = firebase.firestore();
            const data = db.collection("tasks").doc(taskId).delete();

            const filterTask = tasks.filter((e) => e.id !== taskId);
            setTasks(filterTask);
        } catch (e) {}
    };

    const enableEditMode = (t) => {
        setEditMode(true);
        setTask(t.name);
        setEditTaskId(t.id);
    };

    return (
        <Router>
            <div className="container mt-5">
                <Header />
                <Switch>
                    <Route path="/login">
                        <Login></Login>
                    </Route>
                    <Route path="/tasks">
                        <div className="row">
                            <div className="col-8">
                                <h4 className="text-center">Task listing</h4>
                                <ul className="list-group">
                                    {tasks.length === 0 ? (
                                        <li className="list-group-item">
                                            NO TASK!
                                        </li>
                                    ) : (
                                        tasks.map((item) => (
                                            <li
                                                key={item.id}
                                                id={item.id}
                                                className="list-group-item"
                                            >
                                                <span className="lead">
                                                    {item.name}
                                                </span>
                                                <div
                                                    className="btn btn-danger btn-sm float-right mx-2"
                                                    onClick={() =>
                                                        deleteTask(item.id)
                                                    }
                                                >
                                                    Delete
                                                </div>
                                                <div
                                                    className="btn btn-warning btn-sm float-right"
                                                    onClick={() =>
                                                        enableEditMode(item)
                                                    }
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
                                        <span className="text-danger">
                                            {error}
                                        </span>
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
                                        onChange={(e) =>
                                            setTask(e.target.value)
                                        }
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
                    </Route>
                    <Route path="/">
                        <h1 className="text-center">Simple CRUD task</h1>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
