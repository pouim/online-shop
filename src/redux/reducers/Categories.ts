import {
  CategoriesActionTypes,
  SET_CATEGORIES,
} from "src/types/actions/Category.action";

const initialState: any = {
  categories: [],
};

const categoriesReducer = (
  state = initialState,
  action: CategoriesActionTypes
): any => {
  switch (action.type) {
    case SET_CATEGORIES: {
      return {
        ...state,
        categories: action.payload,
      };
    }

    default:
      return state;
  }
};

export default categoriesReducer;
