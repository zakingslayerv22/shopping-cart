import { RouterProvider, createMemoryRouter } from "react-router";
import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import routes from "../../config/routes";

beforeEach(() => {
  const mockProductsList = [
    {
      id: 0,
      title: "Michael Kors Bag",
      price: 72.5,
      images: ["img-src-url"],
      quantitySelected: 0,
      quantityInCart: 0,
    },
  ];

  globalThis.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockProductsList),
    })
  );
});

const createTestRouter = (path = "/") =>
  createMemoryRouter(routes, { initialEntries: [path] });

describe("Shop Component's tests", () => {
  it("shows a loading message while products are fetching", async () => {
    const router = createTestRouter("/shop");

    render(<RouterProvider router={router} />);

    const fetchingMessage = screen.getByText(/fetching/i);

    expect(fetchingMessage).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.getByText(/fetching/i));
  });

  it("shows products and quantity input to 0 by default", async () => {
    const router = createTestRouter("/shop");

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getByText("Michael Kors Bag")).toBeInTheDocument();
      expect(screen.getByText("$72.5")).toBeInTheDocument();
      expect(screen.getByRole("spinbutton")).toHaveValue(0);
    });
  });

  it("increments quantity by one when increment button is clicked", async () => {
    const router = createTestRouter("/shop");

    render(<RouterProvider router={router} />);
    const button = await screen.findByRole("button", { name: "+" });

    await userEvent.click(button);
    await userEvent.click(button);

    expect(screen.getByRole("spinbutton")).toHaveValue(2);
  });

  it("decrements quantity by one when decrement button is clicked", async () => {
    const router = createTestRouter("/shop");

    render(<RouterProvider router={router} />);
    const incrementButton = await screen.findByRole("button", { name: "+" });
    const decrementButton = await screen.findByRole("button", { name: "-" });

    await userEvent.click(incrementButton);
    await userEvent.click(incrementButton);

    await userEvent.click(decrementButton);

    expect(screen.getByRole("spinbutton")).toHaveValue(1);
  });

  it("keeps quantity at zero when decrement is clicked at zero", async () => {
    const router = createTestRouter("/shop");

    render(<RouterProvider router={router} />);

    const decrementButton = await screen.findByRole("button", { name: "-" });

    await userEvent.click(decrementButton);

    expect(screen.getByRole("spinbutton")).toHaveValue(0);
  });

  it("users can manually change quantity by typing into the input", async () => {
    const router = createTestRouter("/shop");

    render(<RouterProvider router={router} />);

    const input = await screen.findByRole("spinbutton");

    await userEvent.type(input, "4");

    expect(input).toHaveValue(4);
  });

  it("updates the quantity when the user types a value and clicks increment", async () => {
    const router = createTestRouter("/shop");

    render(<RouterProvider router={router} />);

    const input = await screen.findByRole("spinbutton");
    const incrementButton = await screen.findByRole("button", { name: "+" });

    await userEvent.type(input, "4");
    await userEvent.click(incrementButton);
    await userEvent.click(incrementButton);

    expect(input).toHaveValue(6);
  });

  it("updates the quantity when the user types a value and clicks decrement", async () => {
    const router = createTestRouter("/shop");

    render(<RouterProvider router={router} />);

    const input = await screen.findByRole("spinbutton");
    const decrementButton = await screen.findByRole("button", { name: "-" });

    await userEvent.type(input, "4");
    await userEvent.click(decrementButton);
    await userEvent.click(decrementButton);

    expect(input.value).toEqual("2");
  });

  it("adds the selected quantity to the cart and resets the input", async () => {
    const router = createTestRouter("/shop");

    render(<RouterProvider router={router} />);

    const input = await screen.findByRole("spinbutton");
    const addToCartButton = await screen.findByRole("button", { name: "Cart" });

    await userEvent.type(input, "4");
    await userEvent.click(addToCartButton);
    const updatedCartLink = await screen.findByRole("link", {
      name: /cart \(4 items\)/i,
    });

    expect(updatedCartLink).toBeInTheDocument();
    expect(input).toHaveValue(0);
  });
});
