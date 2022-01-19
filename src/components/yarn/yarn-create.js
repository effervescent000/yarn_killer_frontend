import React, { useState, useEffect } from "react";
import axios from "axios";

import YarnForm from "../yarn-form";

const YarnCreatePage = (props) => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (Object.keys(formData).length > 0) {
            axios
                .post(`${process.env.REACT_APP_DOMAIN}/yarn/add`, formData)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => console.log(error.response));
        }
    });

    return (
        <div id="yarn-create-wrapper">
            <YarnForm setForm={setFormData} />
        </div>
    );
};

export default YarnCreatePage;
