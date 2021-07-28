import { Button } from "@components/button/button";
import { Router, useRouter } from "next/router";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import styles from './styles.module.scss';
;
const ProductsSliderSection = () => {
const router = useRouter();
  return (
    <Carousel showArrows={true}>
      <div style={{ position: "relative" }}>
        <img src="/images/slider.png" />
        <div
          className={styles.container}
        >
          <div className={styles.title}>الفبای روشنایی</div>
          <Button
            onClick={() => router.push('/shop/all')}
            variant="text"
            className="mt-1 ml-0 ml-md-4"
            style={{
              padding: "10px 50px",
              color: "#000000",
              backgroundColor: "transparent",
            }}
          >
                :)   بزن روشن شی
          </Button>
        </div>
      </div>
      <div>
        <img src="/images/slider.png" />
      </div>
      <div>
        <img src="/images/slider.png" />
      </div>
    </Carousel>
  );
};

export default ProductsSliderSection;
