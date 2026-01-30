import { Link, useOutletContext } from "react-router";
import styles from "./Cart.module.css";

const Cart = () => {
  const { productsList, handleQuantityChange, updateCartQuantity } =
    useOutletContext();

  const computeCartTotalPrice = (productsList) => {
    return (productsList ?? []).reduce(
      (total, currentProduct) =>
        total + currentProduct.quantityInCart * currentProduct.price,
      0
    );
  };

  if (!computeCartTotalPrice(productsList)) {
    return <h3>No products in cart yet. Add products to cart to continue.</h3>;
  }

  return (
    <div>
      {console.log(productsList)}
      <h3>Hello, I am Cart. You can add things to the cart!</h3>
      <Link to="/">Back Home</Link>
      <section>
        {productsList.map((product) => {
          if (!product.quantityInCart) return;

          return (
            <div key={product.id} className={styles.productContainer}>
              <div>
                <img
                  src={product.images[0]}
                  className={styles.productImage}
                  alt={product.title}
                />
              </div>

              <div>
                <p>{product.title}</p>
                <p>{product.description}</p>
              </div>

              <p>${product.price}</p>
              <div>
                <button
                  onClick={() =>
                    handleQuantityChange(
                      product.id,
                      "increment",
                      "quantityInCart"
                    )
                  }
                >
                  +
                </button>
                <p>{product.quantityInCart}</p>

                <button
                  onClick={() =>
                    handleQuantityChange(
                      product.id,
                      "decrement",
                      "quantityInCart"
                    )
                  }
                >
                  -
                </button>
              </div>
              <p>${product.quantityInCart * product.price}</p>
              <button onClick={() => updateCartQuantity(product.id, "remove")}>
                Remove
              </button>
            </div>
          );
        })}
        <p>Total Price: {computeCartTotalPrice(productsList)}</p>
      </section>
      <button>Proceed to checkout</button>
    </div>
  );
};

export default Cart;
