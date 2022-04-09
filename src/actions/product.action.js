import axios from "../helpers/axios";
import stockAxios from "axios";
import { productConstants } from "./constants";

//geting products belong to a specific category by url slug
export const getProductsBySlug = (slug) => {
  return async (dispatch) => {
    const res = await axios.get(`/products/${slug}`);

    if (res.status === 200) {
      dispatch({
        type: productConstants.GET_PRODUCTS_BY_SLUG_SUCCESS,
        payload: res.data,
      });
    } else {
    }
  };
};

//get details of a single product according to url slug
export const getSpecificProductBySlug = (slug) => {
  return async (dispatch) => {
    const res = await axios.get(`/products/product/${slug}`);

    dispatch({ type: productConstants.GET_SPECIFIC_PRODUCT_BY_SLUG_REQUEST });

    if (res.status === 200) {
      dispatch({
        type: productConstants.GET_SPECIFIC_PRODUCT_BY_SLUG_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: productConstants.GET_SPECIFIC_PRODUCT_BY_SLUG_FAILURE,
        payload: res.data.error,
      });
    }
  };
};

export const getProductsNew = () => {
  return async (dispatch) => {
    const res = await axios.get(`/getAllMenuItems`);
    //const res = await stockAxios.get(`products.json`);

    if (res.status === 200) {
      const productsList = {
        products: res.data,
      };
      console.log(productsList);

      dispatch({
        type: productConstants.GET_PRODUCTS_BY_SLUG_SUCCESS,
        payload: productsList,
      });
    } else {
      console.log("error");
    }
  };
};

export const getMenuIngredientsByProductId = (id) => {
  return async (dispatch) => {
    const res = await axios.get(`/getMenuIngredientsByMenuId`, {
      params: { productId: id },
    });

    if (res.status === 200) {
      dispatch({
        type: productConstants.GET_MENU_INGREDIENTS_BY_PRODUCT_ID_SUCCESS,
        payload: res.data,
      });
      return res.data;
    } else {
      console.log("error");
    }
  };
};

export const getAllSections = () => {
  return async (dispatch) => {
    const res = await axios.get(`/getAllSections`);

    if (res.status === 200) {
      dispatch({
        type: productConstants.GET_ALL_SECTIONS_SUCCESS,
        payload: res.data,
      });
      console.log(res.data);
      return res.data;
    } else {
      console.log("error");
    }
  };
};

export const getDishesBySection = (section) => {
  return async (dispatch) => {
    const res = await axios.get(`/getDishesBySection`, {
      params: { section: section },
    });

    if (res.status === 200) {
      dispatch({
        type: productConstants.GET_DISHES_BY_SECTION_SUCCESS,
        payload: res.data,
      });
      //console.log(res.data);
      return res.data;
    } else {
      console.log("error");
    }
  };
};
