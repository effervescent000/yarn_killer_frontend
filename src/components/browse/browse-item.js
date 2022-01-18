import React from "react";
import { Link } from "react-router-dom";

const BrowseItem = (props) => {
    const { brand, name, id } = props.yarn;

    return (
        <div className="yarn-item">
            <Link to={`/yarn/${id}`}>
                <div className="yarn-brand">{brand}</div>
                <div className="yarn-name">{name}</div>
            </Link>
        </div>
    );
};

export default BrowseItem;
