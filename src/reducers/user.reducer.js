import {
  userConstants,
  userAddressConstants,
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
  }
  return state;
};
