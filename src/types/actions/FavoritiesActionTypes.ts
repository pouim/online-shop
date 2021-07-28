export const FETCH_FAVORITE_PRODUCTS = "FETCH_FAVORITE_PRODUCTS";
export const ADD_TO_FAVORITE = 'ADD_TO_FAVORITE';
export const DELETE_FROM_FAVORITE = 'DELETE_FROM_FAVORITE;'
export const CLEAR_FAVORITE = 'CLEAR_FAVORITE';





interface clearFavorite {
  type: typeof CLEAR_FAVORITE;
}
interface addToFavorite {
  type: typeof ADD_TO_FAVORITE;
  payload: any;
}

interface deleteFromFavorite {
  type: typeof DELETE_FROM_FAVORITE;
  payload: any;
}


interface fetchFavoriteProducts {
  type: typeof FETCH_FAVORITE_PRODUCTS;
  payload: any;
}


export type FavoritiesActionTypes = fetchFavoriteProducts | addToFavorite | deleteFromFavorite | clearFavorite;
