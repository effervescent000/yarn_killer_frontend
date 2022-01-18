import React from "react";

import YarnStats from "./yarn-stats";

const YarnDetailPage = (props) => {
    const yarn = props.yarn;

    return (
        <div id="yarn-detail-page-wrapper">
            <div id="left-side-grid">
                <span>Image goes here</span>
                <div id="brand-name">{yarn.brand}</div>
                <div id="yarn-name">{yarn.name}</div>
                <YarnStats yarn={yarn} />
            </div>
        </div>
    );
};

export default YarnDetailPage;
