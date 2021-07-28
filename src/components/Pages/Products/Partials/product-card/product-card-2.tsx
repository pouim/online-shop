// product card for general
import React from "react";
import Image from "@components/image/image";
import { Button } from "@components/button/button";
import {
  ProductCardWrapper,
  ProductImageWrapper,
  ProductInfo,
  DiscountPercent,
  ButtonText,
} from "./product-card.style";
import { useCart } from "@context/cart/use-cart";
import { Counter } from "@components/counter/counter-1/counter";
import { cartAnimation } from "@utils/cart-animation";
import { CartIcon } from "@assets/icons/CartIcon";
import { alignItems } from "styled-system";
import Rating from "@components/Rating/Rating";
import classNames from "classnames";
import styles from './styles.module.scss';

type ProductCardProps = {
  title: string;
  image: any;
  weight?: string;
  currency?: string;
  description?: string;
  price?: number;
  salePrice?: number;
  discountInPercent?: number;
  data?: any;
  onClick?: (e: any) => void;
  onChange?: (e: any) => void;
  increment?: (e: any) => void;
  decrement?: (e: any) => void;
  cartProducts?: any;
  addToCart?: any;
  updateCart?: any;
  value?: any;
  deviceType?: any;
  rating: number;
};

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  image,
  weight,
  price,
  salePrice,
  discountInPercent,
  cartProducts,
  addToCart,
  updateCart,
  value,
  currency,
  onChange,
  increment,
  decrement,
  rating,
  data,
  deviceType,
  onClick,
  ...props
}) => {
  const { addItem, removeItem, getItem, isInCart, items } = useCart();
  const handleAddClick = (e: any) => {
    // e.stopPropagation();
    addItem(data);
    if (!isInCart(data.id)) {
      cartAnimation(e);
    }
  };
  const handleRemoveClick = () => {
    // e.stopPropagation();
    removeItem(data);
  };
  return (
    <ProductCardWrapper onClick={onClick} className="product-card">
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          position: "relative",
          marginRight: "1rem",
          padding: "1rem 0",
        }}
      >
        <div
          style={{
            padding: "0.3rem",
            backgroundColor: "#FF1E1E",
            borderRadius: "2rem",
            marginRight: "0.3rem",
          }}
        />
        <div
          style={{
            padding: "0.3rem",
            backgroundColor: "#F9D832",
            borderRadius: "2rem",
            marginRight: "0.3rem",
          }}
        />
        <div
          style={{
            padding: "0.3rem",
            backgroundColor: "#69FF3D",
            borderRadius: "2rem",
          }}
        />
      </div>
      <ProductImageWrapper>
        <Image
          url={image}
          className="product-image"
          style={{ position: "relative" }}
          alt={title}
        />
      </ProductImageWrapper>
      <ProductInfo>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h3
            className="product-title"
            style={{ direction: "rtl", textAlign: "right" }}
          >
            {title}
          </h3>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {discountInPercent ? (
                  <>
                    <DiscountPercent style={{ marginRight: "2rem" }}>
                      {discountInPercent}%
                    </DiscountPercent>
                  </>
                ) : (
                  ""
                )}
                {discountInPercent ? (
                  <span style={{ direction: "rtl", fontSize: "1.09 rem" }}>
                    <s style={{ color: "red" }}>{price}</s>
                  </span>
                ) : (
                  ""
                )}
              </div>
              <h5
                className="product-price"
                style={{ direction: "rtl", textAlign: "right", fontWeight: 'bold' }}
              >
                {salePrice ? salePrice : price}
                <span style={{ marginRight: ".5rem" }}></span>
                {currency}
              </h5>
            </div>
            <div className="d-none d-sm-flex flex-column mt-3"
            >
              <Rating ratingNumber={rating} />
              <p style={{ textAlign: "right" }}>4 از 2536 رای</p>
            </div>
          </div>
          <div className=" d-flex flex-column  d-sm-none mt-3"
            >
              <div style={{marginLeft: '40%'}}><Rating ratingNumber={rating} /></div>
              <p style={{ textAlign: "right" }}>4 از 2536 رای</p>
            </div>
        </div>
      </ProductInfo>
    </ProductCardWrapper>
    // <div
    //   className={classNames(styles.wrapper, "container  px-sm-3 ")}
    // >
    //   <div className="row justify-content-end">
    //     <div
    //       style={{
    //         display: "flex",
    //         justifyContent: "flex-end",
    //         position: "relative",
    //         marginRight: "1rem",
    //         padding: "1rem 0",
    //       }}
    //     >
    //       <div
    //         style={{
    //           padding: "0.3rem",
    //           backgroundColor: "#FF1E1E",
    //           borderRadius: "2rem",
    //           marginRight: "0.3rem",
    //         }}
    //       />
    //       <div
    //         style={{
    //           padding: "0.3rem",
    //           backgroundColor: "#F9D832",
    //           borderRadius: "2rem",
    //           marginRight: "0.3rem",
    //         }}
    //       />
    //       <div
    //         style={{
    //           padding: "0.3rem",
    //           backgroundColor: "#69FF3D",
    //           borderRadius: "2rem",
    //         }}
    //       />
    //     </div>
    //   </div>

    //   <div className="row justify-content-center">
    //     <Image
    //       url={image}
    //       className="product-image"
    //       style={{ position: "relative" }}
    //       alt={title}
    //     />
    //   </div>

    //   <div className="row justify-content-end mr-3 my-2">
    //     <h4 className="text-right" style={{fontSize: '1.1rem', fontWeight: 'bold'}}>{title}</h4>
    //   </div>

    //   {discountInPercent && (
    //     <div className="d-flex ml-0 ml-sm-3 mb-2">
    //       <DiscountPercent style={{ marginRight: "2rem" }}>
    //         {discountInPercent}%
    //       </DiscountPercent>
    //       <span style={{ direction: "rtl", fontSize: "1.09 rem" }}>
    //         <a style={{ color: "red" }}>{price}</a>
    //       </span>
    //     </div>
    //   )}

    //   <div className="d-flex  flex-wrap justify-content-between  mx-3 ">
    //     <div className=" d-flex ml-4 ml-sm-0 mb-2 mb-sm-0">
    //       <h5 style={{fontSize: '1rem', fontWeight: 'bold'}} className="mr-1">تومان</h5>
    //       <h5 style={{fontSize: '1rem', fontWeight: 'bold'}}>{salePrice ? salePrice : price}</h5>
    //     </div>
    //     <div className="ml-3 ml-sm-0">
    //       <Rating ratingNumber={rating} />
    //     </div>
    //   </div>

    //   <div className="row justify-content-end mr-4">
    //     <p style={{ textAlign: "right" }}>4 از 2536 رای</p>
    //   </div>
    // </div>
  );
};

export default ProductCard;
