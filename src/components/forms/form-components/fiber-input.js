import React from "react";
import { useField } from "formik";

import SelectField from "./select-field";
import NumberInput from "./number-input";

import fiberTypes from "../helpers/fiber-types";

const FiberInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <div>
            <label>{label}</label>
            <div>
                <SelectField label="Fiber" name={`select${props.name}`}>
                    {fiberTypes()}
                </SelectField>
                <NumberInput label="%" name={`number${props.name}`} />
            </div>
        </div>
    );
};

export default FiberInput;
