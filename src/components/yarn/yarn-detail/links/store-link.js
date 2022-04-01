import React from "react";

const StoreLink = ({ link, updateLink, deleteLink }) => {
    return (
        <tbody>
            <tr>
                <td>{link.store.name}</td>
                <td>{link.current_price}</td>
                <td>{link.price_updated}</td>
                <td>
                    <button name="update-btn" onClick={() => updateLink(link)}>
                        Update
                    </button>
                </td>
                <td>
                    <button name="delete-btn" onClick={() => deleteLink(link)}>
                        Delete
                    </button>
                </td>
            </tr>
        </tbody>
    );
};

export default StoreLink;
