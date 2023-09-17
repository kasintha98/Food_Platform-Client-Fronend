import axios from "../helpers/axios";
import {
  authConstants,
  cartConstants,
  userConstants,
  deliveryTypeConstants,
  taxConstants,
  deliPriceConstants,
} from "./constants";
import { toast } from "react-toastify";
import axiosnew from "axios";
import { GetAddress } from "./user.action";
import { getProductsNew, getAllSections } from "./product.action";

export const login = (user) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST });

    try {
      //post request from front end to signin with the data from frontend
      const res = await axios.post(`/signin`, {
        ...user,
      });

      //if respond is 200 (user successfully login)
      if (res.status === 200) {
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({
          type: authConstants.LOGIN_SUCCESS,
          payload: {
            token,
            user,
            errormsg: "",
          },
        });

        toast.success("Login Success!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      if (res.status === 202) {
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: { errormsg: res.data.errormsg },
        });

        toast.error(res.data.errormsg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addAddressSign = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/user/address/create", { payload });
      dispatch({ type: userConstants.ADD_USER_ADDRESS_REQUEST });

      if (res.status === 201) {
        console.log(res);
        const {
          addressNew: { addressNew },
        } = res.data;
        dispatch({
          type: userConstants.ADD_USER_ADDRESS_SUCCESS,
          payload: { addressNew },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.ADD_USER_ADDRESS_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const signup = (mobileNumber) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstants.SIGNUP_REQUEST });
      const res = await axios.get("/customer/register", {
        params: { mobno: mobileNumber },
      });
      console.log(res);

      if (res.data) {
        console.log(res);

        dispatch({ type: authConstants.SIGNUP_SUCCESS, payload: res.data });

        const { id, mobileNumber, firstName, lastName, emailId } = res.data;

        console.log(res.data);

        dispatch(GetAddress(mobileNumber));

        const user = {
          id,
          mobileNumber,
          firstName,
          lastName,
          emailId,
        };

        const delLoc = localStorage.getItem("deliveryType");

        localStorage.clear();

        localStorage.setItem("deliveryType", delLoc);
        localStorage.setItem("userId", null);
        localStorage.setItem("userMobileNumber", null);
        localStorage.setItem("userFistName", null);
        localStorage.setItem("userLastName", null);
        localStorage.setItem("userEmail", null);

        localStorage.setItem("userId", id);
        localStorage.setItem("userMobileNumber", mobileNumber);
        localStorage.setItem("userFistName", firstName);
        localStorage.setItem("userLastName", lastName);
        localStorage.setItem("userEmail", emailId);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("log", new Date());
        // dispatch({
        //   type: authConstants.LOGIN_SUCCESS,
        //   payload: {
        //     id
        //   },
        // });

        toast.success("Signup Success!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return res;
      } else {
        dispatch({
          type: authConstants.SIGNUP_FAILURE,
          payload: { errormsg: res.data.errormsg },
        });
        toast.error(res.data.errormsg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

//if user is logged in then stop user going again to /signin
export const isUserLoggedIn = () => {
  return async (dispatch) => {
    try {
      //const token = localStorage.getItem("token");
      const userMobileNumber = localStorage.getItem("userMobileNumber");
      const logTime = localStorage.getItem("log");

      if (
        logTime &&
        new Date().getTime() > new Date(logTime).getTime() + 7200000
      ) {
        localStorage.clear();
        window.location.reload();
      } else {
        if (userMobileNumber) {
          const user = JSON.parse(localStorage.getItem("user"));
          /* dispatch({
          type: authConstants.LOGIN_SUCCESS,
          payload: {
            token,
            user,
          },
        }); */

          dispatch({ type: authConstants.SIGNUP_SUCCESS, payload: user });
        } else {
          dispatch({
            type: authConstants.LOGIN_FAILURE,
            payload: { error: "Failed to login (2)!" },
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const signout = () => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGOUT_REQUEST });

    localStorage.clear();

    dispatch({ type: authConstants.LOGOUT_SUCCESS });
    dispatch({ type: cartConstants.RESET_CART, payload: { cartItems: {} } });
  };
};

export const setDeliveryType = (delObj) => {
  return async (dispatch) => {
    try {
      localStorage.setItem("deliveryType", JSON.stringify(delObj));
      dispatch({
        type: deliveryTypeConstants.SET_DELIVERY_TYPE_SUCCESS,
        payload: delObj,
      });
      if (delObj) {
        dispatch(GetTaxDetails(delObj.restaurantId, delObj.storeId));
        dispatch(GetDeliveryPrice(delObj.restaurantId, delObj.storeId));
        dispatch(getAllSections());
        dispatch(getProductsNew());
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const GetTaxDetails = (restaurantId, storeId) => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/getTaxDetailsByRestroAndStore", {
        params: { restaurantId: restaurantId, storeId: storeId },
      });
      dispatch({ type: taxConstants.GET_TAX_REQUEST });

      if (res.status === 200) {
        console.log(res);
        dispatch({
          type: taxConstants.GET_TAX_SUCCESS,
          payload: res.data,
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: taxConstants.GET_TAX_FAILURE,
          payload: { error },
        });
        toast.error("There was an error when getting data!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const GetDeliveryPrice = (restaurantId, storeId) => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/getDeliveryConfigByCriteria", {
        params: {
          restaurantId: restaurantId,
          storeId: storeId,
          criteria: "AMOUNT",
        },
      });
      dispatch({ type: deliPriceConstants.GET_DELIVERY_PRICE_REQUEST });

      if (res.status === 200) {
        console.log(res);
        dispatch({
          type: deliPriceConstants.GET_DELIVERY_PRICE_SUCCESS,
          payload: res.data,
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: deliPriceConstants.GET_DELIVERY_PRICE_FAILURE,
          payload: { error },
        });
        toast.error("There was an error when getting data!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getVersion = (restId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstants.GET_VERSION_REQUEST });

      const res = await axios.get('/getAppDetails?restaurantId='+restId+'&storeId=ALL');

      if (res.status === 200 && res.data) {
        dispatch({
          type: authConstants.GET_VERSION_SUCCESS,
          payload: res.data[0],
        });
      } else {
        dispatch({
          type: authConstants.GET_VERSION_FAILURE,
          payload: null,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
