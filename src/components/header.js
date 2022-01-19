import React from "react";
import { NavLink } from "react-router-dom";

import catLogoWhite from "../static/assets/cat with yarn white.png";

const Header = (props) => {
    return (
        <div id="header">
            <div id="left-side-header">
                <div className="nav-bar">
                    <NavLink to="/yarn/browse">Browse Yarn</NavLink>
                    <NavLink to="/yarn/new/edit">Add yarn</NavLink>
                    <NavLink to="/colorways/manage">Colorways</NavLink>
                </div>
            </div>
            <div id="center-header">
                <div className="logo">
                    <img src={catLogoWhite} alt="Kitty!" />
                    <span>Yarn Killer!</span>
                </div>
            </div>
            <div id="right-side-header">
                <span>Login stuff will go here</span>
            </div>
        </div>
    );
};

export default Header;
