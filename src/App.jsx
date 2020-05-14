import React, { useState } from "react";
import Header from "./components/Header";
import Login from "./components/Login";
import Admin from "./components/Admin";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { auth } from "./firebase";

function App() {
   
    const [userLogged, setUserLogged] = useState(false);

    React.useEffect(() => {
        const checkUser = () => {
            auth.onAuthStateChanged((user) => {
                console.log("user: ", user);
                if (user) {
                    setUserLogged(true);
                } else {
                    setUserLogged(null);
                }
            });
        };
        checkUser();
    }, []);

    return userLogged !== false ? (
        <Router>
            <div className="container mt-5">
                <Header userLogged={userLogged} />
                <Switch>
                    <Route path="/login">
                        <Login></Login>
                    </Route>
                    <Route path="/admin">
                        <Admin></Admin>
                    </Route>
                    <Route path="/">
                        <h1 className="text-center">Simple CRUD task</h1>
                    </Route>
                </Switch>
            </div>
        </Router>
    ) : (
        <p>Loading...</p>
    );
}

export default App;
