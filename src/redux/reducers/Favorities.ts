import { ADD_TO_FAVORITE, CLEAR_FAVORITE, DELETE_FROM_FAVORITE, FavoritiesActionTypes, FETCH_FAVORITE_PRODUCTS } from "src/types/actions/FavoritiesActionTypes";


const initialState: any = {
  favorities: [],
  ids: [],
};

const favoritiesReducer = (
  state = initialState,
  action: FavoritiesActionTypes
): any => {
  switch (action.type) {
    case FETCH_FAVORITE_PRODUCTS: {
      return {
        ...state,
        favorities: action.payload.favorite_products,
        ids: state.favorities.map((item: any) => item.id),
      };
    }

    case ADD_TO_FAVORITE: {
      return {
        ...state,
        favorities: [...state.favorities, action.payload],
        ids: state.favorities.map((item: any) => item.id),
      };
    }

    case DELETE_FROM_FAVORITE: {
      return {
        ...state,
        favorities: state.favorities.filter((item: any) => item.id !== action.payload),
        ids: state.favorities.map((item: any) => item.id),
      };
    }

    case CLEAR_FAVORITE: {
      return {
        ...state,
        favorities: [],
        ids: [],
      };
    }

    default:
      return state;
  }
};

export default favoritiesReducer;
