import axios from "../helpers/axios";
import { storeConstants } from "./constants";

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
