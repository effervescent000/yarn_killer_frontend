import { MemoryRouter, BrowserRouter } from "react-router-dom";

import { UserContext } from "./user-context";

const wrapWithMemoryRouter = (ui) => {
    return <MemoryRouter>{ui}</MemoryRouter>;
};

const wrapWithBrowserRouter = (ui, { route = "/" } = {}) => {
    window.history.pushState({}, "test", route);
    return <BrowserRouter>{ui}</BrowserRouter>;
};

const wrapWithUserContext = (ui, { user = {}, loggedIn = false } = {}) => {
    return (
        <UserContext.Provider
            value={{ loggedIn, toggleLogIn: jest.fn(), user, setUser: jest.fn() }}
        >
            {ui}
        </UserContext.Provider>
    );
};

const yarnArray = [
    {
        // this one should have 1+ image and 1+ link
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
        links: [
            {
                id: 10,
                url: "www.michaels.com/aegjnakg",
                store_id: 5,
                yarn_id: 1,
                current_price: null,
                price_updated: null,
                store: "Michael's",
            },
        ],
        name: "Super Saver Solids",
        texture: "Cabled",
        weight_grams: 198,
        weight_name: "Aran",
        yardage: 364,
    },
    {
        // this one should have no images
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

export { wrapWithMemoryRouter, yarnArray, wrapWithBrowserRouter, wrapWithUserContext };
