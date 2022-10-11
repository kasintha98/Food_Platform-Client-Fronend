//constants to verify requests

export const categoryConstants = {
  GET_ALL_CATEGORIES_REQUEST: "GET_ALL_CATEGORIES_REQUEST",
  GET_ALL_CATEGORIES_SUCCESS: "GET_ALL_CATEGORIES_SUCCESS",
  GET_ALL_CATEGORIES_FAILURE: "GET_ALL_CATEGORIES_FAILURE",
  ADD_NEW_CATEGORY_REQUEST: "ADD_NEW_CATEGORY_REQUEST",
  ADD_NEW_CATEGORY_SUCCESS: "ADD_NEW_CATEGORY_SUCCESS",
  ADD_NEW_CATEGORY_FAILURE: "ADD_NEW_CATEGORY_FAILURE",
};

export const productConstants = {
  GET_PRODUCTS_BY_SLUG_REQUEST: "GET_PRODUCTS_BY_SLUG_REQUEST",
  GET_PRODUCTS_BY_SLUG_SUCCESS: "GET_PRODUCTS_BY_SLUG_SUCCESS",
  GET_PRODUCTS_BY_SLUG_FAILURE: "GET_PRODUCTS_BY_SLUG_FAILURE",
  ADD_NEW_CATEGORY_REQUEST: "ADD_NEW_CATEGORY_REQUEST",
  ADD_NEW_CATEGORY_SUCCESS: "ADD_NEW_CATEGORY_SUCCESS",
  ADD_NEW_CATEGORY_FAILURE: "ADD_NEW_CATEGORY_FAILURE",
  GET_SPECIFIC_PRODUCT_BY_SLUG_REQUEST: "GET_SPECIFIC_PRODUCT_BY_SLUG_REQUEST",
  GET_SPECIFIC_PRODUCT_BY_SLUG_SUCCESS: "GET_SPECIFIC_PRODUCT_BY_SLUG_SUCCESS",
  GET_MENU_INGREDIENTS_BY_PRODUCT_ID_FAILURE:
    "GET_MENU_INGREDIENTS_BY_PRODUCT_ID_FAILURE",
  GET_MENU_INGREDIENTS_BY_PRODUCT_ID_REQUEST:
    "GET_MENU_INGREDIENTS_BY_PRODUCT_ID_REQUEST",
  GET_MENU_INGREDIENTS_BY_PRODUCT_ID_SUCCESS:
    "GET_MENU_INGREDIENTS_BY_PRODUCT_ID_SUCCESS",
  GET_ALL_SECTIONS_REQUEST: "GET_ALL_SECTIONS_REQUEST",
  GET_ALL_SECTIONS_SUCCESS: "GET_ALL_SECTIONS_SUCCESS",
  GET_ALL_SECTIONS_FAILURE: "GET_ALL_SECTIONS_FAILURE",
  GET_DISHES_BY_SECTION_REQUEST: "GET_DISHES_BY_SECTION_REQUEST",
  GET_DISHES_BY_SECTION_SUCCESS: "GET_DISHES_BY_SECTION_SUCCESS",
  GET_DISHES_BY_SECTION_FAILURE: "GET_DISHES_BY_SECTION_FAILURE",
};

export const authConstants = {
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGIN_FAILURE: "LOGIN_FAILURE",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGOUT_REQUEST: "LOGOUT_REQUEST",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  LOGOUT_FAILURE: "LOGOUT_FAILURE",
  SIGNUP_REQUEST: "SIGNUP_REQUEST",
  SIGNUP_FAILURE: "SIGNUP_FAILURE",
  SIGNUP_SUCCESS: "SIGNUP_SUCCESS",

  GET_VERSION_REQUEST: "GET_VERSION_REQUEST",
  GET_VERSION_SUCCESS: "GET_VERSION_SUCCESS",
  GET_VERSION_FAILURE: "GET_VERSION_FAILURE",
};

