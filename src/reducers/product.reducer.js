import { productConstants } from "../actions/constants";

const initState = {
  products: [],
  ingredients: [],
  loading: false,
  product: {},
  error: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case productConstants.GET_PRODUCTS_BY_SLUG_SUCCESS:
      state = {
        ...state,
        products: action.payload.products,
      };
      break;
    case productConstants.GET_SPECIFIC_PRODUCT_BY_SLUG_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productConstants.GET_SPECIFIC_PRODUCT_BY_SLUG_SUCCESS:
      state = {
        ...state,
        product: action.payload.product,
        loading: false,
      };
      break;
    case productConstants.GET_SPECIFIC_PRODUCT_BY_SLUG_FAILURE:
      state = {
        ...state,
        product: action.payload.error,
        loading: false,
      };
      break;
    case productConstants.GET_MENU_INGREDIENTS_BY_PRODUCT_ID_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productConstants.GET_MENU_INGREDIENTS_BY_PRODUCT_ID_SUCCESS:
      state = {
        ...state,
        ingredients: action.payload,
        loading: false,
      };
      break;
    case productConstants.GET_MENU_INGREDIENTS_BY_PRODUCT_ID_FAILURE:
      state = {
        ...state,
        ingredients: action.payload.error,
        loading: false,
      };
      break;
  }
  return state;
};
