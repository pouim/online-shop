import { OfferSection } from "@assets/styles/pages.style";
import classNames from "classnames";
import { useRouter } from "next/router";
import React from "react";

const PriceListsSection: React.FC<any> = ({deviceType, brands}) => {

  const router = useRouter();  
  return (
    <OfferSection className="py-1" style={{ backgroundColor: "#F3F3F3" }}>
      <div className="container ">
        <h2 className="text-center mb-0">لیست قیمت</h2>
        <div className="row">
          {brands &&
            brands.slice(0, 6).map((item: any, index: number) => {
              return (
                <div
                key={item.id}
                  className="col-4 col-md-2 my-3 my-md-5"
                  style={{ textAlign: "center" }}
                >
                  <button
                    className={classNames(
                      "btn btn-primary btn-block",
                      { "btn-lg": deviceType.desktop },
                      { "btn-sm": deviceType.mobile }
                    )}
                    style={{ borderRadius: "1.8rem", fontWeight: 100 }}
                    onClick={() =>
                      router.push(`/shop/brand/${item.id}`)
                    }
                  >
                    {item.name}
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </OfferSection>
  );
};


export default PriceListsSection;
