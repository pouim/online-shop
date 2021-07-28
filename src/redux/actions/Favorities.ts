import { Cookies } from "react-cookie";
import { Dispatch } from "redux";
import jwtAxios, { setAuthToken } from "src/axios-config/jwtAxios";
import { AppActions } from "src/types";
import { ADD_TO_FAVORITE, CLEAR_FAVORITE, DELETE_FROM_FAVORITE, FETCH_FAVORITE_PRODUCTS } from "src/types/actions/FavoritiesActionTypes";
import { fetchError, fetchStart, fetchSuccess } from ".";



export const fetchFavoriteProducts = () => {
    return async (dispatch: Dispatch<AppActions>) => {
      dispatch(fetchStart());
      const cookies = new Cookies();
      const token = cookies.get("token");
      setAuthToken(token);
      try {
        console.log("res.data loading");
        const res = await jwtAxios.get("favorite-products/");
        dispatch(fetchSuccess());
        console.log("res.data", res.data);
        dispatch({
          type: FETCH_FAVORITE_PRODUCTS,
          payload: res.data,
        });
      } catch (err) {
        console.log("error!!!!", err);
        dispatch(fetchError(err));
      }
    };
  };

  export const loadFavoriteProducts = async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    try {
      console.log("res.data loading");
      const res = await jwtAxios.get("favorite-products/");
      dispatch(fetchSuccess());
      console.log("res.data", res.data);
      dispatch({
        type: FETCH_FAVORITE_PRODUCTS,
        payload: res.data,
      });
    } catch (err) {
      console.log("error!!!!", err);
      dispatch(fetchError(err));
    }
  };


  export const addToFavorite = (ids: any, data: any) => {
    return async (dispatch: Dispatch<AppActions>) => {
      const body = {
        favorite_products : [...ids]
      }
      const newData = {
        id: data.id,
        available: data.available,
        discount_percent: data.discount_percent,
        total_rates: data.total_rates,
        rate: data.rate,
        title: data.title,
        photo_main: data.photo_main,
        real_price: data.real_price,
        price: data.price,
        sale_count: data.sale_count,
        updated_at: data.updated_at,
        created_at: data.created_at,
      };
      const cookies = new Cookies();
      const token = cookies.get("token");
      setAuthToken(token);
      try {
        console.log(`adding to favorite ${body}`);
        const res = await jwtAxios.put(`favorite-products/`,body);
        dispatch(fetchSuccess());
        console.log("added to favorite", res.data);
        dispatch({
          type: ADD_TO_FAVORITE,
          payload: newData,
        });
      } catch (err) {
        console.log("error!!!!", err);
        dispatch(fetchError(err));
      }
    };
  };


  export const deleteFromFavorite = (ids: any, id: any) => {
    return async (dispatch: Dispatch<AppActions>) => {
      const body = {
        favorite_products : [...ids]
      }
      // dispatch(fetchStart());
      const cookies = new Cookies();
      const token = cookies.get("token");
      setAuthToken(token);
      try {
        console.log(`adding to favorite ${body}`);
        const res = await jwtAxios.put(`favorite-products/`,body);
        dispatch(fetchSuccess());
        console.log("res.data", res.data);
        dispatch({
          type: DELETE_FROM_FAVORITE,
          payload: id,
        });
      } catch (err) {
        console.log("error!!!!", err);
        dispatch(fetchError(err));
      }
    };
  };


  export const clearFavorite = (): AppActions => {
    return {
        type: CLEAR_FAVORITE,
    } 
}


