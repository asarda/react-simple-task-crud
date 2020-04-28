import React from "react";
import useState from "react";

const Login = () => {
    const [pass, setPass] = useState("");
    const [email, setEmail] = useState("");

    const submit = (e) => {
        e.preventDefault();
        if (!email.trim()) {
            console.log("no email");
        
    };

    return (
        <div className="mt-5">
            <h3 className="text-left">Login/Register</h3>
            <hr />
            <div className="row">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form onSubmit={submit()}>
                        <input
                            type="email"
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
                        <button className="btn btn-dark btn-block">
                            Register
                        </button>
                        <button className="btn btn-info btn-block">
                            Sign in
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
