import { CommonActionTypes } from "./actions/Common.action";
import { SettingsActionTypes } from "./actions/Settings.action";
import { AuthActions } from "./actions/Auth.actions";
import { LocationsActionTypes } from "./actions/Locations.actions";
import { ProductsActionTypes } from "./actions/Products.action";
import { CategoriesActionTypes } from "./actions/Category.action";
import { FavoritiesActionTypes } from "./actions/FavoritiesActionTypes";
import { cartActionTypes } from "./actions/Cart.Actions";
import { OrdersActionTypes } from "./actions/Orders.Action";

export type AppActions =
    cartActionTypes
  | CommonActionTypes
  | SettingsActionTypes
  | AuthActions
  | LocationsActionTypes
  | ProductsActionTypes
  | CategoriesActionTypes
  | OrdersActionTypes
  | FavoritiesActionTypes;
