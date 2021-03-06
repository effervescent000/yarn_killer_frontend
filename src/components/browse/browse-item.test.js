import renderer from "react-test-renderer";

import BrowseItem from "./browse-item";
import { wrapWithMemoryRouter, yarnArray } from "../../testutils";

describe("BrowseItem tests", () => {
    test("Renders with image", () => {
        const yarn = yarnArray[0];
        const tree = renderer.create(wrapWithMemoryRouter(<BrowseItem yarn={yarn} />)).toJSON();
        expect(tree).toMatchSnapshot();
    });
    test("Renders without image", () => {
        const yarn = yarnArray[1];
        const tree = renderer.create(wrapWithMemoryRouter(<BrowseItem yarn={yarn} />)).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
