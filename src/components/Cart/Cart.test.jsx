import { RouterProvider, createMemoryRouter } from "react-router";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import routes from "../../config/routes";

const createTestRouter = (path = "/") =>
  createMemoryRouter(routes, { initialEntries: [path] });

beforeEach(async () => {
  const mockProductsList = [
    {
      id: 0,
      title: "Michael Kors Bag",
      description: "A Premium Bag",
      price: 75.5,
      images: ["img-src-url"],
    },

    {
      id: 1,
      title: "Hermès Birkin Bag",
      description: "A Vintage Bag",
      price: 100.5,
      images: ["img-src-url"],
    },
  ];

  globalThis.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockProductsList),
    })
  );
});

const setupShopWithUserInput = async () => {
  const router = createTestRouter("/shop");
  render(<RouterProvider router={router} />);

  const inputs = await screen.findAllByRole("spinbutton");
  const addButtons = await screen.findAllByRole("button", { name: /cart/i });

  await userEvent.type(inputs[0], "3");
  await userEvent.click(addButtons[0]);

  await userEvent.type(inputs[1], "2");
  await userEvent.click(addButtons[1]);

  await userEvent.click(
    screen.getByRole("link", { name: /cart \(5 items\)/i })
  );
};

describe("Test Cart's functionality", () => {
  it("shows an empty cart message while the cart is empty", async () => {
    const router = createTestRouter("/cart");

    render(<RouterProvider router={router} />);

    expect(await screen.findByText(/no products/i)).toBeInTheDocument();
  });
  it("displays products added to cart with unit total and total price of all products", async () => {
    await setupShopWithUserInput();

    expect(screen.getByText("Michael Kors Bag")).toBeInTheDocument();
    expect(screen.getByText("$226.5")).toBeInTheDocument();

    expect(screen.getByText("Hermès Birkin Bag")).toBeInTheDocument();
    expect(screen.getByText("$201")).toBeInTheDocument();

    expect(screen.getByText("Total Price: $427.5")).toBeInTheDocument();
  });

  it("updates the quantity in cart when the user clicks increment", async () => {
    await setupShopWithUserInput();

    const incrementButtons = await screen.findAllByRole("button", {
      name: "+",
    });
    const firstIncrementButton = incrementButtons[0];

    const paragraphs = await screen.findAllByRole("paragraph");
    const firstUnitSumParagraph = paragraphs[3];

    await userEvent.click(firstIncrementButton);
    await userEvent.click(firstIncrementButton);

    expect(firstUnitSumParagraph.textContent).toBe("5");
    expect(screen.getByText("Total Price: $578.5")).toBeInTheDocument();
  });

  it("updates the quantity in cart when the user clicks decrement", async () => {
    await setupShopWithUserInput();

    const decrementButtons = await screen.findAllByRole("button", {
      name: "-",
    });
    const firstDecrementButton = decrementButtons[0];

    const paragraphs = await screen.findAllByRole("paragraph");
    const firstUnitSumParagraph = paragraphs[3];

    await userEvent.click(firstDecrementButton);
    await userEvent.click(firstDecrementButton);

    expect(firstUnitSumParagraph.textContent).toBe("1");
    expect(screen.getByText("Total Price: $276.5")).toBeInTheDocument();
  });

  it("removes the product from the cart when quantity in cart is 0", async () => {
    await setupShopWithUserInput();

    const decrementButtons = await screen.findAllByRole("button", {
      name: "-",
    });
    const secondDecrementButton = decrementButtons[1];

    await userEvent.click(secondDecrementButton);
    await userEvent.click(secondDecrementButton);

    expect(screen.queryByText("Hermès Birkin Bag")).not.toBeInTheDocument();
  });

  it("removes the product from the cart when the remove button is clicked", async () => {
    await setupShopWithUserInput();

    const removeProductButtons = await screen.findAllByRole("button", {
      name: "Remove",
    });
    const secondRemoveProductButtons = removeProductButtons[1];

    await userEvent.click(secondRemoveProductButtons);

    expect(screen.queryByText("Hermès Birkin Bag")).not.toBeInTheDocument();
  });
});
