import { BrandsActionTypes, SET_BRANDS } from "src/types/actions/Brands.actions";

  
  const initialState: any = {
    brands: [],
  };
  
  const brandsReducer = (
    state = initialState,
    action: BrandsActionTypes
  ): any => {
    switch (action.type) {
      case SET_BRANDS: {
        return {
          ...state,
          brands: action.payload,
        };
      }
  
      default:
        return state;
    }
  };
  
  export default brandsReducer;
  