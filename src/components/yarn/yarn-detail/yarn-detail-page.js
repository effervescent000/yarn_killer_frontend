import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useParams } from "react-router";

import YarnStats from "./yarn-stats";
import StoreLinksWrapper from "./links/store-links-wrapper";
import YarnImageWrapper from "./yarn-image-wrapper";
import { UserContext } from "../../../user-context";

const YarnDetailPage = (props) => {
    const [yarn, setYarn] = useState({});
    const { permalink } = useParams();
    const history = useHistory();
    const { user, loggedIn } = useContext(UserContext);

    useEffect(() => {
        if (Object.keys(yarn).length === 0) {
            getYarn();
        }
    });

    const getYarn = () => {
        axios
            .get(`${process.env.REACT_APP_DOMAIN}/yarn/${permalink}`)
            .then((response) => {
                setYarn(response.data);
            })
            .catch((error) => console.log(error.response));
    };

    const handleClick = (event) => {
        if (event.target.name === "delete-link") {
            axios
                .delete(`${process.env.REACT_APP_DOMAIN}/yarn/${yarn.id}`)
                .then((response) => {
                    history.push("/");
                })
                .catch((error) => console.log(error.response));
        }
    };

    return (
        <div id="yarn-detail-page-wrapper">
            <div id="admin-wrapper">
                {loggedIn && user.role === "admin" ? (
                    <>
                        <div className="link-wrapper">
                            <Link to={`/yarn/${yarn.id}/edit`}>Edit yarn</Link>
                        </div>
                        <div className="link-wrapper">
                            <button name="delete-link" className="link-btn" onClick={handleClick}>
                                Delete yarn
                            </button>
                        </div>
                    </>
                ) : null}
            </div>
            <div id="grid-wrapper">
                <div id="left-side-grid">
                    <YarnImageWrapper yarn={yarn} setYarn={setYarn} />
                    <div id="brand-name">{yarn.brand}</div>
                    <div id="yarn-name">{yarn.name}</div>
                    <YarnStats yarn={yarn} />
                </div>
                <div id="right-side-grid">
                    {/* stash stuff here maybe if I do that */}
                    <StoreLinksWrapper yarn={yarn} setYarn={setYarn} getYarn={getYarn} />
                </div>
            </div>
            <div />
        </div>
    );
};

export default YarnDetailPage;