export const cartConstants = {
  ADD_TO_CART_REQUEST: "ADD_TO_CART_REQUEST",
  ADD_TO_CART_SUCCESS: "ADD_TO_CART_SUCCESS",
  ADD_TO_CART_FAILURE: "ADD_TO_CART_FAILURE",
  REMOVE_CART_ITEM_REQUEST: "REMOVE_CART_ITEM_REQUEST",
  REMOVE_CART_ITEM_SUCCESS: "REMOVE_CART_ITEM_SUCCESS",
  REMOVE_CART_ITEM_FAILURE: "REMOVE_CART_ITEM_FAILURE",
  RESET_CART: "RESET_CART",
};

export const userConstants = {
  GET_USER_ADDRESS_REQUEST: "GET_USER_ADDRESS_REQUEST",
  GET_USER_ADDRESS_SUCCESS: "GET_USER_ADDRESS_SUCCESS",
  GET_USER_ADDRESS_FAILURE: "GET_USER_ADDRESS_FAILURE",
  ADD_USER_ADDRESS_REQUEST: "ADD_USER_ADDRESS_REQUEST",
  ADD_USER_ADDRESS_SUCCESS: "ADD_USER_ADDRESS_SUCCESS",
  ADD_USER_ADDRESS_FAILURE: "ADD_USER_ADDRESS_FAILURE",
  ADD_USER_ORDER_REQUEST: "ADD_USER_ORDER_REQUEST",
  ADD_USER_ORDER_SUCCESS: "ADD_USER_ORDER_SUCCESS",
  ADD_USER_ORDER_FAILURE: "ADD_USER_ORDER_FAILURE",

  GET_USER_ORDER_REQUEST: "GET_USER_ORDER_REQUEST",
  GET_USER_ORDER_SUCCESS: "GET_USER_ORDER_SUCCESS",
  GET_USER_ORDER_FAILURE: "GET_USER_ORDER_FAILURE",

  GET_USER_ORDER_DETAILS_REQUEST: "GET_USER_ORDER_DETAILS_REQUEST",
  GET_USER_ORDER_DETAILS_SUCCESS: "GET_USER_ORDER_DETAILS_SUCCESS",
  GET_USER_ORDER_DETAILS_FAILURE: "GET_USER_ORDER_DETAILS_FAILURE",

  VALIDATE_COUPON_REQUEST: "VALIDATE_COUPON_REQUEST",
  VALIDATE_COUPON_SUCCESS: "VALIDATE_COUPON_SUCCESS",
  VALIDATE_COUPON_FAILURE: "VALIDATE_COUPON_FAILURE",

  CLEAR_COUPON_REQUEST: "CLEAR_COUPON_REQUEST",
  CLEAR_COUPON_SUCCESS: "CLEAR_COUPON_SUCCESS",
  CLEAR_COUPON_FAILURE: "CLEAR_COUPON_FAILURE",

  GET_BUSINESS_DATE_REQUEST: "GET_BUSINESS_DATE_REQUEST",
  GET_BUSINESS_DATE_SUCCESS: "GET_BUSINESS_DATE_SUCCESS",
  GET_BUSINESS_DATE_FAILURE: "GET_BUSINESS_DATE_FAILURE",

  VERIFY_PAYU_REQUEST: "VERIFY_PAYU_REQUEST",
  VERIFY_PAYU_SUCCESS: "VERIFY_PAYU_SUCCESS",
  VERIFY_PAYU_FAILURE: "VERIFY_PAYU_FAILURE",

  GET_PAYU_URL_REQUEST: "GET_PAYU_URL_REQUEST",
  GET_PAYU_URL_SUCCESS: "GET_PAYU_URL_SUCCESS",
  GET_PAYU_URL_FAILURE: "GET_PAYU_URL_FAILURE",

  GET_PAYU_MERCHANT_ID_REQUEST: "GET_PAYU_MERCHANT_ID_REQUEST",
  GET_PAYU_MERCHANT_ID_SUCCESS: "GET_PAYU_MERCHANT_ID_SUCCESS",
  GET_PAYU_MERCHANT_ID_FAILURE: "GET_PAYU_MERCHANT_ID_FAILURE",

  GET_PAYU_SALT_REQUEST: "GET_PAYU_SALT_REQUEST",
  GET_PAYU_SALT_SUCCESS: "GET_PAYU_SALT_SUCCESS",
  GET_PAYU_SALT_FAILURE: "GET_PAYU_SALT_FAILURE",
};

