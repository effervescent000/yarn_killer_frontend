import React, { useState } from "react";
import axios from "axios";
import { Table } from "reactstrap";

import StoreLink from "./store-link";

const StoreLinksWrapper = ({ yarn, setYarn }) => {
    const [showInput, setShowInput] = useState(false);
    const [linkInput, setLinkInput] = useState("");

    const renderHeader = () => {
        if (yarn.links && yarn.links.length > 0) {
            return (
                <thead>
                    <th>Store</th>
                    <th>Current price</th>
                    <th>Last checked</th>
                </thead>
            );
        }
    };

    const populateLinks = () => {
        if (Object.keys(yarn).length > 0) {
            return yarn.links.map((link) => <StoreLink key={link.id} link={link} />);
        }
    };

    const handleChange = (event) => {
        if (event.target.name === "link-input") {
            setLinkInput(event.target.value);
        }
    };

    const getStoreName = (url) => {
        switch (url.match(/www\.*\.com/)) {
            case "www.michaels.com":
                return "Michael's";
            case "www.joann.com":
                return "Joann";
            default:
                return "error";
        }
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
            .post(`${process.env.REACT_APP_DOMAIN}/yarn/link`, {
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
        </div>
    );
};

export default StoreLinksWrapper;
