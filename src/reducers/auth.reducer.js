import {
  authConstants,
  deliveryTypeConstants,
  taxConstants,
  deliPriceConstants,
  userDetailsConstants,
} from "../actions/constants";

//initial state of user object
const initState = {
  token: null,
  user: {
    id: "",
    mobileNumber: "",
    firstName: "",
    lastName: "",
    emailId: "",
  },

  authenticate: false,
  authenticating: false,
  loading: false,
  error: null,
  errormsg: null,
  message: "",
  deliveryType: null,
  taxDetails: null,
  deliveryPrice: null,
};

//check what is the request and returning suitable state for the request
export default (state = initState, action) => {
  console.log(action);

  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true,
        error: null,
        errormsg: null,
      };
      break;
    case authConstants.LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticate: true,
        authenticating: false,
        error: null,
        errormsg: action.payload.errormsg,
      };
      break;
    case authConstants.LOGIN_FAILURE:
      state = {
        ...state,
        authenticate: false,
        authenticating: false,
        error: action.payload.error,
        errormsg: action.payload.errormsg,
        message: action.payload.errormsg,
      };
      break;
    case authConstants.LOGOUT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case authConstants.LOGOUT_SUCCESS:
      state = {
        ...initState,
        loading: false,
      };
      break;
    case authConstants.LOGOUT_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
    case authConstants.SIGNUP_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        errormsg: action.payload.errormsg,
      };
      break;
    case authConstants.SIGNUP_SUCCESS:
      state = {
        ...state,
        user: action.payload,
        authenticate: true,
        authenticating: false,
        error: null,
      };
      break;

    case deliveryTypeConstants.SET_DELIVERY_TYPE_SUCCESS:
      state = {
        ...state,
        deliveryType: action.payload,
      };
      break;

    case taxConstants.GET_TAX_SUCCESS:
      state = {
        ...state,
        taxDetails: action.payload,
      };
      break;

    case deliPriceConstants.GET_DELIVERY_PRICE_SUCCESS:
      state = {
        ...state,
        deliveryPrice: action.payload,
      };
      break;

    case userDetailsConstants.UPDATE_USER_DETAILS_SUCCESS:
      state = {
        ...state,
        user: action.payload,
      };
      break;
  }

  return state;
};
