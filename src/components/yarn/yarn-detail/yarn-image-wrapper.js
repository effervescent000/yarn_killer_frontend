import React, { useContext, useState } from "react";
import axios from "axios";
import { UncontrolledCarousel } from "reactstrap";
import { Spinner } from "reactstrap";

import { UserContext } from "../../../user-context";

const YarnImageWrapper = ({ yarn, setYarn }) => {
    const [addImageIsOpen, setAddImageIsOpen] = useState(false);
    const [imageUrlInput, setImageUrlInput] = useState("");
    const { loggedIn, user } = useContext(UserContext);

    const handleChange = (event) => {
        if (event.target.name === "img-url-input") {
            setImageUrlInput(event.target.value);
        }
    };

    const constructItems = () => {
        const items = [];
        if (yarn.images) {
            for (const image of yarn.images) {
                items.push({
                    src: image.url,
                    altText: `${yarn.brand} ${yarn.name}`,
                    caption: image.label,
                });
            }
        }
        return items;
    };

    const handleKeyUp = async (event) => {
        if (event.target.name === "img-url-input") {
            if (event.key === "Enter") {
                try {
                    const res = await axios.post(`${process.env.REACT_APP_DOMAIN}/yarn/image`, {
                        yarn_id: yarn.id,
                        url: imageUrlInput,
                    });
                    setImageUrlInput("");
                    setYarn({ ...yarn, images: [...yarn.images, res.data] });
                    return res;
                } catch (error) {
                    console.log(error);
                }
            }
        }
    };

    return Object.keys(yarn).length > 0 ? (
        <div className="image-wrapper">
            <div className="carousel-wrapper">
                {yarn.images.length > 0 ? <UncontrolledCarousel items={constructItems()} /> : null}
                {loggedIn && user.role === "admin" ? (
                    <button
                        className="add-image-btn"
                        onClick={() => setAddImageIsOpen(!addImageIsOpen)}
                    >
                        Add an image
                    </button>
                ) : null}
            </div>

            {addImageIsOpen ? (
                <input
                    type="text"
                    name="img-url-input"
                    value={imageUrlInput}
                    onChange={handleChange}
                    onKeyUp={handleKeyUp}
                    placeholder="Image URL here"
                />
            ) : null}
        </div>
    ) : (
        <Spinner />
    );
};

export default YarnImageWrapper;
