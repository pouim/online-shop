export const FETCH_ORDERS = "FETCH_ORDERS";


interface fetchOrders {
  type: typeof FETCH_ORDERS;
  payload: any;
}



export type OrdersActionTypes = fetchOrders;

