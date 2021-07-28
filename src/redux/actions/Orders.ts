import { Cookies } from "react-cookie";
import { Dispatch } from "redux";
import jwtAxios, { setAuthToken } from "src/axios-config/jwtAxios";
import { AppActions } from "src/types";
import { FETCH_ORDERS } from "src/types/actions/Orders.Action";
import { fetchError, fetchStart, fetchSuccess } from ".";
import { clearCart } from "./Cart";

export const fetchOrders = () => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    const cookies = new Cookies();
    const token = cookies.get("token");
    setAuthToken(token);
    try {
      console.log("res.data loading");
      const res = await jwtAxios.get(`orders/`);
      dispatch(fetchSuccess());
      console.log("res.data", res.data.results);
      dispatch({
        type: FETCH_ORDERS,
        payload: res.data,
      });
    } catch (err) {
      console.log("error!!!!", err);
      dispatch(fetchError(err));
    }
  };
};

export const loadOrders = async (dispatch: Dispatch<AppActions>) => {
  dispatch(fetchStart());
  const cookies = new Cookies();
  const token = cookies.get("token");
  setAuthToken(token);
  try {
    console.log("res.data loading");
    const res = await jwtAxios.get(`orders/`);
    dispatch(fetchSuccess());
    console.log("res.data", res.data.results);
    dispatch({
      type: FETCH_ORDERS,
      payload: res.data,
    });
  } catch (err) {
    console.log("error!!!!", err);
    dispatch(fetchError(err));
  }
};


export const postNewOrder = (addressID: number) => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    const cookies = new Cookies();
    const token = cookies.get("token");
    setAuthToken(token);
    const body = {
      address: addressID,
    };
    try {
      console.log("res.data loading");
      const res = await jwtAxios.post("orders/", body);
      dispatch(fetchSuccess());
      console.log("res.data", res.data.results);
      await loadOrders(dispatch);
      dispatch(clearCart());
    } catch (err) {
      console.log("error!!!!", err);
      dispatch(fetchError(err));
    }
  };
};
