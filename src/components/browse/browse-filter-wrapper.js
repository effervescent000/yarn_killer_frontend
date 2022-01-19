import React, { useState, useEffect } from "react";
import axios from "axios";

const BrowseFilterWrapper = (props) => {
    const [brandArray, setBrandArray] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState("");
    const [yarnName, setYarnName] = useState("");
    const [gaugeInput, setGaugeInput] = useState("");
    const [approxInput, setApproxInput] = useState(false);

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
        }
    };

    const handleClick = (event) => {
        if (event.target.name === "submit-btn") {
            axios
                .get(`${process.env.REACT_APP_DOMAIN}/yarn/get`, {
                    params: {
                        brand: selectedBrand,
                        name: yarnName,
                    },
                })
                .then((response) => {
                    props.setYarnResults(response.data);
                })
                .catch((error) => console.log(error.response));
        } else if (event.target.name === "reset-btn") {
            setSelectedBrand("");
            setYarnName("");
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
                    <select name="yarn-weight-select">
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
