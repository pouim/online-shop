import { BagIcon } from "@assets/icons/Bag";
import { CalendarIcon } from "@assets/icons/Calendar";
import { CircleIcon } from "@assets/icons/CircleIcon";
import { ShieldIcon } from "@assets/icons/Shield";
import { WalletIcon } from "@assets/icons/Wallet";
import { Button } from "@components/button/button";
import { ItemImgWrapper } from "@components/Pages/Shop/Partials/MobileSidebar/MobileSidebar.style";
import classNames from "classnames";
import React, { FC } from "react";
import OrderItem from "./OrderItem";
import styles from "./styles.module.scss";
import moment from 'jalali-moment'

export type Order = {
  title: string;
  price: number;
  amount: number;
  color: string;
  warranty: string;
  orderState: string;
  image: string;
};

type Orders = {
  orderID: number;
  orderDate: string;
  items: Order[];
};

interface Props {
  orders: Orders[];
}

const index: FC<Props> = ({ orders }) => {
  return (
    <>
      {orders && orders.map((item: any) => {
        return (
          <div
            className={classNames(styles.wrapper, "Container py-2 px-3 mb-4")}
            style={{ direction: "rtl" }}
          >
            <div className="row">
              <div className="d-flex d-sm-none flex-row-reverse align-items-center mr-3">
                <CalendarIcon width={22} height={22} />
                <p className="text-right ml-2" style={{ direction: "rtl" }}>
                  {moment(item.created_at).locale('fa').format('D MMMM YYYY')}
                </p>
              </div>

              <div className="col-12 col-sm-6">
                {item.cart && item.cart.items.map((orderItem: any) => (
                  <OrderItem orderData={orderItem && orderItem} />
                ))}
              </div>

              <div className="col-12 col-sm-6 d-flex flex-column justify-content-between">
                <div className="d-none d-sm-flex flex-row-reverse align-items-center">
                  <CalendarIcon width={22} height={22} />
                  <p className="text-right ml-2" style={{ direction: "rtl" }}>
                    {moment(item.created_at).locale('fa').format('D MMMM YYYY')}
                  </p>
                </div>
                <div style={{ alignSelf: "flex-end" }}>
                  <Button
                    style={{ fontSize: ".69rem" }}
                    size="small"
                    variant="text"
                  >
                    مشاهده فاکتور
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default index;
