import React from "react";
import { products } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../redux/cart/cartSlice";

const ListProductsCheckout = () => {
  const cart = useSelector((state) => state.cart.cart);
  
  const cartProductIds = new Set(cart.map(item => item.id));
  const filteredProducts = products.filter(product => cartProductIds.has(product.id));

  const dipatch = useDispatch();
  
  return (
    <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
      {filteredProducts.map((product) => (
        <div key={product.id} className="flex flex-col rounded-lg bg-white sm:flex-row">
          <img
            className="m-2 h-24 w-28 rounded-md border object-cover object-center"
            src={product.imgURL}
            alt=""
          />
          <div className="flex w-full flex-col px-4 py-4">
            <span className="font-semibold">
              {product.name}
            </span>
            <span className="float-right text-gray-400">42EU - 8.5US</span>
            <p className="text-lg font-bold">${product.price}</p>
          </div>
          <div>
            <button type="button" onClick={() => dipatch(removeFromCart(product.id))}>
              remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListProductsCheckout;
