import React, { useContext } from "react";

import { UserContext } from "../../../../user-context";

const StoreLink = ({ link, updateLink, deleteLink }) => {
    const { loggedIn, user } = useContext(UserContext);
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
