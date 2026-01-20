import { RouterProvider, createMemoryRouter } from "react-router";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import routes from "../../config/routes";

const createTestRouter = (path = "/") =>
  createMemoryRouter(routes, { initialEntries: [path] });

describe("Home component and Routing", () => {
  it("renders the primary navigation links", () => {
    const router = createTestRouter();

    render(<RouterProvider router={router} />);

    const links = screen.getAllByRole("link");

    expect(links[0].textContent).toMatch(/home/i);
    expect(links[1].textContent).toMatch(/shop/i);
    expect(links[2].textContent).toMatch(/cart/i);
  });
});
