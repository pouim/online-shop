export const SET_COLORS = "SET_COLORS";

interface setColors {
  type: typeof SET_COLORS;
  payload: any;
}

export type ColorsActionTypes = setColors;
