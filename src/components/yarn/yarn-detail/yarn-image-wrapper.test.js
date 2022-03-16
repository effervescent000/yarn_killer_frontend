import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import renderer from "react-test-renderer";

import { renderWithRouter, routerWrapper } from "../../../testutils";
import YarnImageWrapper from "./yarn-image-wrapper";

const yarnArray = [
    {
        brand: "Red Heart",
        color_style: "",
        colorways: [],
        discontinued: false,
        fibers: [
            {
                amount: 100,
                id: 1,
                type: "Acrylic",
                yarn_id: 1,
            },
        ],
        gauge: 17,
        id: 1,
        images: [
            {
                colorway_id: 0,
                id: 1,
                label: null,
                url: "https://images4-g.ravelrycache.com/uploads/redheartyarns/797884997/upload",
                yarn_id: 1,
            },
        ],
        links: [],
        name: "Super Saver Solids",
        texture: "Cabled",
        weight_grams: 198,
        weight_name: "Aran",
        yardage: 364,
    },
    {
        brand: "Caron",
        color_style: "",
        colorways: [],
        discontinued: false,
        fibers: [
            {
                amount: 100,
                id: 2,
                type: "Acrylic",
                yarn_id: 2,
            },
        ],
        gauge: 18,
        id: 2,
        images: [],
        links: [],
        name: "Simply Soft Solids",
        texture: "Plied (3+)",
        weight_grams: 170,
        weight_name: "Aran",
        yardage: 315,
    },
];

describe("Yarn image carousel tests", () => {
    test("Hidden if no images", () => {
        const yarn = yarnArray[1];
        const setYarn = jest.fn();
        renderWithRouter(<YarnImageWrapper yarn={yarn} setYarn={setYarn} />);
        // there should only be the "add an image" button
        expect(screen.getAllByRole("button")).toHaveLength(1);
        const tree = renderer
            .create(routerWrapper(<YarnImageWrapper yarn={yarn} setYarn={setYarn} />))
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
