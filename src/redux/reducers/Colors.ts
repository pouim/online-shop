import { ColorsActionTypes, SET_COLORS } from "src/types/actions/Colors.actions";

const initialState: any = {
  colors: [],
};

const colorsReducer = (
  state = initialState,
  action: ColorsActionTypes
): any => {
  switch (action.type) {
    case SET_COLORS: {
      return {
        ...state,
        colors: action.payload,
      };
    }

    default:
      return state;
  }
};

export default colorsReducer;
