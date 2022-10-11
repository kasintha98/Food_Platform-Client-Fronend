import {
  userConstants,
  userAddressConstants,
  orderStatusConstantsNew,
  orderConstantsNew,
} from "../actions/constants";

const initState = {
  addressNew: [],
  orders: [],
  userOrders: [],
  error: null,
  loading: false,
  orderFetching: false,
  message: "",
  allAddresses: [],
  orderStatus: [],
  coupon: null,
  businessDate: null,
  payUURL: null,
  payUMerchantID: null,
  payUSalt: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case userConstants.GET_USER_ADDRESS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;

    case userConstants.GET_USER_ADDRESS_SUCCESS:
      state = {
        ...state,
        addressNew: action.payload.addressNew,
        loading: false,
      };
      break;

    case userConstants.GET_USER_ADDRESS_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;

    case userConstants.ADD_USER_ADDRESS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;

    case userConstants.ADD_USER_ADDRESS_SUCCESS:
      state = {
        ...state,
        addressNew: action.payload.addressNew,
        loading: false,
      };
      break;

    case userConstants.ADD_USER_ADDRESS_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;

    case userConstants.ADD_USER_ORDER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;

    case userConstants.ADD_USER_ORDER_SUCCESS:
      state = {
        ...state,
        payload: action.payload,
        loading: false,
      };
      break;

    case userConstants.ADD_USER_ORDER_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;

    case userConstants.GET_USER_ORDER_REQUEST:
      state = {
        ...state,
        orderFetching: true,
      };
      break;

    case userConstants.GET_USER_ORDER_SUCCESS:
      state = {
        ...state,
        orders: action.payload.orders,

        orderFetching: false,
      };
      break;

    case userConstants.GET_USER_ORDER_FAILURE:
      state = {
        ...state,
        orderFetching: false,
        error: action.payload.error,
      };
      break;

    //address reducers
    case userConstants.GET_USER_ORDER_DETAILS_REQUEST:
      break;

    case userConstants.GET_USER_ORDER_DETAILS_SUCCESS:
      state = {
        ...state,
        allAddress: action.payload.addresses,
      };
      break;

    case userConstants.GET_USER_ORDER_DETAILS_FAILURE:
      break;

    case userAddressConstants.GET_USER_ADDRESSS_REQUEST:
      break;

    case userAddressConstants.GET_USER_ADDRESSS_SUCCESS:
      state = {
        ...state,
        allAddresses: action.payload,
      };
      break;

    case userAddressConstants.ADD_USER_ADDRESS_SUCCESS:
      const newAllAdd = state.allAddresses.push(action.payload);
      state = {
        ...state,
        allAddresses: newAllAdd,
      };
      break;

    case userAddressConstants.GET_USER_ADDRESSS_FAILURE:
      break;

    case userAddressConstants.DELETE_USER_ADDRESS_SUCCESS:
      break;

    case orderConstantsNew.GET_USER_ORDERS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;

    case orderConstantsNew.GET_USER_ORDERS_SUCCESS:
      state = {
        ...state,
        userOrders: action.payload,
        loading: false,
      };
      break;

    case orderConstantsNew.GET_USER_ORDERS_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;

    case orderStatusConstantsNew.GET_ORDER_STATUS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;

    case orderStatusConstantsNew.GET_ORDER_STATUS_SUCCESS:
      state = {
        ...state,
        orderStatus: action.payload,
        loading: false,
      };
      break;

    case orderStatusConstantsNew.GET_ORDER_STATUS_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;

    case userConstants.VALIDATE_COUPON_REQUEST:
      state = {
        ...state,
      };
      break;

    case userConstants.VALIDATE_COUPON_SUCCESS:
      state = {
        ...state,
        coupon: action.payload,
      };
      break;

    case userConstants.VALIDATE_COUPON_FAILURE:
      state = {
        ...state,
        coupon: null,
      };
      break;

    case userConstants.CLEAR_COUPON_SUCCESS:
      state = {
        ...state,
        coupon: null,
      };
      break;

    case userConstants.GET_BUSINESS_DATE_REQUEST:
      state = {
        ...state,
      };
      break;

    case userConstants.GET_BUSINESS_DATE_SUCCESS:
      state = {
        ...state,
        businessDate: action.payload,
      };
      break;

    case userConstants.GET_BUSINESS_DATE_FAILURE:
      state = {
        ...state,
        businessDate: null,
      };
      break;

    case userConstants.GET_PAYU_URL_REQUEST:
      state = {
        ...state,
      };
      break;

    case userConstants.GET_PAYU_URL_SUCCESS:
      state = {
        ...state,
        payUURL: action.payload,
      };
      break;

    case userConstants.GET_PAYU_URL_FAILURE:
      state = {
        ...state,
        payUURL: null,
      };
      break;

    case userConstants.GET_PAYU_MERCHANT_ID_REQUEST:
      state = {
        ...state,
      };
      break;

    case userConstants.GET_PAYU_MERCHANT_ID_SUCCESS:
      state = {
        ...state,
        payUMerchantID: action.payload,
      };
      break;

    case userConstants.GET_PAYU_MERCHANT_ID_FAILURE:
      state = {
        ...state,
        payUMerchantID: null,
      };
      break;

    case userConstants.GET_PAYU_SALT_REQUEST:
      state = {
        ...state,
      };
      break;

    case userConstants.GET_PAYU_SALT_SUCCESS:
      state = {
        ...state,
        payUSalt: action.payload,
      };
      break;

    case userConstants.GET_PAYU_SALT_FAILURE:
      state = {
        ...state,
        payUSalt: null,
      };
      break;
  }
  return state;
};
