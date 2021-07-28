import { OfferSection } from "@assets/styles/pages.style";
import { Button } from "@components/button/button";
import { useRouter } from "next/router";
import React from "react";
import Countdown from "@components/Countdown";
import MultiCarousel from "@components/carousel/carousel";

const DiscountSection: React.FC<any> = ({deviceType, products}) => {
  const router = useRouter();
  return (
    <OfferSection style={{ backgroundColor: "#F3F3F3" }}>
      <div style={{ margin: "0 -10px", direction: "rtl" }}>
        <div className="container">
          <div className="row mb-4">
            <div className="col-12 col-sm-6">
              <div className="d-flex mr-2 mr-sm-0">
                <Button
                  onClick={() => router.push("/shop/[slug]", `/shop/all`)}
                  style={{
                    backgroundColor: "transparent",
                    color: "black",
                    marginBottom: "2rem",
                    fontSize: "23px",
                  }}
                >
                  تخفیف های شگفت انگیز
                </Button>
                <img
                  className="mb-4 "
                  src="/images/sale.svg"
                  alt="sale"
                  style={{ width: 22, height: 34 }}
                />
              </div>
            </div>
            <div className="col-12 col-sm-6 ml-5 ml-sm-0 ">
              <Countdown endTime={5000000} />
            </div>
          </div>
        </div>

        <MultiCarousel data={products} deviceType={deviceType} />
      </div>
    </OfferSection>
  );
};

export default DiscountSection;
