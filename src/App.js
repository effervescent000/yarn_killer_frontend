import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./styles/main.scss";

import Header from "./components/header";
import HomePage from "./components/home";
import BrowsePage from "./components/browse/browse-page";
import YarnDetailPage from "./components/yarn/yarn-detail/yarn-detail-page";
import YarnEditPage from "./components/yarn/yarn-create";

const App = () => {
    return (
        <Router>
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
        </Router>
    );
};

export default App;
