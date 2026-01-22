import { RouterProvider, createMemoryRouter } from "react-router";
import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import routes from "../../config/routes";

vi.mock("../Shop/Shop", () => ({
  default: () => <div data-testid="ShopMock" />,
}));

vi.mock("../Cart/Cart", () => ({
  default: () => <div data-testid="CartMock" />,
}));

vi.mock("../ErrorPage/ErrorPage", () => ({
  default: () => <div data-testid="ErrorPageMock" />,
}));

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

  it("renders Home as a layout for the Shop page", () => {
    const router = createTestRouter("/shop");

    render(<RouterProvider router={router} />);

    expect(screen.getAllByRole("link")[0].textContent).toMatch(/home/i);
    expect(screen.getByTestId("ShopMock")).toBeInTheDocument();
  });

  it("renders Home as a layout for the Cart page", () => {
    const router = createTestRouter("/cart");

    render(<RouterProvider router={router} />);

    expect(screen.getAllByRole("link")[0].textContent).toMatch(/home/i);
    expect(screen.getByTestId("CartMock")).toBeInTheDocument();
  });

  it("renders the ErrorPage when navigating to a non-existent route", () => {
    const router = createTestRouter("/non-existent-path");

    render(<RouterProvider router={router} />);

    expect(screen.getByTestId("ErrorPageMock")).toBeInTheDocument();
  });

  it("fetches products on mount", async () => {
    const router = createTestRouter();

    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      })
    );

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });
  });
});