export const feedbackConstants = {
  ADD_FEEDBACK_REQUEST: "ADD_FEEDBACK_REQUEST",
  ADD_FEEDBACK_SUCCESS: "ADD_FEEDBACK_SUCCESS",
  ADD_FEEDBACK_FAILURE: "ADD_FEEDBACK_FAILURE",
  GET_FEEDBACK_REQUEST: "GET_FEEDBACK_REQUEST",
  GET_FEEDBACK_SUCCESS: "GET_FEEDBACK_SUCCESS",
  GET_FEEDBACK_FAILURE: "GET_FEEDBACK_FAILURE",
};

export const userDetailsConstants = {
  UPDATE_USER_DETAILS_REQUEST: "UPDATE_USER_DETAILS_REQUEST",
  UPDATE_USER_DETAILS_SUCCESS: "UPDATE_USER_DETAILS_SUCCESS",
  UPDATE_USER_DETAILS_FAILURE: "UPDATE_USER_DETAILS_FAILURE",
};

export const userAddressConstants = {
  UPDATE_USER_ADDRESS_REQUEST: "UPDATE_USER_ADDRESS_REQUEST",
  UPDATE_USER_ADDRESS_SUCCESS: "UPDATE_USER_ADDRESS_SUCCESS",
  UPDATE_USER_ADDRESS_FAILURE: "UPDATE_USER_ADDRESS_FAILURE",

  GET_USER_ADDRESSS_REQUEST: "GET_USER_ADDRESSS_REQUEST",
  GET_USER_ADDRESSS_SUCCESS: "GET_USER_ADDRESSS_SUCCESS",
  GET_USER_ADDRESSS_FAILURE: "GET_USER_ADDRESSS_FAILURE",

  ADD_USER_ADDRESS_SUCCESS: "ADD_USER_ADDRESS_SUCCESS",
  ADD_USER_ADDRESS_FAILURE: "ADD_USER_ADDRESS_FAILURE",

  DELETE_USER_ADDRESS_SUCCESS: "DELETE_USER_ADDRESS_SUCCESS",
};

export const storeConstants = {
  GET_ALL_STORES_REQUEST: "GET_ALL_STORES_REQUEST",
  GET_ALL_STORES_FAILURE: "GET_ALL_STORES_FAILURE",
  GET_ALL_STORES_SUCCESS: "GET_ALL_STORES_SUCCESS",
};

export const deliveryTypeConstants = {
  SET_DELIVERY_TYPE_REQUEST: "SET_DELIVERY_TYPE_REQUEST",
  SET_DELIVERY_TYPE_FAILURE: "SET_DELIVERY_TYPE_FAILURE",
  SET_DELIVERY_TYPE_SUCCESS: "SET_DELIVERY_TYPE_SUCCESS",
};

export const orderConstantsNew = {
  GET_USER_ORDERS_REQUEST: "GET_USER_ORDERS_REQUEST",
  GET_USER_ORDERS_FAILURE: "GET_USER_ORDERS_FAILURE",
  GET_USER_ORDERS_SUCCESS: "GET_USER_ORDERS_SUCCESS",
};

export const orderStatusConstantsNew = {
  GET_ORDER_STATUS_REQUEST: "GET_ORDER_STATUS_REQUEST",
  GET_ORDER_STATUS_FAILURE: "GET_ORDER_STATUS_FAILURE",
  GET_ORDER_STATUS_SUCCESS: "GET_ORDER_STATUS_SUCCESS",
};

export const taxConstants = {
  GET_TAX_REQUEST: "GET_TAX_REQUEST",
  GET_TAX_FAILURE: "GET_TAX_FAILURE",
  GET_TAX_SUCCESS: "GET_TAX_SUCCESS",
};

export const deliPriceConstants = {
  GET_DELIVERY_PRICE_REQUEST: "GET_DELIVERY_PRICE_REQUEST",
  GET_DELIVERY_PRICE_FAILURE: "GET_DELIVERY_PRICE_FAILURE",
  GET_DELIVERY_PRICE_SUCCESS: "GET_DELIVERY_PRICE_SUCCESS",
};
