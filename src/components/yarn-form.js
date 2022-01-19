import React, { useState, useEffect } from "react";
import axios from "axios";

const YarnForm = (props) => {
    const [brandArray, setBrandArray] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState(props.formData ? props.formData.brand : "");
    const [yarnName, setYarnName] = useState(props.formData ? props.formData.name : "");
    const [gaugeInput, setGaugeInput] = useState(props.formData ? props.formData.gauge : "");
    const [weightName, setWeightName] = useState(props.formData ? props.formData.weight_name : "");
    const [unitWeightInput, setUnitWeightInput] = useState(
        props.formData ? props.formData.unit_weight : ""
    );
    const [textureInput, setTextureInput] = useState(props.formData ? props.formData.texture : "");
    const [colorStyleInput, setColorStyleInput] = useState(
        props.formData ? props.formData.color_style : ""
    );
    const [discontinuedInput, setDiscontinuedInput] = useState(
        props.formData ? props.formData.discontinued : false
    );

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

    const handleChange = (event) => {
        if (event.target.name === "brand-select") {
            setSelectedBrand(event.target.value);
        } else if (event.target.name === "yarn-name-input") {
            setYarnName(event.target.value);
        } else if (event.target.name === "gauge-input") {
            setGaugeInput(event.target.value);
        } else if (event.target.name === "yarn-weight-select") {
            setWeightName(event.target.value);
        } else if (event.target.name === "texture-select") {
            setTextureInput(event.target.value);
        } else if (event.target.name === "color-style-select") {
            setColorStyleInput(event.target.value);
        } else if (event.target.name === "unit-weight-input") {
            setUnitWeightInput(event.target.value);
        } else if (event.target.name === "discontinued-input") {
            setDiscontinuedInput(discontinuedInput ? false : true);
        }
    };

    const handleClick = (event) => {
        if (event.target.name === "submit-btn") {
            props.setFormData({
                brand: selectedBrand,
                name: yarnName,
                weight_name: weightName,
                gauge: gaugeInput,
                unit_weight: unitWeightInput,
                texture: textureInput,
                color_style: colorStyleInput,
                discontiued: discontinuedInput,
            });
        }
    };

    return (
        <div className="form-wrapper">
            <div className="inputs">
                <div className="filter">
                    <span className="label">Brand</span>
                    <select name="brand-select" value={selectedBrand} onChange={handleChange}>
                        {populateBrandsSelect()}
                    </select>
                </div>
                <div className="filter">
                    <span className="label">Yarn name</span>
                    <input
                        type="text"
                        name="yarn-name-input"
                        value={yarnName}
                        onChange={handleChange}
                    />
                </div>
                <div className="filter">
                    <span className="label">Weight</span>
                    <select name="yarn-weight-select" value={weightName} onChange={handleChange}>
                        <option value=""></option>
                        <option value="Thread">Thread</option>
                        <option value="Cobweb">Cobweb</option>
                        <option value="Lace">Lace</option>
                        <option value="Light Fingering">Light Fingering</option>
                        <option value="Fingering">Fingering</option>
                        <option value="DK">DK</option>
                        <option value="Worsted">Worsted</option>
                        <option value="Aran">Aran</option>
                        <option value="Bulky">Bulky</option>
                        <option value="Super Bulky">Super Bulky</option>
                        <option value="Jumbo">Jumbo</option>
                    </select>
                </div>
                <div className="filter">
                    <span className="label">Gauge</span>
                    <input
                        type="number"
                        name="gauge-input"
                        value={gaugeInput}
                        onChange={handleChange}
                    />
                </div>
                <div className="filter">
                    <span className="label">Unit weight</span>
                    <input
                        type="number"
                        name="unit-weight-input"
                        value={unitWeightInput}
                        onChange={handleChange}
                    />
                </div>
                <div className="filter">
                    <span className="label">Texture</span>
                    <select name="texture-select" value={textureInput} onChange={handleChange}>
                        <option value=""></option>
                        <option value="Single-ply">Single-ply</option>
                        <option value="Plied (3+)">Plied (3+)</option>
                        <option value="Cabled">Cabled</option>
                        <option value="Tape">Tape</option>
                    </select>
                </div>
                <div className="filter">
                    <span className="label">Color style</span>
                    <select
                        name="color-style-select"
                        value={colorStyleInput}
                        onChange={handleChange}
                    >
                        <option value=""></option>
                        <option value="Solid">Solid</option>
                        <option value="Heathered">Heathered</option>
                        <option value="Semi-solid/Tonal">Semi-solid/Tonal</option>
                        <option value="Variegated">Variegated</option>
                        <option value="Self-striping">Self-striping</option>
                    </select>
                </div>
                <div className="filter">
                    <span className="label">Discontinued?</span>
                    <input
                        type="checkbox"
                        name="discontinued-input"
                        value={discontinuedInput}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <button name="submit-btn" onClick={handleClick}>
                Submit
            </button>
        </div>
    );
};

export default YarnForm;
