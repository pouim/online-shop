import { SET_COLORS } from "src/types/actions/Colors.actions";



export const setColors = (colors: any) => {
    return {
        type: SET_COLORS,
        payload: colors
    }
  };