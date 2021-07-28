import { Dispatch } from "redux";
import { AppActions } from "src/types";
import { SET_CATEGORIES } from "src/types/actions/Category.action";

export const setCategories = (categories: any) => {
    return {
        type: SET_CATEGORIES,
        payload: categories
    }
  };