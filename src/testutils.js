import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

const renderWithRouter = (ui) => {
    return render(ui, { wrapper: MemoryRouter });
};

export { renderWithRouter };
