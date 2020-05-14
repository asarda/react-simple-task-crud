import React, { useState } from "react";
import { db } from "../firebase";
import moment from 'moment'
//import 'moment/locale/es'

const Firestore = (props) => {

    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [editTaskId, setEditTaskId] = useState("");
    const [error, setError] = useState(null);

    const [last, setLast] = useState(null)
    const [deactivate, setDeactivate] = useState(false)

    React.useEffect(() => {
        const getData = async () => {

            try {
                setDeactivate(true)
                const data = await db.collection(props.user.uid).limit(4).orderBy('fecha', 'desc').get();
                const arrayData = data.docs.map((t) => ({
                    id: t.id,
                    ...t.data(),
                }));
                setLast(data.docs[data.docs.length-1])
                setTasks(arrayData);

                //checking again if more results. Could be better... 2 request?
                const query = await db.collection(props.user.uid).limit(4).orderBy('fecha', 'desc').startAfter(data.docs[data.docs.length-1]).get();
                console.log("query")
                if (query.empty) {
                    console.log("no more docs")
                    setDeactivate(true)
                } else {
                    setDeactivate(false)
                }
            } catch (e) {}
        };
        
        getData();
        
    }, [props.user.uid]);

    const addTask = async (e) => {
        e.preventDefault();
        console.log("adding tassk");
        if (!task.trim()) {
            setError("Empty string!");
            return;
        }
        try {
            const newTask = {
                name: task,
                fecha: Date.now(),
            };
            const data = await db.collection(props.user.uid).add(newTask);
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
            db.collection(props.user.uid).doc(editTaskId).update({
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
            const data = db.collection(props.user.uid).doc(taskId).delete();

            const filterTask = tasks.filter((e) => e.id !== taskId);
            setTasks(filterTask);
        } catch (e) {}
    };

    const enableEditMode = (t) => {
        setEditMode(true);
        setTask(t.name);
        setEditTaskId(t.id);
    };

    const next = async (e) => {
       
        try {
            const data = await db.collection(props.user.uid).limit(4).orderBy('fecha', 'desc').startAfter(last).get();
            const arrayData = data.docs.map((t) => ({
                id: t.id,
                ...t.data(),
            }));
            console.log(arrayData)
            setTasks([
                ...tasks, ...arrayData
            ])
            setLast(data.docs[data.docs.length-1])
        } catch(e) {

        }
    }

    return (
        <div>
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
                                        {item.name} - {moment(item.fecha).format('lll')}
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
                    <button className="btn btn-info btn-block mt-2 btn-sm" 
                        onClick={()=> next()}
                        disabled={deactivate}>
                        Next
                    </button>
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
        </div>
    )
}

export default Firestore
