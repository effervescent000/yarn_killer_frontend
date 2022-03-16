import React from "react";
import { Formik, Form, FieldArray } from "formik";
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
    const { yarnData } = props;

    return (
        <div id="yarn-form-wrapper">
            <Formik
                initialValues={{
                    brand: yarnData ? yarnData.brand : "",
                    name: yarnData ? yarnData.name : "",
                    weightName: yarnData ? yarnData.weight_name : "",
                    gauge: yarnData ? yarnData.gauge : "",
                    yardage: yarnData ? yarnData.yardage : "",
                    unitWeight: yarnData ? yarnData.weight_grams : "",
                    texture: yarnData ? yarnData.texture : "",
                    colorStyle: yarnData ? yarnData.color_style : "",
                    discontinued: yarnData ? yarnData.discontinued : false,
                    fibers: yarnData
                        ? yarnData.fibers.map((fiber) => {
                              return { type: fiber.type, amount: fiber.amount };
                          })
                        : [],
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
                {({ values }) => {
                    return (
                        <Form>
                            <TextInput label="Brand name" name="brand" divclass="field-wrapper" />
                            <TextInput label="Yarn name" name="name" divclass="field-wrapper" />
                            <SelectField
                                label="Yarn weight"
                                name="weightName"
                                divclass="field-wrapper"
                            >
                                {yarnWeights()}
                            </SelectField>
                            <NumberInput label="Gauge" name="gauge" divclass="field-wrapper" />
                            <NumberInput label="Yardage" name="yardage" divclass="field-wrapper" />
                            <NumberInput
                                label="Unit weight"
                                name="unitWeight"
                                divclass="field-wrapper"
                            />
                            <SelectField label="Texture" name="texture" divclass="field-wrapper">
                                {yarnTextures()}
                            </SelectField>
                            <SelectField
                                label="Color style"
                                name="colorStyle"
                                divclass="field-wrapper"
                            >
                                {colorStyles()}
                            </SelectField>
                            <CheckboxInput name="discontinued">Discontinued?</CheckboxInput>
                            <FieldArray name="fibers">
                                {({ remove, push }) => {
                                    return (
                                        <div id="fibers-wrapper">
                                            {values.fibers.map((_, index) => {
                                                return (
                                                    <div
                                                        className="fiber-wrapper"
                                                        key={`fiber-${index}`}
                                                    >
                                                        <FiberInput name={`fibers.${index}`} />
                                                        <button
                                                            type="button"
                                                            onClick={() => remove(index)}
                                                        >
                                                            -
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                            <button
                                                type="button"
                                                onClick={() => push({ type: "", amount: "" })}
                                            >
                                                +
                                            </button>
                                        </div>
                                    );
                                }}
                            </FieldArray>
                            <button type="submit">Save</button>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default YarnForm;
