import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import renderer from "react-test-renderer";

import { yarnArray, wrapWithUserContext } from "../../../../testutils";
import StoreLinksWrapper from "./store-links-wrapper";

jest.mock("axios");

describe("Admin tests", () => {
    let setYarn;
    beforeEach(() => {
        setYarn = jest.fn();
        render(
            wrapWithUserContext(<StoreLinksWrapper yarn={yarnArray[0]} setYarn={setYarn} />, {
                user: { id: 1, username: "Admin", role: "admin" },
                loggedIn: true,
            })
        );
    });

    test("Starts closed", () => {
        expect(screen.getByRole("button", { name: /add link/i })).toBeInTheDocument();
        expect(screen.queryByRole("button", { name: /save/i })).toBeNull();
    });

    test("Button toggles link input", () => {
        const openLinkInputButton = screen.getByRole("button", { name: /add link/i });
        userEvent.click(openLinkInputButton);
        expect(screen.queryByRole("button", { name: /save/i })).toBeInTheDocument();
        userEvent.click(openLinkInputButton);
        expect(screen.queryByRole("button", { name: /save/i })).toBeNull();
    });

    describe("Tests with link input", () => {
        let linkInput;
        const url = "https://www.michaels.com/red-heart-super-saver-yarn-solid/M10172089.html";
        beforeEach(() => {
            userEvent.click(screen.getByRole("button", { name: /add link/i }));
            linkInput = screen.getByRole("textbox");
            userEvent.type(linkInput, url);
        });

        test("Link input functions", () => {
            expect(linkInput).toHaveDisplayValue(url);
        });

        test("Hitting Enter posts data", async () => {
            axios.post.mockResolvedValue({
                data: {
                    id: 10,
                    url: url,
                    store_id: 5,
                    yarn_id: 1,
                    current_price: null,
                    price_updated: null,
                    store: "Michaels",
                },
            });
            userEvent.type(linkInput, "{enter}");
            expect(axios.post).toHaveBeenCalled();
            await waitFor(() => expect(linkInput).toHaveDisplayValue(""));
        });

        test("Clicking save button posts data", async () => {
            axios.post.mockResolvedValue({
                data: {
                    id: 10,
                    url: url,
                    store_id: 5,
                    yarn_id: 1,
                    current_price: null,
                    price_updated: null,
                    store: "Michaels",
                },
            });
            userEvent.click(screen.getByRole("button", { name: /save/i }));
            expect(axios.post).toHaveBeenCalled();
            await waitFor(() => expect(linkInput).toHaveDisplayValue(""));
        });
    });
});

describe("regular user tests", () => {
    let setYarn;
    beforeEach(() => {
        setYarn = jest.fn();
        render(
            wrapWithUserContext(<StoreLinksWrapper yarn={yarnArray[0]} setYarn={setYarn} />, {
                user: { id: 1, username: "testUser", role: "" },
                loggedIn: true,
            })
        );
    });
    test("admin-only buttons are absent", () => {
        expect(screen.queryByRole("button", { name: /add link/i })).toBeNull();
        expect(screen.queryByRole("button", { name: /delete/i })).toBeNull();
    });
});
