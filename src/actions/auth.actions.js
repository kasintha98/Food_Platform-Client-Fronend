import axios from "../helpers/axios";
import { authConstants, cartConstants, userConstants } from "./constants";
import { toast } from "react-toastify";
import axiosnew from "axios";

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
      const res = await axios.get("/customer/register", { params: { mobno: mobileNumber } });
      console.log(res);

      if (res.data) {
        console.log(res);
        dispatch({ type: authConstants.SIGNUP_SUCCESS });
        const { id, mobileNumber, firstName, lastName, emailId } = res.data;

        localStorage.clear();
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

// export const signup = (user) => {
//   return async (dispatch) => {
//     try {
//       dispatch({ type: authConstants.SIGNUP_REQUEST });
//       console.log(user);
//       const res = await axios.post("/signup", user);

//       const { address } = user;

//       if (res.status === 201) {
//         dispatch({ type: authConstants.SIGNUP_SUCCESS });

//         const { token, user } = res.data;
//         localStorage.setItem("token", token);
//         localStorage.setItem("user", JSON.stringify(user));
//         dispatch({
//           type: authConstants.LOGIN_SUCCESS,
//           payload: {
//             token,
//             user,
//           },
//         });

//         const signAdd = {
//           addressNew: {
//             addressNew: address,
//           },
//         };

//         dispatch(addAddressSign(signAdd));

//         toast.success("Signup Success!", {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//         });
//       } else {
//         dispatch({
//           type: authConstants.SIGNUP_FAILURE,
//           payload: { errormsg: res.data.errormsg },
//         });
//         toast.error(res.data.errormsg, {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//         });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

//if user is logged in then stop user going again to /signin
export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: "Failed to login (2)!" },
      });
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
