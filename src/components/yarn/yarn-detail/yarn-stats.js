import React from "react";

const YarnStats = (props) => {
    const yarn = props.yarn;

    const populateFibers = () => {
        if (Object.keys(yarn).length > 0) {
            return yarn.fibers.map((fiber) => {
                return (
                    <span key={fiber.id}>
                        {fiber.amount}% {fiber.type}
                    </span>
                );
            });
        } else {
            return null;
        }
    };

    return (
        <div id="stats-grid">
            <div className="attribute">
                <div className="label">Weight</div>
                <div className="value">{yarn.weight_name}</div>
            </div>
            <div className="attribute">
                <div className="label">Gauge</div>
                <div className="value">{yarn.gauge} sts = 4"</div>
            </div>
            <div className="attribute">
                <div className="label">Yardage</div>
                <div className="value">{yarn.yardage} yds</div>
            </div>
            <div className="attribute">
                <div className="label">Unit weight</div>
                <div className="value">{yarn.weight_grams} g</div>
            </div>
            <div className="attribute">
                <div className="label">Texture</div>
                <div className="value">{yarn.texture}</div>
            </div>
            <div className="attribute">
                <div className="label">Color Style</div>
                <div className="value">{yarn.color_style}</div>
            </div>
            <div className="attribute">
                <div className="label">Fibers</div>
                <div className="value">{populateFibers()}</div>
            </div>
            <div className="attribute">
                <div className="label">Colorways</div>
                <div className="value">
                    {Object.keys(yarn).length > 0 ? yarn.colorways.length : null}
                </div>
            </div>
        </div>
    );
};

export default YarnStats;
