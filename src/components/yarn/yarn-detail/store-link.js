import React from "react";

const StoreLink = ({ link }) => {
    return (
        // <div className="link-wrapper link-grid">
        //     <div>{link.store.name}</div>
        //     <div>{link.current_price}</div>
        //     <div>{link.price_updated}</div>
        // </div>
        <tbody>
            <tr>
                <td>{link.store.name}</td>
                <td>{link.current_price}</td>
                <td>{link.price_updated}</td>
            </tr>
        </tbody>
    );
};

export default StoreLink;
