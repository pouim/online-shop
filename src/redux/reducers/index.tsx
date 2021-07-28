import {combineReducers} from 'redux';
import Settings from './Setting';
import Common from './CommonReducer';
import Auth from './Auth';
import locationsReducer from './Locations';
import productsReducer from './Products';
import categoriesReducer from './Categories';
import brandsReducer from './Brands';
import colorsReducer from './Colors';
import favoritiesReducer from './Favorities';
import cartReducer from './Cart';
import ordersReducer from './Orders';

const rootReducer = combineReducers({
  settings: Settings,
  auth: Auth,
  common: Common,
  locations: locationsReducer,
  products: productsReducer,
  categories: categoriesReducer,
  brands: brandsReducer,
  colors: colorsReducer,
  favorities: favoritiesReducer,
  cart: cartReducer,
  orders: ordersReducer,
});

export default rootReducer;
