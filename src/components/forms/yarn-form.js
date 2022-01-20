import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import TextInput from "./form-components/text-input";
import SelectField from "./form-components/select-field";
import NumberInput from "./form-components/number-input";
import CheckboxInput from "./form-components/checkbox-input";
import FiberInput from "./form-components/fiber-input";

import yarnWeights from "./helpers/yarn-weights";
import yarnTextures from "./helpers/yarn-textures";
import colorStyles from "./helpers/color-styles";

const YarnForm = (props) => {
    const [brandArray, setBrandArray] = useState([]);
    const { yarnData } = props;

    useEffect(() => {
        getBrands();
    }, []);

    const getBrands = () => {
        axios
            .get(`${process.env.REACT_APP_DOMAIN}/yarn/brands`)
            .then((response) => {
                response.data.sort();
                response.data.unshift("");
                setBrandArray(response.data);
            })
            .catch((error) => console.log(error.response));
    };

    const populateBrandsSelect = () => {
        return brandArray.map((brand) => (
            <option key={brand} value={brand}>
                {brand}
            </option>
        ));
    };

    return (
        <div id="yarn-form-wrapper">
            <Formik
                initialValues={{
                    brand: yarnData.brand || "",
                    name: yarnData.name || "",
                    weightName: yarnData.weight_name || "",
                    gauge: yarnData.gauge || "",
                    yardage: yarnData.yardage || "",
                    unitWeight: yarnData.weight_grams || "",
                    texture: yarnData.texture || "",
                    colorStyle: yarnData.color_style || "",
                    discontinued: yarnData.discontinued || false,
                    selectFiber1: yarnData.fibers[0].type || "",
                    numberFiber1: yarnData.fibers[0].amount || "",
                    selectFiber2: yarnData.fibers[1] ? yarnData.fibers[1].type : "",
                    numberFiber2: yarnData.fibers[1] ? yarnData.fibers[1].amount : "",
                    selectFiber3: yarnData.fibers[2] ? yarnData.fibers[2].type : "",
                    numberFiber3: yarnData.fibers[2] ? yarnData.fibers[2].amount : "",
                    selectFiber4: yarnData.fibers[3] ? yarnData.fibers[3].type : "",
                    numberFiber4: yarnData.fibers[3] ? yarnData.fibers[3].amount : "",
                    selectFiber5: yarnData.fibers[4] ? yarnData.fibers[4].type : "",
                    numberFiber5: yarnData.fibers[4] ? yarnData.fibers[4].amount : "",
                }}
                validationSchema={Yup.object({
                    brand: Yup.string().required("Required"),
                    name: Yup.string().required(),
                    weightName: Yup.string().required("Required"),
                    gauge: Yup.number()
                        .integer("Must be an integer")
                        .positive("Must be a positive number")
                        .required("Required"),
                    yardage: Yup.number().integer("Must be an integer"),
                    unitWeight: Yup.number().integer("Must be an integer"),
                })}
                onSubmit={(values) => {
                    props.setFormData(values);
                }}
            >
                <Form>
                    <SelectField label="Brand name" name="brand" divClass="field-wrapper">
                        {populateBrandsSelect()}
                    </SelectField>
                    <TextInput label="Yarn name" name="name" divClass="field-wrapper" />
                    <SelectField label="Yarn weight" name="weightName" divClass="field-wrapper">
                        {yarnWeights()}
                    </SelectField>
                    <NumberInput label="Gauge" name="gauge" divClass="field-wrapper" />
                    <NumberInput label="Yardage" name="yardage" divClass="field-wrapper" />
                    <NumberInput label="Unit weight" name="unitWeight" divClass="field-wrapper" />
                    <SelectField label="Texture" name="texture" divClass="field-wrapper">
                        {yarnTextures()}
                    </SelectField>
                    <SelectField label="Color style" name="colorStyle" divClass="field-wrapper">
                        {colorStyles()}
                    </SelectField>
                    <CheckboxInput name="discontinued">Discontinued?</CheckboxInput>
                    <div id="fibers-wrapper">
                        <FiberInput label="Fiber Input 1" name="Fiber1" />
                        <FiberInput label="Fiber Input 2" name="Fiber2" />
                        <FiberInput label="Fiber Input 3" name="Fiber3" />
                        <FiberInput label="Fiber Input 4" name="Fiber4" />
                        <FiberInput label="Fiber Input 5" name="Fiber5" />
                    </div>

                    <button type="submit">Save</button>
                </Form>
            </Formik>
        </div>
    );
};

export default YarnForm;
