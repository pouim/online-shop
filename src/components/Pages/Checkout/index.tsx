import React, { FC } from "react";
import styles from "./styles.module.scss";
import cn from "classnames";
import CheckoutCard from "./Checkout-Card";
import { OfferSection } from "@assets/styles/pages.style";
import MultiCarousel from "@components/carousel/carousel";
import { CartItems } from "src/site-settings/carts";
import Carousel from "react-multi-carousel";
import { LocationIcon } from "@assets/icons/Location";
import { EnvelopeIcon } from "@assets/icons/Envelope";
import { CallIcon } from "@assets/icons/Call";
import { ProfileIcon } from "@assets/icons/Profile";
import classNames from "classnames";
import { Button } from "@components/button/button";
import CouponBox from "@components/coupon-box/coupon-box";

interface CheckoutProps {
  deviceType: any;
}

const Checkout: FC<CheckoutProps> = ({ deviceType }) => {
  return (
    <div className="container-fluid py-2 px-0 mx-0">
      <div className="row">
        <div className="col-12">
          <MultiCarousel
            data={CartItems}
            deviceType={deviceType}
            component={CheckoutCard}
            containerClass={styles.CarouselContainer}
          />
        </div>
        <div className="col-12 mt-4">
          <div className={classNames("Container ")}>
            <div className="row flex-row-reverse">
              <div className={classNames(styles.boxWrapper, "col-8 p-3")}>
                <div>
                  <h5 style={{ letterSpacing: ".03rem", textAlign: "right" }}>
                    تهران،خیابان ولیعصر، روبری پارک ملت،برج ملت،طبقه 8،واحد 4
                  </h5>
                </div>
                <div className="d-flex flex-row-reverse ">
                  <div className="d-flex flex-row-reverse align-items-center ml-3 ml-sm-5">
                    <LocationIcon width={12} height={12} />
                    <p className={classNames(styles.locationInfoTitle, "mr-1")}>
                      تهران، تهران
                    </p>
                  </div>

                  <div className="d-flex flex-row-reverse align-items-center ml-3 ml-sm-5">
                    <EnvelopeIcon width={12} height={12} />
                    <p className={classNames(styles.locationInfoTitle, "mr-1")}>
                      3456798654
                    </p>
                  </div>

                  <div className="d-flex flex-row-reverse align-items-center ml-3 ml-sm-5">
                    <CallIcon width={12} height={12} />
                    <p className={classNames(styles.locationInfoTitle, "mr-1")}>
                      09059245092
                    </p>
                  </div>

                  <div className="d-flex flex-row-reverse align-items-center ml-3 ml-sm-5">
                    <ProfileIcon width={12} height={12} />
                    <p className={classNames(styles.locationInfoTitle, "mr-1")}>
                      بهزاد کیماسی
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div
                  className={classNames(
                    styles.boxWrapper,
                    "d-flex flex-row-reverse align-items-center justify-content-around p-3"
                  )}
                >
                  <img
                    className={styles.image}
                    src="/images/shop/pishtaz.png"
                    alt="pishtaz"
                  />
                  <div className="text-center ">
                    <h5>ارسال به وسیله پست پیشتاز</h5>
                    <h6>(2 تا 4 روز کاری)</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 mt-4">
          <div className={classNames("Container ")}>
            <div className="row flex-row-reverse">
              <div className={classNames(styles.boxWrapper, "col-8 p-2 ")}>
                <div className="d-flex flex-row-reverse align-items-center justify-content-around">
                  <div>
                    <div className={classNames(styles.label, "text-center")}>
                      قیمت محصولات
                    </div>
                    <div
                      className={classNames(
                        styles.price,
                        "d-flex flex-row-reverse justify-content-center"
                      )}
                    >
                      <div className="ml-1">23000</div>
                      <div>تومان</div>
                    </div>
                  </div>

                  <div>
                    <div className={classNames(styles.label, "text-center")}>
                      تخفیف محصولات
                    </div>
                    <div
                      className={classNames(
                        styles.price,
                        "d-flex flex-row-reverse justify-content-center"
                      )}
                    >
                      <div className="ml-1">23000</div>
                      <div>تومان</div>
                    </div>
                  </div>

                  <div>
                    <div className={classNames(styles.label, "text-center")}>
                      قیمت نهایی
                    </div>
                    <div
                      className={classNames(
                        styles.price,
                        "d-flex flex-row-reverse justify-content-center"
                      )}
                    >
                      <div className="ml-1">23000</div>
                      <div>تومان</div>
                    </div>
                  </div>

                  <div>
                    <CouponBox />
                  </div>
                </div>
              </div>

              <div className="col-4">
                <div>
                  <button className="btn btn-primary btn-block btn-lg p-3">
                    ثبت و پرداخت نهایی
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
