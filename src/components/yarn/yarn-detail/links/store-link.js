import React from "react";

const StoreLink = ({ link }) => {
    return (
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
