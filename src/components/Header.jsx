import React from "react";
import { BrowserRouter as Link, NavLink } from "react-router-dom";

const Header = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarTogglerDemo01"
                    aria-controls="navbarTogglerDemo01"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarTogglerDemo01"
                >
                    <a className="navbar-brand  mr-auto" href="#">
                        <h1 class="display-4">Simple CRUD tasks</h1>
                    </a>
                    <div className="navbar-nav">
                        <NavLink
                            className="nav-item nav-link"
                            activeClassName="active"
                            to="/"
                            exact
                        >
                            Home
                        </NavLink>
                        <NavLink
                            className="nav-item nav-link"
                            activeClassName="active"
                            to="/tasks"
                        >
                            Tasks
                        </NavLink>
                        <NavLink
                            className="nav-item nav-link"
                            activeClassName="active"
                            to="/login"
                        >
                            Login
                        </NavLink>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;
