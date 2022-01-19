import React, { useState, useEffect } from "react";
import axios from "axios";

const BrowseFilterWrapper = (props) => {
    const [brandArray, setBrandArray] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState("");
    const [yarnName, setYarnName] = useState("");
    const [gaugeInput, setGaugeInput] = useState("");
    const [approxInput, setApproxInput] = useState(false);
    const [weightName, setWeightName] = useState("");
    const [textureInput, setTextureInput] = useState("");
    const [colorStyleInput, setColorStyleInput] = useState("");

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
        } else if (event.target.name === "approx-input") {
            setApproxInput(approxInput ? false : true);
        } else if (event.target.name === "yarn-weight-select") {
            setWeightName(event.target.value);
        } else if (event.target.name === "texture-select") {
            setTextureInput(event.target.value);
        } else if (event.target.name === "color-style-select") {
            setColorStyleInput(event.target.value);
        }
    };

    const handleClick = (event) => {
        if (event.target.name === "submit-btn") {
            let params = {};
            if (selectedBrand) {
                params.brand = selectedBrand;
            }
            if (yarnName) {
                params.name = yarnName;
            }
            if (gaugeInput) {
                params.gauge = gaugeInput;
                params.approx = approxInput;
            }
            if (weightName) {
                params.weightName = weightName;
            }
            if (textureInput) {
                params.texture = textureInput;
            }
            if (colorStyleInput) {
                params.colorStyle = colorStyleInput;
            }

            axios
                .get(`${process.env.REACT_APP_DOMAIN}/yarn/get`, { params })
                .then((response) => {
                    props.setYarnResults(response.data);
                })
                .catch((error) => console.log(error.response));
        } else if (event.target.name === "reset-btn") {
            setSelectedBrand("");
            setYarnName("");
            setGaugeInput("");
            setApproxInput(false);
            setWeightName("");
            setTextureInput("");
            setColorStyleInput("");
            props.getAllYarn();
        }
    };

    return (
        <div id="filter-form-wrapper">
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
                    <span className="label">Gauge</span>
                    <input
                        type="number"
                        name="gauge-input"
                        value={gaugeInput}
                        onChange={handleChange}
                    />
                    <span>Approx</span>
                    <input
                        type="checkbox"
                        name="approx-input"
                        checked={approxInput}
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
            </div>
            <div className="btn-wrapper">
                <button name="submit-btn" onClick={handleClick}>
                    Search/filter results
                </button>
                <button name="reset-btn" onClick={handleClick}>
                    Reset results
                </button>
            </div>
        </div>
    );
};

export default BrowseFilterWrapper;
