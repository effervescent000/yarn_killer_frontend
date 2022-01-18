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
                <div className="output">{yarn.weight_name}</div>
                <div className="output">{yarn.gauge} sts = 4"</div>
                <div className="output">{yarn.yardage}yds</div>
                <div className="output">{yarn.weight_grams}g</div>
                <div className="output">{yarn.texture}</div>
                <div className="output">{yarn.color_style}</div>
                <div className="output">{yarn.fibers}</div>
                <div className="output">{}</div>
            </div>
        </div>
    );
};

export default YarnStats;
