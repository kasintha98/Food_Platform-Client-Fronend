import {
  cartConstants,
  userConstants,
  userDetailsConstants,
  userAddressConstants,
  orderConstantsNew,
  orderStatusConstantsNew,
  authConstants,
} from "./constants";
import { resetCart } from "./cart.action";
import axios from "../helpers/axios";
import { toast } from "react-toastify";

//action to get addresses of user
export const getAddress = () => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/user/getaddress");
      dispatch({ type: userConstants.GET_USER_ADDRESS_REQUEST });
      if (res.status === 200) {
        const {
          userAddress: { addressNew },
        } = res.data;
        dispatch({
          type: userConstants.GET_USER_ADDRESS_SUCCESS,
          payload: { addressNew },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.GET_USER_ADDRESS_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

//action to add a new address
export const addAddress = (payload) => {
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

//action to get users cart items
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

//action to add new order
export const addOrder = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/addOrder", payload);
      dispatch({ type: userConstants.ADD_USER_ORDER_REQUEST });

      if (res.status === 201) {
        console.log(res);
        dispatch({
          type: cartConstants.RESET_CART,
          payload: { cartItems: {} },
        });
        dispatch(getCartItems());
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.ADD_USER_ORDER_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

//action to get all user's orders
export const getOrders = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/getOrders");
      dispatch({ type: userConstants.GET_USER_ORDER_REQUEST });

      if (res.status === 200) {
        console.log(res);
        const { orders } = res.data;
        dispatch({
          type: userConstants.GET_USER_ORDER_SUCCESS,
          payload: { orders },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.GET_USER_ORDER_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

//getting details of a single order with full info and delivery location
export const getOrder = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/getOrder", payload);
      dispatch({ type: userConstants.GET_USER_ORDER_DETAILS_REQUEST });
      if (res.status === 200) {
        console.log(res);
        const { order } = res.data;
        dispatch({
          type: userConstants.GET_USER_ORDER_DETAILS_SUCCESS,
          payload: { order },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.GET_USER_ORDER_DETAILS_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

//action to update user details
export const UpdateUserDetails = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.put("/customer/update", payload);

      if (res.status === 200) {
        const { id, firstName, lastName, emailId, mobileNumber } = res.data;
        const userResp = { id, firstName, lastName, emailId, mobileNumber };

        dispatch({
          type: userDetailsConstants.UPDATE_USER_DETAILS_SUCCESS,
          payload: userResp,
        });
        console.log(res);

        localStorage.setItem("user", JSON.stringify(userResp));
        localStorage.setItem("userFistName", firstName);
        localStorage.setItem("userLastName", lastName);
        localStorage.setItem("userEmail", emailId);

        dispatch({ type: authConstants.SIGNUP_SUCCESS, payload: res.data });
        toast.success("Details updated successfully!");
        return res.data;
      } else {
        const { error } = res.data;
        dispatch({
          type: userDetailsConstants.UPDATE_USER_DETAILS_FAILURE,
          payload: { error },
        });

        toast.error("There was an error please try again!");
      }
    } catch (error) {
      console.log(error);
      toast.error("There was an error please try again!");
    }
  };
};

//action to add address
export const AddAddress = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/saveCustomerDtls", payload);

      if (res.status === 200) {
        dispatch(GetAddress(payload.mobileNumber));
        dispatch({
          type: userAddressConstants.ADD_USER_ADDRESS_SUCCESS,
          payload,
        });
        console.log(res);
        return res;
      } else {
        const { error } = res.data;
        dispatch({
          type: userAddressConstants.ADD_USER_ADDRESS_FAILURE,
          payload: { error },
        });

        toast.error("There was an error adding new address!");
      }
    } catch (error) {
      console.log(error);
      toast.error("There was an error adding new address!");
    }
  };
};

//delete address
export const DeleteAddress = (mobno, addrType) => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/deleteAddressByDeliveryType", {
        params: {
          mobno: mobno,
          addrType: addrType,
        },
      });

      if (res.status === 200) {
        dispatch(GetAddress(mobno));
        dispatch({
          type: userAddressConstants.DELETE_USER_ADDRESS_SUCCESS,
          res,
        });
        toast.success("Successfully Deleted!");
        console.log(res);
      } else {
        const { error } = res.data;
        console.log(error);

        toast.error("There was an error when deleting address!");
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
};

//action to get address
export const GetAddress = (mobileNumber) => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/getCustomerAddressDtlsByMobNum", {
        params: { mobno: mobileNumber },
      });
      dispatch({ type: userAddressConstants.GET_USER_ADDRESSS_REQUEST });
      if (res.status === 200) {
        console.log(res);

        const filteredAddresses = res.data.filter(function (el) {
          return el.active === "Y";
        });

        dispatch({
          type: userAddressConstants.GET_USER_ADDRESSS_SUCCESS,
          payload: filteredAddresses,
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: userAddressConstants.GET_USER_ADDRESSS_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

//action to add new order
export const saveNewOrder = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/saveNewOrder", payload);
      dispatch({ type: userConstants.ADD_USER_ORDER_REQUEST });

      if (res.status === 200 && res.data) {
        console.log(res);
        dispatch(resetCart());
        localStorage.removeItem("cart");
        //dispatch(getCartItems());
        toast.success("Order Placed Successfully!");
        return res;
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.ADD_USER_ORDER_FAILURE,
          payload: { error },
        });
        toast.error("There was an error!");
      }
    } catch (error) {
      console.log(error);
      toast.error("There was an error from our end, Please try again!");
    }
  };
};

