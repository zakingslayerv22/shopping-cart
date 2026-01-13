import { Link, useOutletContext } from "react-router";

const Cart = () => {
  const { productsList } = useOutletContext();

  const computeCartTotalPrice = (productsList = []) => {
    return productsList.reduce(
      (total, currentProduct) =>
        total + currentProduct.quantityInCart * currentProduct.price,
      0
    );
  };

  if (!productsList) {
    return (
      <h2>No products in cart yet. Add products to cart first to continue.</h2>
    );
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
            <div key={product.id}>
              <div>
                <img src={product.image} />
              </div>

              <div>
                <p>{product.title}</p>
                <p>{product.description}</p>
              </div>

              <p>${product.price}</p>
              <div>
                <button>+</button>
                <input value={product.quantityInCart} />
                <button>-</button>
              </div>
              <p>${product.quantityInCart * product.price}</p>
              <button>Remove</button>
              <p>Total Price: {computeCartTotalPrice(productsList)}</p>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Cart;
