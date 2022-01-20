import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";

import YarnForm from "../forms/yarn-form";

const YarnEditPage = (props) => {
    const [formData, setFormData] = useState({});
    const [yarnData, setYarnData] = useState({});
    const { permalink } = useParams();

    useEffect(() => {
        if (permalink !== "new" && Object.keys(yarnData).length === 0) {
            axios
                .get(`${process.env.REACT_APP_DOMAIN}/yarn/get/${permalink}`)
                .then((response) => {
                    setYarnData(response.data);
                })
                .catch((error) => console.log(error.response));
        }
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

    const renderForm = () => {
        if (permalink === "new") {
            return <YarnForm setFormData={setFormData} />;
        } else if (Object.keys(yarnData).length > 0) {
            return <YarnForm yarnData={yarnData} setFormData={setFormData} />;
        }
    };

    return <div id="yarn-edit-wrapper">{renderForm()}</div>;
};

export default YarnEditPage;
