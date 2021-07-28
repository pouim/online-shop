import { OfferSection } from "@assets/styles/pages.style";
import { Button } from "@components/button/button";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import MultiCarousel from "@components/carousel/carousel";

const MostSelledSection: React.FC<any> = ({deviceType, products}) => {
  const router = useRouter()  
  return (
    <OfferSection className="py-3" style={{ backgroundColor: "#F3F3F3" }}>
      <div style={{ margin: "0 -10px", direction: "rtl" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            onClick={() => router.push("/shop/trend")}
            style={{
              backgroundColor: "transparent",
              color: "black",
              marginBottom: "2rem",
              fontSize: "23px",
            }}
          >
            پرفروش ترین ها
          </Button>
          <Link href="/shop/trend">
            <a className="text-decoration-none">
              <div className="d-flex align-items-center">
                <Button variant="text" style={{ color: "#000000" }}>
                  مشاهده همه
                </Button>
                <img src="/next.svg" style={{ height: 13, width: 13 }} />
              </div>
            </a>
          </Link>
        </div>

        <MultiCarousel data={products} deviceType={deviceType} />
      </div>
    </OfferSection>
  );
};


export default MostSelledSection;
