// product card for general
import React from "react";
import Image from "@components/image/image";
import { openModal } from "@redq/reuse-modal";
import AuthenticationForm from "@features/authentication-form";
import { Button } from "@components/button/button";
import { addCommas, removeCommas, digitsEnToFa } from "persian-tools2";
import {
  ProductCardWrapper,
  ProductImageWrapper,
  ProductInfo,
  DiscountPercent,
  ButtonText,
  UnAvailable,
} from "./product-card.style";
import { useCart } from "@context/cart/use-cart";
import { Counter } from "@components/counter/counter-1/counter";
import { cartAnimation } from "@utils/cart-animation";
import { CartIcon } from "@assets/icons/CartIcon";
import { alignItems } from "styled-system";
import Rating from "@components/Rating/Rating";
import classNames from "classnames";
import styles from "./styles.module.scss";
import { CircleIcon } from "@assets/icons/CircleIcon";
import { ProductCartBtn } from "../product-details/product-details.style";
import { HeartIcon } from "@assets/icons/Heart";
import { RiHeart3Fill } from "react-icons/ri";
import { BoldHeartIcon } from "@assets/icons/BoldHeart";
import { useDispatch, useSelector } from "react-redux";
import { ItemImgWrapper } from "@components/Pages/Shop/Partials/MobileSidebar/MobileSidebar.style";
import { dispatch } from "react-hot-toast";
import { addToFavorite, deleteFromFavorite } from "@store/actions/Favorities";
import { addToCart } from "@store/actions/Cart";
import { onSingInRefresh } from "@store/actions";
import { AppState } from "@store/store";

type ProductCardProps = {
  title: string;
  id: any;
  image: any;
  available: boolean;
  weight?: string;
  currency?: string;
  description?: string;
  price?: number;
  salePrice?: number;
  discountInPercent?: number;
  data?: any;
  onClick: (e: any) => void;
  onChange?: (e: any) => void;
  increment?: (e: any) => void;
  decrement?: (e: any) => void;
  cartProducts?: any;
  addToCart?: any;
  updateCart?: any;
  value?: any;
  deviceType?: any;
  rating: number;
  colors?: any[];
};

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  image,
  weight,
  price,
  available,
  salePrice,
  discountInPercent,
  cartProducts,
  // addToCart,
  updateCart,
  value,
  currency,
  onChange,
  increment,
  decrement,
  rating,
  data,
  colors,
  deviceType,
  onClick,
  ...props
}) => {
  const { addItem, removeItem, getItem, isInCart, items } = useCart();
  const {favorities, ids} = useSelector((state: AppState) => state.favorities);
  const {token} = useSelector((state: AppState) => state.auth);
  const dispatch = useDispatch();
  const handleAddClick = (e: any) => {
    e.stopPropagation();
    // addItem(data);
    // if (!isInCart(data.id)) {
    //   // cartAnimation(e);
    // }
    
  };
  const handleJoin = () => {
    dispatch(onSingInRefresh());
    openModal({
      show: true,
      overlayClassName: "quick-view-overlay",
      closeOnClickOutside: true,
      component: AuthenticationForm,
      closeComponent: "",
      config: {
        enableResizing: false,
        disableDragging: true,
        className: "quick-view-modal",
        width: 458,
        height: "auto",
      },
    });
  };


  const handleRemoveClick = (e: any) => {
    e.stopPropagation();
    removeItem(data);
  };

  const isInFavoriteHandler = (id: any) => {
    return favorities?.some((item: { id: any; }) => item.id === id);
  };


  const onAddToFavoriteHandler = () => {
    if(!token) {
      handleJoin();
    }
    const ids = favorities?.map((item: any) => item.id);
    const newIDs = [...ids, id];
    dispatch(addToFavorite(newIDs, data));
  }

  const onRemoveFromFavoriteHandler = () => {
    const ids = favorities?.map((item: any) => item.id);
    const newIDs = ids.filter((item: any) => item !== id);
    dispatch(deleteFromFavorite(newIDs, id));
  }

  return (
    <ProductCardWrapper className="product-card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          position: "relative",
          marginRight: "1rem",
          marginLeft: "1rem",
          padding: "1rem 0",
        }}
      >
        {isInFavoriteHandler(id) ? (
          <div onClick={onRemoveFromFavoriteHandler}>
            {" "}
            <BoldHeartIcon width={25} height={25} color="#DC143C" />{" "}
          </div>
        ) : (
          <div onClick={onAddToFavoriteHandler}>
            <HeartIcon width={21} height={21} color="#516EFF" />
          </div>
        )}

        <div className="d-flex py-2">
          {colors &&
            colors.map((color) => {
              const colorCode = color.color_code;
              return (
                <div
                  style={{
                    padding: "0.3rem",
                    backgroundColor: colorCode,
                    borderRadius: "2rem",
                    marginRight: "0.3rem",
                  }}
                />
              );
            })}
        </div>
      </div>
      <ProductImageWrapper onClick={() => onClick(id)}>
        <Image
          url={image}
          className="product-image"
          style={{ position: "relative" }}
          alt={title}
        />
      </ProductImageWrapper>
      <ProductInfo>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            className={styles.title}
            style={{ direction: "rtl", textAlign: "right" }}
          >
            {title}
          </div>
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
                    <s style={{ color: "red" }}>{digitsEnToFa(price)}</s>
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div
                className={styles.price}
                style={{
                  direction: "rtl",
                  textAlign: "right",
                  fontWeight: "bold",
                }}
              >
                {salePrice ? digitsEnToFa(addCommas(salePrice)) : digitsEnToFa(addCommas(price))}
                <span style={{ marginRight: ".5rem" }}></span>
                {currency}
              </div>
              {!available && <UnAvailable>ناموجود</UnAvailable>}
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "2rem",
              }}
            >
              <Rating ratingNumber={rating} />
              <p style={{ textAlign: "right" }}>4 از 2536 رای</p>
            </div>
          </div>
        </div>
      </ProductInfo>
    </ProductCardWrapper>
  );
};

export default ProductCard;
