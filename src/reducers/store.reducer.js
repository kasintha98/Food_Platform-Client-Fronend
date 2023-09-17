import { activeCSS, activeCSSLogo, allActiveCSS, storeConstants } from "../actions/constants";

const initState = {
  stores: [],
  loading: false,
  error: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case storeConstants.GET_ALL_STORES_SUCCESS:
      state = {
        ...state,
        stores: action.payload,
        loading: false,
      };
      break;
    case storeConstants.GET_ALL_STORES_FAILURE:
      state = {
        ...state,
        stores: [],
        loading: false,
      };
      break;
      
      case activeCSS.GET_ACTIVE_CSS_REQUEST:
        state = {
          ...state,
          loading: true,
        };
        break;
      case activeCSS.GET_ACTIVE_CSS_SUCCESS:
        state = {
          ...state,
          activeCSS: action.payload,
          loading: false,
        };
        break;
      case activeCSS.GET_ACTIVE_CSS_FAILURE:
        state = {
          ...state,
          activeCSS: [],
          loading: false,
        };
        break;

        case activeCSSLogo.GET_ACTIVE_CSS_LOGO_REQUEST:
          state = {
            ...state,
            loading: true,
          };
          break;
        case activeCSSLogo.GET_ACTIVE_CSS_LOGO_SUCCESS:
          state = {
            ...state,
            activeCSSLogo: action.payload,
            loading: false,
          };
          break;
        case activeCSSLogo.GET_ACTIVE_CSS_LOGO_FAILURE:
          state = {
            ...state,
            activeCSSLogo: [],
            loading: false,
          };
          break;

        case allActiveCSS.GET_ALL_ACTIVE_CSS_REQUEST:
          state = {
            ...state,
            loading: true,
          };
          break;
        case allActiveCSS.GET_ALL_ACTIVE_CSS_SUCCESS:
          state = {
            ...state,
            allActiveCSS: action.payload,
            loading: false,
          };
          break;
        case allActiveCSS.GET_ALL_ACTIVE_CSS_FAILURE:
          state = {
            ...state,
            allActiveCSS: [],
            loading: false,
          };
          break;
  }
  return state;
};
