import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import renderer from "react-test-renderer";

import { wrapWithMemoryRouter, yarnArray, wrapWithUserContext } from "../../../testutils";
import YarnImageWrapper from "./yarn-image-wrapper";

jest.mock("axios");

describe("Yarn image carousel tests", () => {
    let setYarn;
    const yarn = yarnArray[1];
    let rendered;
    beforeEach(() => {
        setYarn = jest.fn();
        rendered = wrapWithUserContext(
            wrapWithMemoryRouter(<YarnImageWrapper yarn={yarn} setYarn={setYarn} />),
            { user: { id: 1, username: "Admin", role: "admin" }, loggedIn: true }
        );
        render(rendered);
    });
    test("Hidden if no images", () => {
        // there should only be the "add an image" button
        expect(screen.getAllByRole("button")).toHaveLength(1);
        const tree = renderer.create(rendered).toJSON();
        expect(tree).toMatchSnapshot();
    });
    test("Testing adding images", async () => {
        // ensure input starts closed
        expect(screen.queryByPlaceholderText("Image URL here")).toBeNull();

        const addImageButton = screen.getByText("Add an image");
        userEvent.click(addImageButton);

        const imageInput = screen.getByPlaceholderText("Image URL here");
        expect(imageInput).toBeInTheDocument();

        const url =
            "https://images4-f.ravelrycache.com/uploads/Classy76/489164758/660EB7E6-D528-4DDA-B700-D49DFE31B8E8_medium2.jpeg";
        axios.post.mockResolvedValue({
            data: { id: 10, url: url, label: "some text", yarn_id: 1 },
        });

        userEvent.type(imageInput, url);
        expect(imageInput).toHaveDisplayValue(url);
        userEvent.type(imageInput, "{enter}");
        await waitFor(() => expect(imageInput).toHaveDisplayValue(""));
        expect(axios.post).toHaveBeenCalled();
    });
});

describe("Non-Admin tests", () => {
    let setYarn;
    const yarn = yarnArray[1];
    beforeEach(() => {
        setYarn = jest.fn();
    });
    test("Regular user test", () => {
        render(
            wrapWithUserContext(
                wrapWithMemoryRouter(<YarnImageWrapper yarn={yarn} setYarn={setYarn} />),
                { user: { id: 1, username: "testUser", role: "" }, loggedIn: true }
            )
        );
        expect(screen.queryByRole("button", { name: /add an image/i })).toBeNull();
        expect(screen.queryByRole("textbox")).toBeNull();
    });
    test("Logged out test", () => {
        render(
            wrapWithUserContext(
                wrapWithMemoryRouter(<YarnImageWrapper yarn={yarn} setYarn={setYarn} />)
            )
        );
        expect(screen.queryByRole("button", { name: /add an image/i })).toBeNull();
        expect(screen.queryByRole("textbox")).toBeNull();
    });
});
