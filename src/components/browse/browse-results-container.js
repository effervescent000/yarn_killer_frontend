import React from "react";

import BrowseItem from "./browse-item";

const BrowseResultsContainer = (props) => {
    const populateResults = () => {
        return props.yarnResults.map((yarn) => {
            return <BrowseItem key={yarn.id} yarn={yarn} />;
        });
    };

    return <div id="results-container">{populateResults()}</div>;
};

export default BrowseResultsContainer;
