import React, { FC } from "react";
import styles from "./Styles.module.scss";
import cn from "classnames";
import { Router, useRouter } from "next/router";

interface PopItemsProps {
  data: { icon: string; name: string; id: number };
}

const PopItems: FC<PopItemsProps> = ({ data }) => {
  const { icon, name, id } = data;
  const router = useRouter();
  return (
    <div
      className="col-4 col-md-2 mt-5 mb-5"
      style={{ textAlign: "center" }}
      onClick={() => router.push(`/shop/category/${data.id}`)}
    >
      <img
        src={icon}
        alt={name}
        className={cn(styles.popItem, "img-responsive")}
      />
      <div className={styles["cat-block-title"]}>{name}</div>
    </div>
  );
};

export default PopItems;
