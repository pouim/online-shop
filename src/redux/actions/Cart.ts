import { Cookies } from "react-cookie";
import { Dispatch } from "redux";
import jwtAxios, { setAuthToken } from "src/axios-config/jwtAxios";
import { AppActions } from "src/types";
import {
  ADD_TO_CART,
  CLEAR_CART,
  FETCH_CART,
  FETCH_CART_FAILED,
  FETCH_CART_ITEMS,
  FETCH_CART_STARTED,
  FETCH_CART_SUCCED,
} from "src/types/actions/Cart.Actions";

export const loadCartitems = () => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch({
      type: FETCH_CART_STARTED,
    });
    const cookies = new Cookies();
    const token = cookies.get("token");
    setAuthToken(token);
    try {
      console.log("res.data loading");
      const res = await jwtAxios.get(`cart-items/`);
      dispatch({
        type: FETCH_CART_SUCCED,
      });
      console.log("res.data", res.data.results);
      dispatch({
        type: FETCH_CART_ITEMS,
        payload: res.data,
      });
    } catch (err) {
      console.log("error!!!!", err);
      dispatch({
        type: FETCH_CART_FAILED,
      });
    }
  };
};

export const fetchCartitems = async (dispatch: Dispatch<AppActions>) => {
  dispatch({
    type: FETCH_CART_STARTED,
  });
  try {
    console.log("res.data loading");
    const res = await jwtAxios.get("cart-items/");
    dispatch({
      type: FETCH_CART_SUCCED,
    });
    console.log("res.data", res.data);
    dispatch({
      type: FETCH_CART_ITEMS,
      payload: res.data,
    });
  } catch (err) {
    console.log("error!!!!", err);
    dispatch({
      type: FETCH_CART_FAILED,
    });
  }
};

export const loadCart = () => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch({
      type: FETCH_CART_STARTED,
    });
    const cookies = new Cookies();
    const token = cookies.get("token");
    setAuthToken(token);
    try {
      console.log("res.data loading");
      const res = await jwtAxios.get(`cart/`);
      dispatch({
        type: FETCH_CART_SUCCED,
      });
      console.log("res.data", res.data.results);
      dispatch({
        type: FETCH_CART,
        payload: res.data,
      });
    } catch (err) {
      console.log("error!!!!", err);
      dispatch({
        type: FETCH_CART_FAILED,
      });
    }
  };
};

export const fetchCart = async (dispatch: Dispatch<AppActions>) => {
  dispatch({
    type: FETCH_CART_STARTED,
  });
  try {
    console.log("res.data loading");
    const res = await jwtAxios.get("cart/");
    dispatch({
      type: FETCH_CART_SUCCED,
    });
    console.log("res.data", res.data);
    dispatch({
      type: FETCH_CART,
      payload: res.data,
    });
  } catch (err) {
    console.log("error!!!!", err);
    dispatch({
      type: FETCH_CART_FAILED,
    });
  }
};

export const addToCart = (data: any) => {
  return async (dispatch: Dispatch<AppActions>) => {
    const newData = {
      product: data.ID,
      color: data.colorID,
      quantity: 1,
    };
    const cookies = new Cookies();
    const token = cookies.get("token");
    setAuthToken(token);
    try {
      console.log(`adding to cart  items ${newData}`);
      const res = await jwtAxios.post(`cart-items/`, newData);
      dispatch({
        type: FETCH_CART_SUCCED,
      });
      console.log("added to cart  items", res.data);
      await fetchCartitems(dispatch);
      await fetchCart(dispatch);

      // dispatch({
      //   type: ADD_TO_CART,
      //   payload: data,
      // });
    } catch (err) {
      console.log("error!!!!", err);
      dispatch({
        type: FETCH_CART_FAILED,
      });
    }
  };
};

export const updateCart = (data: any, cartID: number) => {
  return async (dispatch: Dispatch<AppActions>) => {
    const newData = {
      product: data.ID,
      color: data.colorID,
      quantity: data.quantity,
    };
    const cookies = new Cookies();
    const token = cookies.get("token");
    setAuthToken(token);
    try {
      console.log(`updating  cart  items ${newData}`);
      if (data.quantity === 0) {
        const res = await jwtAxios.delete(`cart-items/${cartID}/`);
        console.log(`deletet cart items id ${cartID} succed`);
      } else {
        const res = await jwtAxios.put(`cart-items/${cartID}/`, newData);
        dispatch({
          type: FETCH_CART_SUCCED,
        });
        console.log("updated to cart  items", res.data);
      }

      await fetchCartitems(dispatch);
      await fetchCart(dispatch);
    } catch (err) {
      console.log("error!!!!", err);
      dispatch({
        type: FETCH_CART_FAILED,
      });
    }
  };
};

export const deleteFromCart = (cartID: number) => {
  return async (dispatch: Dispatch<AppActions>) => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    setAuthToken(token);
    try {
      console.log(`deleting  cart  items ${cartID}`);
      const res = await jwtAxios.delete(`cart-items/${cartID}/`);
      dispatch({
        type: FETCH_CART_SUCCED,
      });
      console.log("deleting to cart  items", res.data);
      await fetchCartitems(dispatch);
      await fetchCart(dispatch);
    } catch (err) {
      console.log("error!!!!", err);
      dispatch({
        type: FETCH_CART_FAILED,
      });
    }
  };
};

export const clearCart = (): AppActions => {
  return {
    type: CLEAR_CART,
  };
};
