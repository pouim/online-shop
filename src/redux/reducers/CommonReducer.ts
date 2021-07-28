import { Common } from "../../types/models/Common";
import {
  CommonActionTypes,
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  HIDE_MESSAGE,
  SHOW_MESSAGE,
  TOGGLE_APP_DRAWER,
  TOOGLE_BRANDS_CATEGORY,
} from "../../types/actions/Common.action";

const INIT_STATE: Common = {
  error: "",
  loading: false,
  isAppDrawerOpen: false,
  updatingContent: false,
  message: "",
  selectedBrands: [],
};

const CommonReducer = (
  state = INIT_STATE,
  action: CommonActionTypes
): Common => {
  switch (action.type) {
    case FETCH_START: {
      return { ...state, error: "", message: "", loading: true };
    }
    case FETCH_SUCCESS: {
      return {
        ...state,
        error: "",
        message: "",
        loading: false,
        updatingContent: false,
      };
    }
    case SHOW_MESSAGE: {
      return {
        ...state,
        error: "",
        message: action.message,
        loading: false,
        updatingContent: false,
      };
    }
    case FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
        message: "",
        updatingContent: false,
      };
    }
    case HIDE_MESSAGE: {
      return {
        ...state,
        loading: false,
        error: "",
        message: "",
        updatingContent: false,
      };
    }
    case TOGGLE_APP_DRAWER: {
      return {
        ...state,
        isAppDrawerOpen: !state.isAppDrawerOpen,
      };
    }
    case TOOGLE_BRANDS_CATEGORY: {
      const id = action.payload;
      if (state.selectedBrands.includes(id)) {
        return {
          ...state,
          selectedBrands: state.selectedBrands.filter((item) => item !== id),
        };
      } else {
        return {
          ...state,
          selectedBrands: [...state.selectedBrands, id],
        };
      }
    }

    default:
      return state;
  }
};
export default CommonReducer;
