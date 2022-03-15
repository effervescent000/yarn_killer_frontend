import React, { useState } from "react";
import { Table } from "reactstrap";

import StoreLink from "./store-link";

const StoreLinksWrapper = ({ yarn }) => {
    const [showInput, setShowInput] = useState(false);
    const [linkInput, setLinkInput] = useState("");

    const renderHeader = () => {
        if (yarn.links && yarn.links.length > 0) {
            return (
                // <div id="links-header" className="link-grid">
                //     <div>Store</div>
                //     <div>Current price</div>
                //     <div>Price last checked</div>
                // </div>
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
                        />
                    </form>
                ) : null}
            </div>
        </div>
    );
};

export default StoreLinksWrapper;
