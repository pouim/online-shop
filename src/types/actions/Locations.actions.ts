export const ADD_NEW_LOCATION = "ADD_NEW_LOCATION";
export const LOAD_USER_LOCATION = "LOAD_USER_LOCATION";
export const DELETE_LOCATION = "DELETE_LOCATION";
export const EDIT_LOCATION = "EDIT_LOCATION";

interface editLcoation {
  type: typeof EDIT_LOCATION;
  payload: any;
}


interface deleteLoction {
  type: typeof DELETE_LOCATION;
  payload: any;
}

interface loadUserLocations {
  type: typeof LOAD_USER_LOCATION;
  payload: any;
}

interface addNewLocation {
  type: typeof ADD_NEW_LOCATION;
  payload: Location;
}

export type LocationsActionTypes =
  | loadUserLocations
  | addNewLocation
  | deleteLoction
  | editLcoation;
