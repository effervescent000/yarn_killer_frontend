import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";

import YarnStats from "./yarn-stats";

const YarnDetailPage = (props) => {
    const [yarn, setYarn] = useState({});
    const { permalink } = useParams();
    console.log(props);

    useEffect(() => {
        if (Object.keys(yarn).length === 0) {
            axios
                .get(`${process.env.REACT_APP_DOMAIN}/yarn/get/${permalink}`)
                .then((response) => {
                    setYarn(response.data);
                })
                .catch((error) => console.log(error.response));
        }
    });

    return (
        <div id="yarn-detail-page-wrapper">
            <div />
            <div id="grid-wrapper">
                <div id="left-side-grid">
                    <span>Image goes here</span>
                    <div id="brand-name">{yarn.brand}</div>
                    <div id="yarn-name">{yarn.name}</div>
                    <YarnStats yarn={yarn} />
                </div>
            </div>
            <div />
        </div>
    );
};

export default YarnDetailPage;
