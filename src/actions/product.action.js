import axios from "../helpers/axios";
import stockAxios from "axios";
import { productConstants } from "./constants";

const pizzaSort = [
  "Taste of India",
  "Simply Veg 2",
  "Simply Veg 3",
  "Simply Veg 1",
  "Simply Veg",
  "Combo",
];

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
    try {
      const delLoc = localStorage.getItem("deliveryType");
      let res = {};
      if (delLoc) {
        const delObj = JSON.parse(delLoc);
        res = await axios.get(`/getMenuItemsByRestroAndStore`, {
          params: {
            restaurantId: delObj.restaurantId,
            storeId: delObj.storeId,
          },
        });
      } else {
        res = await axios.get(`/getAllMenuItems`);
      }

      if (res && res.status === 200) {
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
    } catch (error) {
      console.log(error);
    }
  };
};

export const getProductById = (restaurantId,storeId,productId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: productConstants.GET_PRODUCTS_BY_ID_REQUEST });

      const res = await axios.get("/getProductById", {
        params: { restaurantId: restaurantId,
            storeId: storeId,
            productId: productId },
      });

      if (res.status === 200 && res.data) {
        dispatch({
          type: productConstants.GET_PRODUCTS_BY_ID_SUCCESS,
          payload: res.data,
        });

        return res.data;
      } else {
        dispatch({
          type: productConstants.GET_PRODUCTS_BY_ID_FAILURE,
          payload: null,
        });
      }
    } catch (error) {
      dispatch({
        type: productConstants.GET_PRODUCTS_BY_ID_FAILURE,
        payload: null,
      });
    }
  };
};

// export const getProductById1 = (restaurantId,storeId,productId) => {
//   return async (dispatch) => {
//     try {
//       let res = {};
//         res = await axios.get(`/getProductById`, {
//           params: {
//             restaurantId: restaurantId,
//             storeId: storeId,
//             productId: productId,
//           },
//         });

//       if (res && res.status === 200) {
//         const product = {
//           productById: res.data,
//         };
//         console.log(product);

//         dispatch({
//           type: productConstants.GET_PRODUCTS_BY_ID_SUCCESS,
//           payload: res.data,
//         });
//       } else {
//         console.log("error");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

export const getMenuIngredientsByProductId = (id) => {
  return async (dispatch) => {
    try {
      const delLoc = localStorage.getItem("deliveryType");

      if (delLoc) {
        const delObj = JSON.parse(delLoc);
        const res = await axios.get(`/getMenuIngredientsByMenuId`, {
          params: {
            productId: id,
            restaurantId: delObj.restaurantId,
            storeId: delObj.storeId,
          },
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
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllSections = () => {
  return async (dispatch) => {
    try {
      const delLoc = localStorage.getItem("deliveryType");
      const delObj = JSON.parse(delLoc);

      if (delObj) {
        const res = await axios.get(`/getAllSections`, {
          params: {
            restaurantId: delObj.restaurantId,
            storeId: delObj.storeId,
          },
        });

        if (res && res.status === 200) {
          dispatch({
            type: productConstants.GET_ALL_SECTIONS_SUCCESS,
            payload: res.data,
          });
          console.log(res.data);
          return res.data;
        } else {
          console.log("error");
        }
      } else {
        dispatch({
          type: productConstants.GET_ALL_SECTIONS_FAILURE,
          payload: [],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getDishesBySection = (section) => {
  return async (dispatch) => {
    try {
      const delLoc = localStorage.getItem("deliveryType");
      const delObj = JSON.parse(delLoc);

      const res = await axios.get(`/getDishesBySection`, {
        params: {
          section: section,
          restaurantId: delObj.restaurantId,
          storeId: delObj.storeId,
        },
      });

      if (res.status === 200) {
        const sorted = res.data.sort(
          (a, b) => pizzaSort.indexOf(a) - pizzaSort.indexOf(b)
        );

        dispatch({
          type: productConstants.GET_DISHES_BY_SECTION_SUCCESS,
          payload: sorted,
        });
        //console.log(sorted);
        return sorted;
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
