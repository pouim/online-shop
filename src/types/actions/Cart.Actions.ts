export const FETCH_CART = "FETCH_CART";
export const FETCH_CART_ITEMS = "FETCH_CART_ITEMS";
export const ADD_TO_CART = "ADD_TO_CART";
export const CLEAR_CART = "CLEAR_CART";
export const FETCH_CART_STARTED = "FETCH_CART_STARTED";
export const FETCH_CART_SUCCED = "FETCH_CART_SUCCED";
export const FETCH_CART_FAILED = "FETCH_CART_FAILED";

interface fetchStart {
  type: typeof FETCH_CART_STARTED;
}

interface fetchSucced {
  type: typeof FETCH_CART_SUCCED;
}
interface fetchFailed {
  type: typeof FETCH_CART_FAILED;
}

interface loadCart {
  type: typeof FETCH_CART;
  payload: any;
}

interface fetchCartItems {
  type: typeof FETCH_CART_ITEMS;
  payload: any;
}

interface fetchCart {
  type: typeof FETCH_CART;
  payload: any;
}

interface addToCart {
  type: typeof ADD_TO_CART;
  payload: any;
}

interface clearCart {
  type: typeof CLEAR_CART;
}

export type cartActionTypes =
    fetchStart 
  | fetchSucced
  | fetchFailed  
  | fetchCartItems
  | fetchCart
  | loadCart
  | addToCart
  | clearCart;
