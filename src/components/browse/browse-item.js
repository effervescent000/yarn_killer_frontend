import React from "react";
import { Link } from "react-router-dom";

const BrowseItem = (props) => {
    const { brand, name, id, images } = props.yarn;

    return (
        <div className="yarn-item">
            <Link to={`/yarn/${id}`}>
                <div className="image-wrapper">
                    {images[0] ? <img src={images[0].url} alt={`${brand} ${name}`} /> : null}
                </div>
                <div className="text-wrapper">
                    <div className="yarn-brand">{brand}</div>
                    <div className="yarn-name">{name}</div>
                </div>
            </Link>
        </div>
    );
};

export default BrowseItem;
