import { CircleIcon } from "@assets/icons/CircleIcon";
import { ShieldIcon } from "@assets/icons/Shield";
import { Counter } from "@components/counter/counter-2/counter";
import classNames from "classnames";
import React, { FC } from "react";
import styles from "./styles.module.scss";

const CheckoutCard = ({
  title,
  image,
  amount,
  color,
  warranty,
  price,
}: CartItem) => {
  return (
    <div
      className={classNames(styles.cardWrapper, "d-flex p-3")}
      style={{ direction: "rtl" }}
    >
      <div>
        <img className={styles.image} src={image} />
      </div>
      <div className="d-flex flex-column">
        <div className={classNames(styles.title, "mt-1 mb-2")}>{title}</div>
        <div className="d-flex ml-3 mb-1">
          <div>
            <CircleIcon width={15} height={15} color={color} />{" "}
          </div>
          <div className={classNames(styles.label, "mr-1")}>رنگ</div>
        </div>

        <div className="d-flex ml-3 mb-3">
          <div className="ml-1">
            <ShieldIcon width={15} height={15} />{" "}
          </div>
          <div className={classNames(styles.label)}>{warranty}</div>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <Counter
              onIncrement={() => null}
              onDecrement={() => null}
              variant="lightHorizontal"
              value={amount}
            />
          </div>

          <div className="d-flex ">
            <div className={classNames(styles.price, "ml-2")}>{price}</div>
            <div className={classNames(styles.price)}>تومان</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCard;
