import React, { useState, useEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import {
  DesktopView,
  MobileView,
  OrderBox,
  OrderListWrapper,
  OrderList,
  OrderDetailsWrapper,
  Title,
  ImageWrapper,
  ItemWrapper,
  ItemDetails,
  ItemName,
  ItemSize,
  ItemPrice,
  NoOrderFound,
} from './order.style';
import moment from 'jalali-moment'
import OrderDetails from './order-details/order-details';
import OrderCard from './order-card/order-card';
import OrderCardMobile from './order-card/order-card-mobile';
import useComponentSize from '@utils/useComponentSize';
import { AppState } from '@store/store';
import { useSelector } from 'react-redux';
import Spinner from '@components/spinner';

const progressData = ['در حال پردازش', 'در حال ارسال', 'تحویل داده شده'];


const orderTableColumns = [
  {
    title: "آیتم ها",
    dataIndex: '',
    key: 'items',
    align: 'center',
    width: 250,
    ellipsis: true,
    render: (text: any, record: any) => {
      return (
        <ItemWrapper>
          <ImageWrapper>
            <img src={record.product.photo_main} alt={record.title} />
          </ImageWrapper>

          <ItemDetails className="mr-2">
            <ItemName>{record.product.title}</ItemName>
          </ItemDetails>
        </ItemWrapper>
      );
    },
  },
  {
    title: "تعداد",
    dataIndex: 'quantity',
    key: 'quantity',
    align: 'center',
    width: 100,
  },
  {
    title: "قیمت",
    dataIndex: '',
    key: 'total_price',
    align: 'center',
    width: 100,
    render: (text: any, record: any) => {
      return <p>{record.total_price}<span> </span><span>تومان</span></p>;
    },
  },
];

const OrdersContent: React.FC<any> = ({orders}) => {
  const [order, setOrder] = useState<any>(null);
  const [active, setActive] = useState('');
  const {loading}  = useSelector((state: AppState) => state.common);
  const [targetRef, size] = useComponentSize();
  const orderListHeight = size.height - 79;
 

  useEffect(() => {
    if (orders && orders.length !== 0) {
      setOrder(orders[0]);
      setActive(orders[0].id);
    }
  }, [orders]);

  if (loading) {
    return <Spinner />
  }

  // if (error) return <div>{error.message}</div>;

  const handleClick = (order: any) => {
    setOrder(order);
    setActive(order.id);
  };

  return (
    <OrderBox>
      <DesktopView>
        <OrderDetailsWrapper ref={targetRef}>
          <Title style={{ padding: '0 20px' }}>
             جزییات سفارش
          </Title>
          {order && order.id && (
            <OrderDetails
              progressStatus= {1}
              progressData={progressData}
              address={order.address.postal_address}
              subtotal={order.subtotal}
              discount={order.discount}
              deliveryFee={order.deliveryFee}
              grandTotal={order.amount}
              tableData={order.cart.items}
              columns={orderTableColumns}
            />
          )}
        </OrderDetailsWrapper>

        <OrderListWrapper style={{ height: size.height }}>
          <Title style={{ padding: '0 20px' }}>
             سفارشات من 
          </Title>

          <Scrollbars
            universal
            autoHide
            autoHeight
            
            autoHeightMin={420}
            autoHeightMax={isNaN(orderListHeight) ? 500 : orderListHeight}
          >
            <OrderList>
              {orders.length !== 0 ? (
                orders.map((current: any) => (
                  <OrderCard
                    key={current.id}
                    orderId={current.id}
                    className={current.id === active ? 'active' : ''}
                    status={progressData[current.status - 1]}
                    date={current.created_at}
                    deliveryTime={current.deliveryTime}
                    amount={current.cart.items.total_price}
                    onClick={() => {
                      handleClick(current);
                    }}
                  />
                ))
              ) : (
                <NoOrderFound>
                   سفارشی یافت نشد   
                </NoOrderFound>
              )}
            </OrderList>
          </Scrollbars>
        </OrderListWrapper>
      </DesktopView>

      <MobileView>
        <OrderList>
          <OrderCardMobile
            orders={orders}
            className={order && order.id === active ? 'active' : ''}
            progressData={progressData}
            columns={orderTableColumns}
            onClick={() => {
              handleClick(order);
            }}
          />
        </OrderList>
      </MobileView>
    </OrderBox>
  );
};

export default OrdersContent;
