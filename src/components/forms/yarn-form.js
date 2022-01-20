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
    // const [selectedBrand, setSelectedBrand] = useState(props.formData ? props.formData.brand : "");
    // const [yarnName, setYarnName] = useState(props.formData ? props.formData.name : "");
    // const [gaugeInput, setGaugeInput] = useState(props.formData ? props.formData.gauge : "");
    // const [weightName, setWeightName] = useState(props.formData ? props.formData.weight_name : "");
    // const [unitWeightInput, setUnitWeightInput] = useState(
    //     props.formData ? props.formData.unit_weight : ""
    // );
    // const [textureInput, setTextureInput] = useState(props.formData ? props.formData.texture : "");
    // const [colorStyleInput, setColorStyleInput] = useState(
    //     props.formData ? props.formData.color_style : ""
    // );
    // const [discontinuedInput, setDiscontinuedInput] = useState(
    //     props.formData ? props.formData.discontinued : false
    // );

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
                    brand: "",
                    name: "",
                    weightName: "",
                    gauge: "",
                    yardage: "",
                    unitWeight: "",
                    texture: "",
                    colorStyle: "",
                    discontinued: false,
                    selectFiber1: "",
                    numberFiber1: "",
                    selectFiber2: "",
                    numberFiber2: "",
                    selectFiber3: "",
                    numberFiber3: "",
                    selectFiber4: "",
                    numberFiber4: "",
                    selectFiber5: "",
                    numberFiber5: "",
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
                    <NumberInput label="Yarn weight" name="weightName" divClass="field-wrapper" />
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
