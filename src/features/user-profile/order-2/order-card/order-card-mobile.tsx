import React from 'react';
import Table from 'rc-table';
import Collapse, { Panel } from 'rc-collapse';
import Progress from '@components/progress-box/progress-box';
import styles from './styles.module.scss';
import {
  OrderListHeader,
  TrackID,
  Status,
  OrderMeta,
  Meta,
  CardWrapper,
  OrderDetail,
  DeliveryInfo,
  DeliveryAddress,
  Address,
  CostCalculation,
  PriceRow,
  Price,
  ProgressWrapper,
  OrderTable,
  OrderTableMobile,
} from './order-card.style';

import { CURRENCY } from '@utils/constant';
import moment from 'jalali-moment';

type MobileOrderCardProps = {
  orderId?: any;
  onClick?: (e: any) => void;
  className?: any;
  status?: any;
  date?: any;
  deliveryTime?: any;
  amount?: number;
  tableData?: any;
  columns?: any;
  progressData?: any;
  progressStatus?: any;
  address?: string;
  subtotal?: number;
  discount?: number;
  deliveryFee?: number;
  grandTotal?: number;
  orders?: any;
};

const components = {
  table: OrderTable,
};

const OrderCard: React.FC<MobileOrderCardProps> = ({
  onClick,
  className,
  columns,
  progressData,
  orders,
}) => {
  //   const displayDetail = className === 'active' ? '100%' : '0';
  const addAllClasses: string[] = ['accordion'];

  if (className) {
    addAllClasses.push(className);
  }
  return (
    <>
      <Collapse
        accordion={true}
        className={addAllClasses.join(' ')}
        defaultActiveKey="active"
        expandIcon={() => null}
      >
        {orders.map((order: any) => (
          <Panel
            header={
              <CardWrapper onClick={onClick}>
                <OrderListHeader>
                  <TrackID>
                    سفارش <span>12345</span>
                  </TrackID>
                  <Status>در حال پردازش</Status>
                </OrderListHeader>

                <OrderMeta>
                  <Meta>
                    تاریخ سفارش: <span>{moment(order.created_at).locale('fa').format('D MMMM YYYY')}</span>
                  </Meta>
                  {/* <Meta>
                    Delivery Time: <span>{order.deliveryTime}</span>
                  </Meta> */}
                  <Meta className="price">
                    جمع کل:
                    <span>
                      {CURRENCY}
                      {order.amount}
                    </span>
                  </Meta>
                </OrderMeta>
              </CardWrapper>
            }
            headerClass="accordion-title"
            key={order.id}
          >
            <OrderDetail>
              <DeliveryInfo>
                <DeliveryAddress>
                  <h3 style={{textAlign: 'right'}}>آدرس تحویل گیرنده</h3>
                  <Address>{order.address.postal_address}</Address>
                </DeliveryAddress>

                <CostCalculation>
                  <PriceRow>
                    جمع قیمت
                    <Price>
                      {CURRENCY}
                      {order.subtotal}
                    </Price>
                  </PriceRow>
                  <PriceRow>
                    تخفیف
                    <Price>
                      {CURRENCY}
                      {order.discount}
                    </Price>
                  </PriceRow>
                  <PriceRow>
                    هزینه ارسال
                    <Price>
                      {CURRENCY}
                      {order.deliveryFee}
                    </Price>
                  </PriceRow>
                  <PriceRow className="grandTotal">
                    جمع کل
                    <Price>
                      {CURRENCY}
                      {order.amount}
                    </Price>
                  </PriceRow>
                </CostCalculation>
              </DeliveryInfo>

              <ProgressWrapper>
                <Progress data={progressData} status={1} />
              </ProgressWrapper>

              <OrderTableMobile>
                <Table
                  columns={columns}
                  data={order.cart.items}
                  rowKey={(record) => record.id}
                  components={components}
                  className={styles.orderDetailsTable}
                  // scroll={{ x: 450 }}
                  // scroll={{ y: 250 }}
                />
              </OrderTableMobile>
            </OrderDetail>
          </Panel>
        ))}
      </Collapse>
    </>
  );
};

export default OrderCard;
