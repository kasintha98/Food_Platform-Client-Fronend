import axios from "../helpers/axios";
import { activeCSS, activeCSSLogo, allActiveCSS, storeConstants } from "./constants";

// export const getAllStores = () => {
//   return async (dispatch) => {
//     try {
//       const res = await axios.get(`/getAllStores`);

//       if (res && res.status === 200) {
//         const filteredStores = res.data.filter(function (el) {
//           return el.storeActiveFlag === "Y";
//         });

//         dispatch({
//           type: storeConstants.GET_ALL_STORES_SUCCESS,
//           payload: filteredStores,
//         });
//         return res.data;
//       } else {
//         dispatch({
//           type: storeConstants.GET_ALL_STORES_FAILURE,
//           payload: [],
//         });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

export const getAllStores = () => {
  return async (dispatch) => {
    try {
      // const res = await axios.get(`/getAllStores`);
      const res = await axios.get(`/getStoresByRestaurantId`, {
        params: {
          restaurantId: 'R001',
        },
      });

      if (res && res.status === 200) {
        const filteredStores = res.data.filter(function (el) {
          return el.storeActiveFlag === "Y";
        });

        dispatch({
          type: storeConstants.GET_ALL_STORES_SUCCESS,
          payload: filteredStores,
        });
        return res.data;
      } else {
        dispatch({
          type: storeConstants.GET_ALL_STORES_FAILURE,
          payload: [],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllStores2 = (restaurantId) => {
  return async (dispatch) => {
    try {
      // const res = await axios.get(`/getAllStores`);
      const res = await axios.get(`/getStoresByRestaurantId`, {
        params: {
          restaurantId: restaurantId,
        },
      });

      if (res && res.status === 200) {
        const filteredStores = res.data.filter(function (el) {
          return el.storeActiveFlag === "Y";
        });

        dispatch({
          type: storeConstants.GET_ALL_STORES_SUCCESS,
          payload: filteredStores,
        });
        return res.data;
      } else {
        dispatch({
          type: storeConstants.GET_ALL_STORES_FAILURE,
          payload: [],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getActiveCSS = (restaurantId,storeId,category,subCategory) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/getActiveCSS`, {
        params: {
          restaurantId: restaurantId,
          storeId: storeId,
          category: category,
          subCategory: subCategory,
        },
      });

      if (res && res.status === 200) {
        dispatch({
          type: activeCSS.GET_ACTIVE_CSS_SUCCESS,
          payload: res.data,
        });
        console.log(res.data);
        return res.data;
      } else {
        dispatch({
          type: activeCSS.GET_ACTIVE_CSS_FAILURE,
          payload: [],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getActiveCssLogo = (restaurantId,storeId,category,subCategory) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/getActiveCSS`, {
        params: {
          restaurantId: restaurantId,
          storeId: storeId,
          category: category,
          subCategory: subCategory,
        },
      });

      if (res && res.status === 200) {
        dispatch({
          type: activeCSSLogo.GET_ACTIVE_CSS_LOGO_SUCCESS,
          payload: res.data,
        });
        console.log(res.data);
        return res.data;
      } else {
        dispatch({
          type: activeCSSLogo.GET_ACTIVE_CSS_LOGO_FAILURE,
          payload: [],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};


export const getAllActiveCSS = (restaurantId,storeId) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/getActiveCSSByRestoIdAndStoreId`, {
        params: {
          restaurantId: restaurantId,
          storeId: storeId,
        },
      });

      if (res && res.status === 200) {
        dispatch({
          type: allActiveCSS.GET_ALL_ACTIVE_CSS_SUCCESS,
          payload: res.data,
        });
        console.log(res.data);
        return res.data;
      } else {
        dispatch({
          type: allActiveCSS.GET_ALL_ACTIVE_CSS_FAILURE,
          payload: [],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
