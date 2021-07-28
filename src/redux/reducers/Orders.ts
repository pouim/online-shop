import { FETCH_ORDERS, OrdersActionTypes } from "src/types/actions/Orders.Action";


const initialState: any = {
  orders: [],
};

const ordersReducer = (state = initialState, action: OrdersActionTypes): any => {
  switch (action.type) {
    case FETCH_ORDERS: {
      return {
        ...state,
        orders: action.payload,
      };
    }


    default:
      return state;
  }
};

export default ordersReducer;
