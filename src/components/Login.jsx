import React from "react";
import { withRouter } from "react-router-dom";
import { auth, db } from "../firebase";

const Login = (props) => {
    const [pass, setPass] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [error, setError] = React.useState(null);
    const [isRegister, setIsRegister] = React.useState(true);

    const submit = (e) => {
        e.preventDefault();
        if (!email.trim()) {
            setError("missing email");
            return;
        }
        if (!pass.trim()) {
            setError("missing password");
            return;
        }
        setError(null);

        if (isRegister) {
            register();
        } else {
            login();
        }
    };

    const register = React.useCallback(async () => {
        try {
            const resp = await auth.createUserWithEmailAndPassword(email, pass);
            await db.collection("users").doc(resp.user.email).set({
                email: resp.user.email,
                uid: resp.user.uid,
            });
            await db.collection(resp.user.uid).add({
                name: 'TEST TASK', 
                fecha: Date.now()
            })
            setEmail("");
            setPass("");
            setError("");
            props.history.push("/admin");
        } catch (e) {
            setError(e.message);
        }
    }, [email, pass]);

    const login = React.useCallback(async () => {
        try {
            const resp = await auth.signInWithEmailAndPassword(email, pass);
            console.log(resp);
            setEmail("");
            setPass("");
            setError("");
            props.history.push("/admin");
        } catch (e) {
            setError(e.message);
        }
    }, [email, pass, props.history]);

    return (
        <div className="mt-5">
            <h3 className="text-left">{isRegister ? "Register" : "Sign in"}</h3>
            <hr />
            <div className="row">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form onSubmit={submit}>
                        {error && (
                            <div className="alert alert-danger">{error}</div>
                        )}
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <input
                            type="password"
                            className="form-control mb-2"
                            placeholder="password"
                            onChange={(e) => setPass(e.target.value)}
                            value={pass}
                        />
                        <button className="btn btn-dark btn-block">Send</button>
                        <button
                            type="button"
                            className="btn btn-info btn-block"
                            onClick={() => setIsRegister(!isRegister)}
                        >
                            {isRegister
                                ? "Already have an account?"
                                : "Need an account?"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Login);
