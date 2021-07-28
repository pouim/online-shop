import Link from "next/link";
import React from "react";
import styles from "./styles.module.css";
import { ProductCardWrapper } from "./card.style";

interface indexProps {
  title: string;
  description: string;
  imageSrc: string;
}

const index: React.FC<indexProps> = ({
  title,
  imageSrc,
  description,
  ...props
}) => {
  return ( 
    <div className="d-flex mx-2" style={{backgroundColor: 'white', padding: '1rem 3rem', borderRadius: '1.2rem'}}>
      <div style={{ textAlign: "center" }}>
        <h3>{title}</h3>
        <p
          className="card-text"
          //   style={{
          //     overflow: "hidden",
          //     textOverflow: "ellipsis",
          //     whiteSpace: "noWrap",
          //     lineClamp: 2,
          //   }}
        >
          لورم ایپسوم
        </p>
        <Link href="#">
          <a
            className="btn btn-primary btn-sm mt-5 "
            style={{ backgroundColor: "#516EFF", borderRadius: "2rem" }}
          >
            ادامه مطالب
          </a>
        </Link>
      </div>
      <div>
        <img src={imageSrc} alt="Lamp" />
      </div>
    </div>
  );
};

export default index;

