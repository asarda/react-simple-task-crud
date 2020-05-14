import React from "react";
import { auth } from "../firebase";
import { withRouter } from "react-router-dom";
import Firestore from "./Firestore";

const Admin = (props) => {
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        if (auth.currentUser) {
            console.log("exist");
            setUser(auth.currentUser);
        } else {
            console.log("no exist");
            props.history.push("/login");
        }
    }, [props.history]);

    return (
        <div>
            <h2>Protected route</h2>
            {user && (
                <Firestore user={user}></Firestore>
            )}
        </div>
    );
};

export default withRouter(Admin);