export const GetUserOrdersNew = (loggedUser, loggedDeliveryType) => {
  return async (dispatch) => {
    try {
      //old API
      /* const res = await axios.get("/getOrderByCustomerId", {
        params: { customerId: userId },
      }); */

      dispatch({ type: orderConstantsNew.GET_USER_ORDERS_REQUEST });

      const res = await axios.get("/getOrderMenuIngredientAddressView", {
        params: {
          restaurantId: loggedDeliveryType.restaurantId,
          storeId: loggedDeliveryType.storeId,
          mobileNumber: loggedUser.mobileNumber,
        },
      });

      if (res.status === 200) {
        console.log(res);
        const sortedList = res.data.sort(function (a, b) {
          var c = new Date(a.updatedDate);
          var d = new Date(b.updatedDate);
          return d - c;
        });
        dispatch({
          type: orderConstantsNew.GET_USER_ORDERS_SUCCESS,
          payload: sortedList,
        });
        return res.data;
      } else {
        const { error } = res.data;
        dispatch({
          type: orderConstantsNew.GET_USER_ORDERS_FAILURE,
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

export const GetOrderProcessStatus = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/getOrderProcessingDetailsByOrderId", {
        params: { orderId: id },
      });
      dispatch({ type: orderStatusConstantsNew.GET_ORDER_STATUS_REQUEST });

      if (res.status === 200) {
        console.log(res);
        dispatch({
          type: orderStatusConstantsNew.GET_ORDER_STATUS_SUCCESS,
          payload: res.data,
        });

        if (res.data && res.data.length < 1) {
          toast.error("No details found! Please enter a correct ID!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }

        return res.data;
      } else {
        const { error } = res.data;
        dispatch({
          type: orderStatusConstantsNew.GET_ORDER_STATUS_FAILURE,
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

export const GetOrderProcessStatus2 = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/getOrderProcessingDetailsByOrderId", {
        params: { orderId: id },
      });
      dispatch({ type: orderStatusConstantsNew.GET_ORDER_STATUS_REQUEST });

      if (res.status === 200) {
        console.log(res);
        dispatch({
          type: orderStatusConstantsNew.GET_ORDER_STATUS_SUCCESS,
          payload: res.data,
        });
        return res.data;
      } else {
        const { error } = res.data;
        dispatch({
          type: orderStatusConstantsNew.GET_ORDER_STATUS_FAILURE,
          payload: { error },
        });
        toast.error("There was an error when getting order status data!", {
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

export const validateCoupon = (couponCode) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/validateCoupon", null, {
        params: { couponCode },
      });
      dispatch({ type: userConstants.VALIDATE_COUPON_REQUEST });

      if (res.status === 200 && res.data) {
        if (res.data.validationResult === "VALID_COUPON") {
          dispatch({
            type: userConstants.VALIDATE_COUPON_SUCCESS,
            payload: res.data,
          });
          toast.success("Coupon applied successfully!");
          return res.data;
        } else {
          dispatch({
            type: userConstants.VALIDATE_COUPON_FAILURE,
            payload: null,
          });
          toast.error("Coupon not valid!");
        }
      } else {
        dispatch({
          type: userConstants.VALIDATE_COUPON_FAILURE,
          payload: null,
        });
        toast.error("There was an error!");
      }
    } catch (error) {
      dispatch({
        type: userConstants.VALIDATE_COUPON_FAILURE,
        payload: null,
      });
      toast.error("There was an error from our end, Please try again!");
    }
  };
};

export const clearCoupon = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.CLEAR_COUPON_SUCCESS });
    } catch (error) {
      dispatch({
        type: userConstants.CLEAR_COUPON_FAILURE,
      });
    }
  };
};

export const getBusinessDate = (restaurantId, storeId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.GET_BUSINESS_DATE_REQUEST });

      const res = await axios.get("/getBusinessDateByRestroAndStore", {
        params: { restaurantId, storeId },
      });

      if (res.status === 200 && res.data) {
        dispatch({
          type: userConstants.GET_BUSINESS_DATE_SUCCESS,
          payload: res.data,
        });
        // toast.success("Business date fetched successfully!");
        return res.data;
      } else {
        dispatch({
          type: userConstants.GET_BUSINESS_DATE_FAILURE,
          payload: null,
        });
        // toast.error("There was an error getting business date!");
      }
    } catch (error) {
      dispatch({
        type: userConstants.GET_BUSINESS_DATE_FAILURE,
        payload: null,
      });
      //toast.error("There was an error getting business date!");
    }
  };
};
