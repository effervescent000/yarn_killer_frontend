const colorStyles = () => {
    const colorStyleArray = [
        "Solid",
        "Heathered",
        "Semi-solid/Tonal",
        "Variegated",
        "Self-striping",
    ];
    return colorStyleArray.map((style) => (
        <option key={style} value={style}>
            {style}
        </option>
    ));
};

export default colorStyles;
