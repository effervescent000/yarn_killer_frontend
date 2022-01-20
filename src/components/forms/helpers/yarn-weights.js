const yarnWeights = () => {
    const yarnWeightsArray = [
        "",
        "Thread",
        "Cobweb",
        "Lace",
        "Light Fingering",
        "Fingering",
        "Sport",
        "DK",
        "Worsted",
        "Aran",
        "Bulky",
        "Super Bulky",
        "Jumbo",
    ];
    return yarnWeightsArray.map((weight) => (
        <option key={weight} value={weight}>
            {weight}
        </option>
    ));
};

export default yarnWeights;
