import { OfferSection } from "@assets/styles/pages.style";
import { Button } from "@components/button/button";
import Link from "next/link";
import MultiCarousel from "@components/carousel/carousel";
import React from "react";
import { useRouter } from "next/router";

const LetmeDescribeYouSection: React.FC<any> = ({ deviceType, products }) => {
  const router = useRouter();
  return (
    <OfferSection className="py-2" style={{ backgroundColor: "#F3F3F3" }}>
      <div style={{ margin: "0 -10px", direction: "rtl" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            onClick={() =>
              router.push("/shop/all")
            }
            style={{
              backgroundColor: "transparent",
              color: "black",
              marginBottom: "2rem",
              fontSize: "23px",
            }}
          >
            بزار روشنت کنم !
          </Button>

          <Link href="/shop/all">
            <a className="text-decoration-none">
              <div className="d-flex align-items-center">
                <Button
                  variant="text"
                  style={{ color: "#000000" }}
                  onClick={() => router.push("/shop/all")}
                >
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

export default LetmeDescribeYouSection;
