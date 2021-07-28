import React from 'react';
import {
  SingleOrderList,
  OrderListHeader,
  TrackID,
  Status,
  OrderMeta,
  Meta,
} from './order-card.style';
import { CURRENCY } from '@utils/constant';
import moment from 'jalali-moment';

type OrderCardProps = {
  orderId?: any;
  onClick?: (e: any) => void;
  className?: any;
  status?: any;
  date?: any;
  deliveryTime?: any;
  amount?: number;
};

const OrderCard: React.FC<OrderCardProps> = ({
  orderId,
  onClick,
  className,
  status,
  date,
  deliveryTime,
  amount,
}) => {
  return (
    <>
      <SingleOrderList onClick={onClick} className={className}>
        <OrderListHeader>
          <TrackID>
             سفارش
            <span> </span><span style={{fontSize: '16px'}}>1234</span>
          </TrackID>
          <Status>در حال پردازش</Status>
        </OrderListHeader>

        <OrderMeta>
          <Meta>
             تاریخ سفارش
            : <span>{moment(date).locale('fa').format('D MMMM YYYY')}</span>
          </Meta>
          <Meta className="price">
              قیمت کل
            :
            <span>
              {CURRENCY}
              {amount}
            </span>
          </Meta>
        </OrderMeta>
      </SingleOrderList>
    </>
  );
};

export default OrderCard;
