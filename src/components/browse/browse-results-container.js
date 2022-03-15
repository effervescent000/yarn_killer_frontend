import React from "react";
import { Spinner } from "reactstrap";

import BrowseItem from "./browse-item";

const BrowseResultsContainer = ({ yarnResults }) => {
    const populateResults = () => {
        if (yarnResults.length === 0) {
            return <Spinner />;
        }
        return yarnResults.map((yarn) => {
            return <BrowseItem key={yarn.id} yarn={yarn} />;
        });
    };

    return <div id="results-container">{populateResults()}</div>;
};

export default BrowseResultsContainer;
