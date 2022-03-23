import React, { useContext } from "react";
import { Modal, ModalBody } from "reactstrap";
import { Formik, Form } from "formik";
import Cookies from "js-cookie";
import * as Yup from "yup";
import axios from "axios";

import TextInput from "../forms/form-components/text-input";
import PasswordInput from "../forms/form-components/password-input";
import { UserContext } from "../../user-context";

const SignUpModal = ({ isOpen, toggle }) => {
    const { setUser, toggleLogIn } = useContext(UserContext);

    const handleSubmit = (values) => {
        axios
            .post(`${process.env.REACT_APP_DOMAIN}/auth/signup`, values, {
                withCredentials: true,
                headers: { "X-CSRF-TOKEN": Cookies.get("csrf_access_token") },
            })
            .then((response) => {
                if (Object.keys(response.data).length > 0) {
                    toggle();
                    setUser(response.data);
                    toggleLogIn();
                }
            })
            .catch((error) => console.log(error.response));
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalBody>
                <Formik
                    initialValues={{ username: "", password: "", confirmPassword: "" }}
                    onSubmit={(values) => handleSubmit(values)}
                >
                    <Form>
                        <TextInput name="username" label="Username" />
                        <PasswordInput name="password" label="Password" />
                        <PasswordInput name="passwordConfirm" label="Confirm password" />
                        <button type="submit">Sign up</button>
                    </Form>
                </Formik>
            </ModalBody>
        </Modal>
    );
};

export default SignUpModal;
