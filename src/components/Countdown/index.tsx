import React from "react";
import MyCountdown from "react-countdown";
import styles from "./styles.module.scss";

interface CountdownProps {
  endTime: number;
  props?: any;
}

const Countdown: React.FC<CountdownProps> = ({ endTime, props }) => {
  // Renderer callback
  const renderer = ({ total, hours, minutes, seconds }: any) => {
    if (total) {
      // Render a countdown
      return (
        <div
        {...props}
          style={{
            color: "#000000",
            display: "flex",
            flexDirection: "row-reverse",
          }}
        >
          <div className={styles.box}>{hours}</div>
          <div className={styles.seperator}>:</div>
          <div className={styles.box}>{minutes}</div>
          <div className={styles.seperator}>:</div>
          <div
            className={styles.box}
            style={{ backgroundColor: "transparent", color: "#000000" }}
          >
            {seconds}
          </div>
        </div>
      );
    } else {
      // Render a finished state
      return <div>FINISHED</div>;
    }
  };
  return (
    <MyCountdown
      date={Date.now() + endTime}
      daysInHours={true}
      renderer={renderer}
      {...props}
    />
  );
};

export default Countdown;
