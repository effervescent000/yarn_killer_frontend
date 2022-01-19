import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";

import YarnForm from "../yarn-form";

const YarnEditPage = (props) => {
    const [formData, setFormData] = useState({});
    const { permalink } = useParams();

    useEffect(() => {
        if (Object.keys(formData).length > 0) {
            if (permalink === "new") {
                axios
                    .post(`${process.env.REACT_APP_DOMAIN}/yarn/add`, formData)
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error) => console.log(error.response));
            } else {
                axios
                    .put(`${process.env.REACT_APP_DOMAIN}/yarn/update`, {
                        id: permalink,
                        ...formData,
                    })
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error) => console.log(error.response));
            }
        }
    });

    return (
        <div id="yarn-create-wrapper">
            <YarnForm setFormData={setFormData} />
        </div>
    );
};

export default YarnEditPage;
