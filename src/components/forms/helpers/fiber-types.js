const fiberTypes = () => {
    const fiberArray = [
        "",
        "Acrylic",
        "Alpaca",
        "Bamboo",
        "Cashmere",
        "Cotton",
        "Polyester",
        "Nylon",
        "Rayon",
        "Silk",
        "Tencel",
        "Wool",
        "Other",
    ];
    return fiberArray.map((fiber) => (
        <option key={fiber} value={fiber}>
            {fiber}
        </option>
    ));
};

export default fiberTypes;
