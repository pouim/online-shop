import { initialLocations } from "src/site-settings/locations";
import {
  ADD_NEW_LOCATION,
  DELETE_LOCATION,
  EDIT_LOCATION,
  LOAD_USER_LOCATION,
  LocationsActionTypes,
} from "src/types/actions/Locations.actions";

interface Location {
  id: number;
  name: string;
  phone_number: string;
  state: string;
  city: string;
  postal_address: string;
  postal_code: string;
}

type LocationsState = {
  locations: Location[] | null;
};

const initialState: any = {
  locations: [],
};

const locationsReducer = (
  state = initialState,
  action: LocationsActionTypes
): any => {
  switch (action.type) {
    case LOAD_USER_LOCATION: {
      return {
        ...state,
        locations: action.payload,
      };
    }
    case ADD_NEW_LOCATION: {
      return {
        ...state,
        locations: [...state.locations, action.payload],
      };
    }

    case EDIT_LOCATION: {
      return {
        ...state,
        locations: state.locations.map((item: any) => item.id === action.payload.id ? action.payload : item)
      };
    }
    case DELETE_LOCATION: {
      return {
        ...state,
        locations: state.locations.filter((item: any) => item.id !== action.payload)
      };
    }  

    default:
      return state;
  }
};

export default locationsReducer;
