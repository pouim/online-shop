import { SET_BRANDS } from "src/types/actions/Brands.actions";


export const setBrands = (brands: any) => {
    return {
        type: SET_BRANDS,
        payload: brands
    }
  };