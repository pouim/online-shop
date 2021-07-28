import React from 'react';
import Table from 'rc-table';
import {
  DeliveryInfo,
  DeliveryAddress,
  Address,
  CostCalculation,
  PriceRow,
  Price,
  ProgressWrapper,
  OrderTableWrapper,
  OrderTable,
} from './order-details.style';
import Progress from '@components/progress-box/progress-box';
import { CURRENCY } from '@utils/constant';
import styles from './styles.module.scss';


type OrderDetailsProps = {
  tableData?: any;
  columns?: any;
  progressData?: any;
  progressStatus?: any;
  address?: string;
  subtotal?: number;
  discount?: number;
  deliveryFee?: number;
  grandTotal?: number;
};

const components = {
  table: OrderTable,
};

const OrderDetails: React.FC<OrderDetailsProps> = ({
  tableData,
  columns,
  address,
  progressStatus,
  progressData,
  subtotal,
  discount,
  deliveryFee,
  grandTotal,
}) => {
  return (
    <>
      <DeliveryInfo>
        <DeliveryAddress>
          <h3 style={{ textAlign: "right" }}>آدرس تحویل گیرنده</h3>
          <Address>{address}</Address>
        </DeliveryAddress>

        <CostCalculation>
          <PriceRow>
            جمع قیمت
            <Price>
              {CURRENCY}
              {subtotal}
            </Price>
          </PriceRow>
          <PriceRow>
            تخفیف
            <Price>
              {CURRENCY}
              {discount}
            </Price>
          </PriceRow>
          <PriceRow>
            هزینه ارسال
            <Price>
              {CURRENCY}
              {deliveryFee}
            </Price>
          </PriceRow>
          <PriceRow className="grandTotal">
            جمع کل
            <Price>
              {CURRENCY}
              {grandTotal}
            </Price>
          </PriceRow>
        </CostCalculation>
      </DeliveryInfo>

      <ProgressWrapper>
        <Progress data={progressData} status={progressStatus} />
      </ProgressWrapper>

      <OrderTableWrapper>
        <Table
          columns={columns}
          data={tableData}
          rowKey={(record) => record.id}
          components={components}
          direction= "rtl"
          className={styles.orderDetailsTable}
          emptyText="داده ای وجود ندارد"
          // scroll={{ y: 300}}
        />
      </OrderTableWrapper>
    </>
  );
};

export default OrderDetails;
