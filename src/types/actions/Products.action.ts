import { TypeOf } from "yup";
import { FETCH_START } from "./Common.action";

export const FETCH_ALL_PRODUCTS = "FETCH_ALL_PRODUCTS";
export const FETCH_PRODUCTS_BY_BRAND = "FETCH_PRODUCTS_BY_BRAND";
export const FETCH_PRODUCTS_BY_CATEGORY = "FETCH_PRODUCTS_BY_CATEGORY";
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FETCH_MORE_PRODUCTS = 'FETCH_MORE_PRODUCTS';
export const FETCH_MORE_STARTED = 'FETCH_MORE_STARTED';
export const FETCH_MORE_SUCCED = 'FETCH_MORE_SUCCED';
export const FETCH_MORE_FAILED = 'FETCH_MORE_FAILED';



interface fetchMoreStart {
  type: typeof FETCH_MORE_STARTED,
}

interface fetchMoreSuceed {
  type: typeof FETCH_MORE_SUCCED,
}

interface fetchMoreFailed {
  type: typeof FETCH_MORE_FAILED,
}

interface fetchMoreProducts {
  type: typeof FETCH_MORE_PRODUCTS,
  payload: any,
}

interface setProducts {
  type: typeof SET_PRODUCTS;
  payload: any;
}

interface fetchProducts {
  type: typeof FETCH_PRODUCTS;
  payload: any;
}

interface fetchProductsByBrand {
  type: typeof FETCH_PRODUCTS_BY_BRAND;
  payload: any;
}

interface fetchProductsByCatogory {
  type: typeof FETCH_PRODUCTS_BY_CATEGORY;
  payload: any;
}

export type ProductsActionTypes =
    setProducts
  | fetchProducts
  | fetchMoreProducts
  | fetchProductsByBrand
  | fetchProductsByCatogory
  | fetchMoreStart
  | fetchMoreSuceed
  | fetchMoreFailed;
