import React, { useContext } from "react";

import { UserContext } from "../../../../user-context";

const StoreLink = ({ link, updateLink, deleteLink }) => {
    const { loggedIn, user } = useContext(UserContext);

    const renderDatetime = () => {
        const date = new Date(link.price_updated);
        return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
    };

    return (
        <tbody>
            <tr>
                <td>{link.store.name}</td>
                <td>${link.current_price}</td>
                <td>{renderDatetime()}</td>
                <td>
                    <button name="update-btn" onClick={() => updateLink(link)}>
                        Update
                    </button>
                </td>
                {loggedIn && user.role === "admin" ? (
                    <td>
                        <button name="delete-btn" onClick={() => deleteLink(link)}>
                            Delete
                        </button>
                    </td>
                ) : null}
            </tr>
        </tbody>
    );
};

export default StoreLink;
