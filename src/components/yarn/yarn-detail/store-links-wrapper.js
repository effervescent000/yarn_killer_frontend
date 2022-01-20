import React from "react";

import StoreLink from "./store-link";

const StoreLinksWrapper = (props) => {
    const { yarn } = props;

    const renderHeader = () => {
        if (yarn.links && yarn.links.length > 0) {
            return (
                <div id="links-header">
                    <div>Store</div>
                    <div>Current price</div>
                    <div>Price last checked</div>
                </div>
            );
        }
    };

    const populateLinks = () => {
        if (Object.keys(yarn).length > 0) {
            return yarn.links.map((link) => <StoreLink key={link.id} link={link} />);
        }
    };

    return (
        <div>
            {renderHeader()}
            {populateLinks()}
        </div>
    );
};

export default StoreLinksWrapper;
