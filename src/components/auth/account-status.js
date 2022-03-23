import React, { useState, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import { UserContext } from "../../user-context";
import SignUpModal from "./signup-modal";
import LoginModal from "./login-modal";

const AccountStatusWrapper = () => {
    const { user, loggedIn, setUser, toggleLogIn } = useContext(UserContext);
    const [signUpModalIsOpen, setSignUpModalIsOpen] = useState(false);
    const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);

    const toggleSignUpModal = () => {
        setSignUpModalIsOpen(!signUpModalIsOpen);
    };

    const toggleLoginModal = () => {
        setLoginModalIsOpen(!loginModalIsOpen);
    };

    const logout = () => {
        axios
            .delete(`${process.env.REACT_APP_DOMAIN}/auth/`, {
                withCredentials: true,
                headers: { "X-CSRF-TOKEN": Cookies.get("csrf_access_token") },
            })
            .then((response) => {
                setUser({});
                toggleLogIn();
            })
            .catch((error) => console.log(error.response));
    };

    return (
        <div className="account-status-wrapper">
            {loggedIn ? (
                <>
                    <span>Hi, {user.username}!</span>
                    <button className="link-button" name="logout-btn" onClick={logout}>
                        Log out
                    </button>
                </>
            ) : (
                <>
                    <button className="link-button" name="sign-up-btn" onClick={toggleSignUpModal}>
                        Sign up
                    </button>
                    <SignUpModal isOpen={signUpModalIsOpen} toggle={toggleSignUpModal} />
                    <button className="link-button" onClick={toggleLoginModal} name="login-btn">
                        Log in
                    </button>
                    <LoginModal isOpen={loginModalIsOpen} toggle={toggleLoginModal} />
                </>
            )}
        </div>
    );
};

export default AccountStatusWrapper;
