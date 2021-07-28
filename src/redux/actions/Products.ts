import { Cookies } from "react-cookie";
import { Dispatch } from "redux";
import jwtAxios, { setAuthToken } from "src/axios-config/jwtAxios";
import { product } from "src/site-settings/product";
import { AppActions } from "src/types";
import { FETCH_MORE_FAILED, FETCH_MORE_PRODUCTS, FETCH_MORE_STARTED, FETCH_MORE_SUCCED, FETCH_PRODUCTS, FETCH_PRODUCTS_BY_BRAND, FETCH_PRODUCTS_BY_CATEGORY, SET_PRODUCTS } from "src/types/actions/Products.action";
import { fetchError, fetchStart, fetchSuccess } from ".";



export const setProducts = (products: any) => {
  return {
    type: SET_PRODUCTS,
    payload: products
  }
}



export const fetchMoreProducts = (url: any) => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch({
      type: FETCH_MORE_STARTED,
    })
    const cookies = new Cookies();
    const token = cookies.get("token");
    setAuthToken(token);
    try {
      console.log("res.data loading");
      const res = await jwtAxios.get(url);
      dispatch({
        type: FETCH_MORE_SUCCED,
      })
      console.log("res.data", res.data.results);
      dispatch({
        type: FETCH_MORE_PRODUCTS,
        payload: res.data,
      });
    } catch (err) {
      console.log("error!!!!", err);
      dispatch({
        type: FETCH_MORE_FAILED,
      })
    }
  };
};


export const fetchProducts = (query: any) => {
    return async (dispatch: Dispatch<AppActions>) => {
      dispatch(fetchStart());
      const cookies = new Cookies();
      const token = cookies.get("token");
      setAuthToken(token);
      try {
        console.log("res.data loading");
        const res = await jwtAxios.get(`products/?limit=6&offset=0${query}`);
        dispatch(fetchSuccess());
        console.log("res.data", res.data.results);
        dispatch({
          type: FETCH_PRODUCTS,
          payload: res.data,
        });
      } catch (err) {
        console.log("error!!!!", err);
        dispatch(fetchError(err));
      }
    };
  };


  export const fetchProductsByBrand = (brandID: any) => {
    return async (dispatch: Dispatch<AppActions>) => {
      dispatch(fetchStart());
      // const token = localStorage.getItem('token');
      const cookies = new Cookies();
      const token = cookies.get("token");
      setAuthToken(token);
      try {
        const res = await jwtAxios.get(`products/?company=${brandID}`);
        dispatch(fetchSuccess());
        dispatch({
          type: FETCH_PRODUCTS_BY_BRAND,
          payload: res.data,
        });
      } catch (err) {
        console.log("error!!!!", err);
        dispatch(fetchError(err));
      }
    };
  };

  export const fetchProductsByCateogry = (categoryID: any) => {
    return async (dispatch: Dispatch<AppActions>) => {
      dispatch(fetchStart());
      // const token = localStorage.getItem('token');
      const cookies = new Cookies();
      const token = cookies.get("token");
      setAuthToken(token);
      try {
        const res = await jwtAxios.get(`products/?category=${categoryID}`);
        dispatch(fetchSuccess());
        dispatch({
          type: FETCH_PRODUCTS_BY_CATEGORY,
          payload: res.data,
        });
      } catch (err) {
        console.log("error!!!!", err);
        dispatch(fetchError(err));
      }
    };
  };

