import React from "react";
import { cartConstants } from "./constants";
import store from "../store";
import axios from "../helpers/axios";

//action to get cart items from database
const getCartItems = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
      const res = await axios.post("/user/getCartItems");
      if (res.status === 200) {
        const { cartItems } = res.data;
        console.log({ getCartItems: cartItems });
        if (cartItems) {
          dispatch({
            type: cartConstants.ADD_TO_CART_SUCCESS,
            payload: { cartItems },
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

//action to add items to cart
export const addToCart = (product, newQty) => {
  return async (dispatch) => {
    const {
      cart: { cartItems },
      auth,
    } = store.getState();

    const qty = cartItems[product._id]
      ? parseInt(cartItems[product._id].qty) + newQty
      : newQty;

    cartItems[product._id] = { ...product, qty };

    if (auth.authenticate) {
      dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
      const payload = {
        cartItems: [
          {
            product: product._id,
            quantity: qty,
          },
        ],
      };
      console.log(payload);
      const res = await axios.post("/user/cart/addtocart", payload);
      console.log(res);
      if (res.status === 201) {
        dispatch(getCartItems());
      }
    } else {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }

    console.log("addToCart:", cartItems);

    dispatch({
      type: cartConstants.ADD_TO_CART_SUCCESS,
      payload: { cartItems },
    });
  };
};

//action to update cart details
export const updateCart = () => {
  return async (dispatch) => {
    const { auth } = store.getState();

    let cartItems = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : null;

    if (auth.authenticate) {
      localStorage.removeItem("cart");

      if (cartItems) {
        const payload = {
          cartItems: Object.keys(cartItems).map((key, index) => {
            return {
              quantity: cartItems[key].qty,
              product: cartItems[key]._id,
            };
          }),
        };
        if (Object.keys(cartItems).length > 0) {
          const res = await axios.post("/user/cart/addtocart", payload);
          if (res.status === 201) {
            dispatch(getCartItems());
          }
        }
      }
    } else {
      if (cartItems) {
        dispatch({
          type: cartConstants.ADD_TO_CART_SUCCESS,
          payload: { cartItems },
        });
      }
    }
  };
};

//action to remove items from cart
export const removeCartItem = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: cartConstants.REMOVE_CART_ITEM_REQUEST });
      const res = await axios.post("/user/cart/removeItem", { payload });

      if (res.status === 202) {
        dispatch({ type: cartConstants.REMOVE_CART_ITEM_SUCCESS });
        dispatch(getCartItems());
      } else {
        const { error } = res.data;
        dispatch({
          type: cartConstants.REMOVE_CART_ITEM_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

//action to add items to cart
export const addToCartNew = (
  product,
  newQty,
  extra,
  extraSubTotal,
  specialText,
  choiceIng
) => {
  return async (dispatch) => {
    const {
      cart: { cartItems },
      auth,
    } = store.getState();

    if (product) {
      const qty = cartItems[product.productId]
        ? parseInt(cartItems[product.productId].qty) + newQty
        : newQty;

      const extraTotal = extraSubTotal
        ? extraSubTotal
        : cartItems[product.productId]?.extraSubTotal
        ? cartItems[product.productId]?.extraSubTotal
        : 0;

      const extraItems = extra
        ? extra
        : cartItems[product.productId]?.extra
        ? cartItems[product.productId]?.extra
        : {};

      let text = "";

      if (specialText) {
        text = specialText;
      } else if (cartItems[product.productId]?.specialText) {
        text = cartItems[product.productId]?.specialText;
      } else {
        text = "";
      }

      let choice = {};

      if (choiceIng) {
        choice = choiceIng;
      } else if (cartItems[product.productId]?.choiceIng) {
        choice = cartItems[product.productId]?.choiceIng;
      } else {
        choice = {};
      }

      if (qty < 1) {
        delete cartItems[product.productId];
      } else {
        cartItems[product.productId] = {
          ...product,
          qty,
          extra: extraItems,
          extraSubTotal: extraTotal,
          specialText: text,
          choiceIng: choice,
        };
      }

      if (auth.authenticate) {
        dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
        const payload = {
          cartItems: [
            {
              product: product.productId,
              quantity: qty,
            },
          ],
        };
        console.log(payload);
        const res = await axios.post("/user/cart/addtocart", payload);
        console.log(res);
        if (res.status === 201) {
          dispatch(getCartItems());
        }
      } else {
        localStorage.setItem("cart", JSON.stringify(cartItems));
      }

      console.log("addToCart:", cartItems);

      dispatch({
        type: cartConstants.ADD_TO_CART_SUCCESS,
        payload: { cartItems },
      });
    }
  };
};

export const replaceCartItemNew = (newProduct, oldId) => {
  return async (dispatch) => {
    const {
      cart: { cartItems },
      auth,
    } = store.getState();
    if (cartItems[oldId]) {
      delete Object.assign(cartItems, {
        [newProduct.productId]: cartItems[oldId],
      })[oldId];
      const qty = cartItems[newProduct.productId].qty;
      const text = cartItems[newProduct.productId].specialText
        ? cartItems[newProduct.productId].specialText
        : "";

      cartItems[newProduct.productId] = {
        ...newProduct,
        qty,
        specialText: text,
      };

      if (auth.authenticate) {
        dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
        const payload = {
          cartItems: [
            {
              product: newProduct.productId,
            },
          ],
        };
        console.log(payload);
        const res = await axios.post("/user/cart/addtocart", payload);
        console.log(res);
        if (res.status === 201) {
          dispatch(getCartItems());
        }
      } else {
        localStorage.setItem("cart", JSON.stringify(cartItems));
      }

      console.log("addToCart:", cartItems);

      dispatch({
        type: cartConstants.ADD_TO_CART_SUCCESS,
        payload: { cartItems },
      });
    }
  };
};

export { getCartItems };
