import React from "react";

const StoreLink = (props) => {
    const { link } = props;

    return (
        <div>
            <div>{link.store.name}</div>
            <div>{link.current_price}</div>
            <div>{link.price_updated}</div>
        </div>
    );
};

export default StoreLink;
