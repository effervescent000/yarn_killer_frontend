import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AccountStatusWrapper from "./account-status";
import { wrapWithBrowserRouter, wrapWithUserContext } from "../../testutils";

describe("Basic rendering", () => {
    test("Renders while logged out", () => {
        render(wrapWithBrowserRouter(wrapWithUserContext(<AccountStatusWrapper />)));
        expect(screen.getByText("Sign up")).toBeInTheDocument();
        expect(screen.queryByText("Log out")).toBeNull();
    });
    test("Renders while logged in", () => {
        render(
            wrapWithBrowserRouter(
                wrapWithUserContext(<AccountStatusWrapper />, {
                    user: { id: 1, username: "Admin", role: "admin" },
                    loggedIn: true,
                })
            )
        );
        expect(screen.getByText(/Hi\,/)).toBeInTheDocument();
        expect(screen.queryByText("Sign up")).toBeNull();
    });
});
