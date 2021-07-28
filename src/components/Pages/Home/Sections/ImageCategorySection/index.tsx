import { OfferSection } from "@assets/styles/pages.style";
import { useRouter } from "next/router";
import React from "react";
import styles from "../../styles.module.scss";

const ImageCategorySection = () => {
  const router = useRouter();
  return (
    <OfferSection style={{ backgroundColor: "#F3F3F3" }}>
      <div className="container">
        <div className="row mb-3">
          <div
            className="col-sm-5 position-relative mb-3 mb-md-0"
            onClick={() => router.push("/shop/category/2")}
            style={{cursor: 'pointer'}}
          >
            <img src="/images/shop/cats/1.png" className={styles.imageBox} />
            <h2
              className="position-absolute"
              style={{ top: "30%", left: "30%" }}
            >
              لامپ تزئینی
            </h2>
          </div>

          <div
            className="col-sm-7 position-relative mb-1 mb-md-0"
            onClick={() => router.push("/shop/category/2")}
            style={{cursor: 'pointer'}}
          >
            <img src="/images/shop/cats/2.png" className={styles.imageBox} />
            <h2
              className="position-absolute"
              style={{ top: "50%", left: "20%" }}
            >
              لامپ سقفی
            </h2>
          </div>
        </div>

        <div className="row">
          <div
            className="col-sm-7 position-relative mb-3 mb-md-0"
            onClick={() => router.push("/shop/category/2")}
            style={{cursor: 'pointer'}}
          >
            <img src="/images/shop/cats/3.png" className={styles.imageBox} />
            <h2
              className="position-absolute "
              style={{ top: "30%", left: "20%" }}
            >
              لوازم و ابزار
            </h2>
          </div>

          <div
            className="col-sm-5 position-relative mb-3 mb-md-0"
            onClick={() => router.push("/shop/category/2")}
            style={{cursor: 'pointer'}}
          >
            <img src="/images/shop/cats/4.png" className={styles.imageBox} />

            <h2
              className="position-absolute"
              style={{ top: "30%", left: "20%" }}
            >
              لامپ مطالعه
            </h2>
          </div>
        </div>
      </div>
    </OfferSection>
  );
};

export default ImageCategorySection;
