import React, { useState, useEffect } from "react";
import axios from "axios";

import BrowseResultsContainer from "./browse-results-container";
import BrowseFilterWrapper from "./browse-filter-wrapper";

const BrowseYarnPage = (props) => {
    const [yarnResults, setYarnResults] = useState([]);

    useEffect(() => {
        if (yarnResults.length === 0) {
            getAllYarn();
        }
    }, []);

    const getAllYarn = () => {
        axios
            .get(`${process.env.REACT_APP_DOMAIN}/yarn/get`)
            .then((response) => {
                setYarnResults(response.data);
            })
            .catch((error) => console.log(error.response));
    };

    return (
        <div id="browse-content-wrapper">
            <BrowseResultsContainer yarnResults={yarnResults} />
            <BrowseFilterWrapper getAllYarn={getAllYarn} setYarnResults={setYarnResults} />
        </div>
    );
};

export default BrowseYarnPage;
