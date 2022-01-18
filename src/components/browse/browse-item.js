import React, { useState } from "react";

const BrowseItem = (props) => {
    const { brand, name } = props.yarn;

    return (
        <div className="yarn-item">
            <div className="yarn-brand">{brand}</div>
            <div className="yarn-name">{name}</div>
        </div>
    );
};

export default BrowseItem;