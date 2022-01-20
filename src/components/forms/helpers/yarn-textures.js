const yarnTextures = () => {
    const texturesArray = ["Single-ply", "Plied (3+)", "Cabled", "Tape"];
    return texturesArray.map((texture) => (
        <option key={texture} value={texture}>
            {texture}
        </option>
    ));
};

export default yarnTextures;
