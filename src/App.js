import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import "bootstrap/scss/bootstrap.scss";
import "./styles/main.scss";

import { UserContext } from "./user-context";
import Header from "./components/header";
import HomePage from "./components/home";
import BrowsePage from "./components/browse/browse-page";
import YarnDetailPage from "./components/yarn/yarn-detail/yarn-detail-page";
import YarnEditPage from "./components/yarn/yarn-edit";

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});

    const toggleLogIn = () => {
        setLoggedIn(!loggedIn);
    };

    useEffect(() => {
        if (!loggedIn) {
            axios
                .get(`${process.env.REACT_APP_DOMAIN}/auth/check`, {
                    withCredentials: true,
                    headers: { "X-CSRF-TOKEN": Cookies.get("csrf_access_token") },
                })
                .then((response) => {
                    if (Object.keys(response.data).length > 0) {
                        toggleLogIn();
                        setUser(response.data);
                    }
                })
                .catch((error) => console.log(error.response));
        }
    }, []);

    return (
        <Router>
            <UserContext.Provider value={{ loggedIn, toggleLogIn, user, setUser }}>
                <div className="App">
                    <Header />
                    <div className="content-wrapper">
                        <Switch>
                            <Route exact path="/">
                                <HomePage />
                            </Route>
                            <Route path="/yarn/browse">
                                <BrowsePage />
                            </Route>
                            <Route path="/yarn/:permalink/edit">
                                <YarnEditPage />
                            </Route>
                            <Route path="/yarn/:permalink">
                                <YarnDetailPage />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </UserContext.Provider>
        </Router>
    );
};

export default App;
