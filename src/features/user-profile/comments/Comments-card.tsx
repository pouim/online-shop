import { CalendarIcon } from "@assets/icons/Calendar";
import ReadMore from "@components/truncate/truncate";
import classNames from "classnames";
import moment from "jalali-moment";
import { FC } from "react";
import { style } from "styled-system";
import styles from "./styles.module.scss";

const CommentsCard: FC<any> = ({comment}) => {
  return (
    <div className={classNames(styles.wrapper, "container p-1 mb-3")}>
      <div className="row flex-row-reverse">
        <div
          className={classNames(styles.imageWrapper, "col-12 col-sm-2 mt-3")}
        >
          <img className={styles.imageBox} src={comment.product.photo_main} />
        </div>
        <div className="col-12 col-sm-10">
          <div className="d-flex flex-row-reverse justify-content-between p-2 mb-3">
            <div>
              <h5>{comment.product.title}</h5>
            </div>
            <div className="d-flex flex-row-reverse align-items-center">
              <p className="text-right ml-2" style={{ direction: "rtl" }}>
                {moment(comment.created_at).locale("fa").format("D/MMMM/YYYY")}
              </p>
              <CalendarIcon width={22} height={22} />
            </div>
          </div>

          <div className="px-2">
            <ReadMore character={200} more="بیشتر" less="کمتر">
              بسیارعالی و پرنور ، تا الان 4 مرتبه خرید کردم و همیشه راضی بودم،
              مرسی از خدمات خوب فروشگاه الفبای برق بسیارعالی و پرنور ، تا الان 4
              مرتبه خرید کردم و همیشه راضی بودم، مرسی از خدمات خوب فروشگاه
              الفبای برق بسیارعالی و پرنور ، تا الان 4 مرتبه خرید کردم و همیشه
              راضی بودم، مرسی از خدمات خوب فروشگاه الفبای برق
            </ReadMore>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsCard;
