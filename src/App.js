import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./styles/main.scss";

import Header from "./components/header";
import HomePage from "./components/home";
import BrowsePage from "./components/browse/browse-page";

const App = () => {
    return (
        <Router>
            <div className="App">
                <Header />

                <Switch>
                    <Route exact path="/">
                        <HomePage />
                    </Route>
                    <Route path="/yarn/browse">
                        <BrowsePage />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default App;
