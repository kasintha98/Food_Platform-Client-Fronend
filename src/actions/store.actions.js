import axios from "../helpers/axios";
import { storeConstants } from "./constants";

export const getAllStores = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/getAllStores`);

      if (res.status === 200) {
        dispatch({
          type: storeConstants.GET_ALL_STORES_SUCCESS,
          payload: res.data,
        });
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
