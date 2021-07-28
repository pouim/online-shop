import { BagIcon } from "@assets/icons/Bag";
import { CircleIcon } from "@assets/icons/CircleIcon";
import { ShieldIcon } from "@assets/icons/Shield";
import { WalletIcon } from "@assets/icons/Wallet";
import classNames from "classnames";
import { FC } from "react";
import { Order } from "..";
import styles from "../styles.module.scss";
import Scrollbars from "react-custom-scrollbars";

interface OrderItemProps {
  orderData: any;
}

const OrderItem: FC<OrderItemProps> = ({ orderData }) => {
  return (
      <div className={classNames(styles.orderCartContainer, "Container mb-4")}>
        <div className="row">
          {/* <div
            className={classNames(
              styles.imageWrapper,
              "col-12 col-sm-2 mb-5 mb-sm-0 mt-3"
            )}
          >
            <img
              className={styles.imageBox}
              src={orderData.product.photo_main}
            />
          </div> */}

          <div className="Col-12 col-sm-10">
            <div className="d-flex">
              <div>
                <div className={styles.title}>{orderData.product.title}</div>
              </div>
              <div className={classNames(styles.orderStateBox, "mr-4")}>
                تحویل
              </div>
            </div>

            <div className="d-flex mt-4 ">
              <div className="d-flex ml-3">
                <div>
                  <WalletIcon width={17} height={17} />{" "}
                </div>
                <div className="d-flex mr-1">
                  <p className="ml-1">
                    {orderData.product.price
                      ? orderData.product.price
                      : orderData.product.real_price}{" "}
                  </p>{" "}
                  <p>تومان</p>
                </div>
              </div>

              <div className="d-flex ml-3">
                <div>
                  <BagIcon width={17} height={17} />{" "}
                </div>
                <div className="d-flex mr-1">
                  <p className="ml-1">{orderData.quantity}</p> <p>عدد</p>
                </div>
              </div>

              <div className="d-flex ml-3">
                <div>
                  <CircleIcon
                    width={15}
                    height={15}
                    color={orderData.color.color_code}
                  />{" "}
                </div>
                <p className="mr-1">رنگ</p>
              </div>

              <div className="d-flex ml-3">
                <div>
                  <ShieldIcon width={17} height={17} />{" "}
                </div>
                <p className="mr-1">{orderData.warranty}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default OrderItem;
