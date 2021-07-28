import { CalendarIcon } from "@assets/icons/Calendar";
import classNames from "classnames";
import { FC } from "react";
import styles from './styles.module.scss';
import moment from 'jalali-moment'



interface Props {
  title: string;
  description: string;
  date: string;
}

const index: FC<Props> = ({title, description, date}) => {
  const jalaliDate= moment().locale('fa').format('D/MMMM/YYYY');

  return (
    <div className={classNames(styles.wrapper, "d-flex flex-column p-3 mb-4")}>
      <div className="d-flex flex-row-reverse align-items-center justify-content-between">
        <h5>{title}</h5>
        <div className="d-flex flex-row-reverse align-items-center">
          <p className="text-right ml-2" style={{ direction: "rtl" }}>
            {moment(date).locale('fa').format('D/MMMM/YYYY')}
          </p>
          <CalendarIcon width={22} height={22} />
        </div>
      </div>

      <div className="text-right mt-2">
        <p>
          {description}
        </p>
      </div>
    </div>
  );
};

export default index;
