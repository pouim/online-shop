import { cartActionTypes, CLEAR_CART, FETCH_CART, FETCH_CART_FAILED, FETCH_CART_ITEMS, FETCH_CART_STARTED, FETCH_CART_SUCCED } from "src/types/actions/Cart.Actions";

const initialState: any = {
  cartItems: [],
  cart: null,
  cartLoading: false,
};

const cartReducer = (state = initialState, action: cartActionTypes): any => {
  switch (action.type) {
    case FETCH_CART_ITEMS: {
      return {
        ...state,
        cartItems: action.payload,
      };
    }

    case FETCH_CART_STARTED: {
      return {
        ...state,
        cartLoading: true,
      };
    }

    case FETCH_CART_SUCCED: {
      return {
        ...state,
        cartLoading: false,
      };
    }
    case FETCH_CART_FAILED: {
      return {
        ...state,
        cartLoading: true,
      };
    }

    case FETCH_CART: {
      return {
        ...state,
        cart: action.payload,
      };
    }

    case CLEAR_CART: {
        return {
          ...state,
          cartItems: [],
          cart: null,
        };
      }

    default:
      return state;
  }
};

export default cartReducer;
