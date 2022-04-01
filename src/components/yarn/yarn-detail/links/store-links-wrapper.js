import React, { useState, useContext } from "react";
import axios from "axios";
import { Table } from "reactstrap";

import StoreLink from "./store-link";
import { UserContext } from "../../../../user-context";

const StoreLinksWrapper = ({ yarn, setYarn, getYarn }) => {
    const [showInput, setShowInput] = useState(false);
    const [linkInput, setLinkInput] = useState("");
    const { loggedIn, user } = useContext(UserContext);

    const renderHeader = () => {
        if (yarn.links && yarn.links.length > 0) {
            return (
                <thead>
                    <tr>
                        <th>Store</th>
                        <th>Current price</th>
                        <th>Last checked</th>
                        <th></th>
                    </tr>
                </thead>
            );
        }
    };

    const deleteLink = (link) => {
        axios
            .delete(`${process.env.REACT_APP_DOMAIN}/link/${link.id}`)
            .then((response) => {
                getYarn();
            })
            .catch((error) => console.log(error.response));
    };

    const updateLink = (link) => {
        axios
            .put(`${process.env.REACT_APP_DOMAIN}/link/${link.id}`)
            .then((response) => {
                getYarn();
            })
            .catch((error) => console.log(error.response));
    };

    const populateLinks = () => {
        if (Object.keys(yarn).length > 0) {
            return yarn.links.map((link) => (
                <StoreLink
                    key={link.id}
                    link={link}
                    updateLink={updateLink}
                    deleteLink={deleteLink}
                />
            ));
        }
    };

    const handleChange = (event) => {
        if (event.target.name === "link-input") {
            setLinkInput(event.target.value);
        }
    };

    const getStoreName = (url) => {
        const match = url.match(/www\.\w*\.com/);
        if (match) {
            switch (match[0]) {
                case "www.michaels.com":
                    return "Michaels";
                case "www.joann.com":
                    return "Joann";
                default:
                    return "error";
            }
        }
        return "error";
    };

    const handleKeyUp = (event) => {
        if (event.target.name === "link-input") {
            if (event.key === "Enter") {
                postLink();
            }
        }
    };

    const postLink = () => {
        const store = getStoreName(linkInput);
        axios
            .post(`${process.env.REACT_APP_DOMAIN}/link/`, {
                yarn_id: yarn.id,
                url: linkInput,
                store: store,
            })
            .then((response) => {
                setYarn({ ...yarn, links: [...yarn.links, response.data] });
                setLinkInput("");
            })
            .catch((error) => console.log(error.response));
    };

    const handleClick = (event) => {
        if (event.target.name === "save-link-btn") {
            postLink();
        }
    };

    return (
        <div id="store-links-wrapper">
            <Table>
                {renderHeader()}
                {populateLinks()}
            </Table>
            {loggedIn && user.role === "admin" ? (
                <div className="input-wrapper">
                    <button
                        name="add-link-btn"
                        onClick={() => {
                            setShowInput(!showInput);
                        }}
                        id="add-link-btn"
                    >
                        {showInput ? <>Hide input form</> : <>Add link</>}
                    </button>

                    {showInput ? (
                        <form>
                            <input
                                type="text"
                                name="link-input"
                                value={linkInput}
                                onChange={handleChange}
                                onKeyUp={handleKeyUp}
                            />
                            <button
                                id="save-link-btn"
                                type="button"
                                name="save-link-btn"
                                onClick={handleClick}
                            >
                                Save
                            </button>
                        </form>
                    ) : null}
                </div>
            ) : null}
        </div>
    );
};

export default StoreLinksWrapper;
