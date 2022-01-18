import React from "react";

const YarnStats = (props) => {
    const yarn = props.yarn;
    console.log(yarn);

    return (
        <div id="stats-grid">
            <div id="stats-labels">
                <div className="label">Weight</div>
                <div className="label">Gauge</div>
                <div className="label">Yardage</div>
                <div className="label">Unit weight</div>
                <div className="label">Texture</div>
                <div className="label">Color style</div>
                <div className="label">Fibers</div>
                <div className="label">Known colors</div>
            </div>
            <div id="stats-output">
                <div className="output">{yarn.weight}</div>
                <div className="output">{yarn.gauge}</div>
                <div className="output">{yarn.yardage}</div>
                <div className="output">{yarn.unit_weight}</div>
                <div className="output">{yarn.texture}</div>
                <div className="output">Color style</div>
                <div className="output">Fibers</div>
                <div className="output">Known colors</div>
            </div>
        </div>
    );
};

export default YarnStats;
