import {
  FETCH_MORE_FAILED,
  FETCH_MORE_PRODUCTS,
  FETCH_MORE_STARTED,
  FETCH_MORE_SUCCED,
  FETCH_PRODUCTS,
  ProductsActionTypes,
  SET_PRODUCTS,
} from "src/types/actions/Products.action";

const initialState: any = {
  products: [],
  next: null,
  isLoading: false,
};

const productsReducer = (
  state = initialState,
  action: ProductsActionTypes
): any => {
  switch (action.type) {
    case SET_PRODUCTS: {
      return {
        ...state,
        products: action.payload.results,
        next: action.payload.next,
      };
    }

    case FETCH_PRODUCTS: {
      return {
        ...state,
        products: action.payload.results,
        next: action.payload.next,
      };
    }

    case FETCH_MORE_PRODUCTS: {
      return {
        ...state,
        products: [...state.products, ...action.payload.results],
        next: action.payload.next,
      };
    }

    case FETCH_MORE_STARTED: {
      return {
        ...state,
        isLoading: true
      };
    }

    case FETCH_MORE_SUCCED: {
      return {
        ...state,
        isLoading: false
      };
    }

    case FETCH_MORE_FAILED: {
      return {
        ...state,
        isLoading: false
      };
    }

    default:
      return state;
  }
};

export default productsReducer;
