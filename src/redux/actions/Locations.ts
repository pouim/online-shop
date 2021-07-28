import { Cookies } from "react-cookie";
import { Dispatch } from "redux";
import jwtAxios, { setAuthToken } from "src/axios-config/jwtAxios";
import { AppActions } from "src/types";
import {
  ADD_NEW_LOCATION,
  DELETE_LOCATION,
  EDIT_LOCATION,
  LOAD_USER_LOCATION,
  LocationsActionTypes,
} from "src/types/actions/Locations.actions";
import { fetchError, fetchStart, fetchSuccess } from ".";



export const loaduserLocations = () => {
    return async (dispatch: Dispatch<AppActions>) => {
      dispatch(fetchStart());
      // const token = localStorage.getItem('token');
      const cookies = new Cookies();
      const token = cookies.get("token");
      setAuthToken(token);
      try {
        console.log("res.data loading");
        const res = await jwtAxios.get("addresses/");
        dispatch(fetchSuccess());
        console.log("res.data", res.data);
        dispatch({
          type: LOAD_USER_LOCATION,
          payload: res.data,
        });
      } catch (err) {
        console.log("error!!!!", err);
        dispatch(fetchError(err));
      }
    };
  };

export const addNewLoction = (location: any): LocationsActionTypes => {
  return {
    type: ADD_NEW_LOCATION,
    payload: location,
  };
};

export const editLoction = (location: any): LocationsActionTypes => {
  return {
    type: EDIT_LOCATION,
    payload: location,
  };
};


export const deleteLocation = (id: any): LocationsActionTypes => {
  return {
    type: DELETE_LOCATION,
    payload: id,
  };
}
