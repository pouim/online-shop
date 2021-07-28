import React from "react";
import { createGlobalStyle } from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { openModal, closeModal } from "@redq/reuse-modal";
import Cart from "./cart";
import CartPopupButton, {
  BoxedCartButton,
} from "@components/cart-popup/cart-popup-button";
import { CartSlidePopup } from "./cart.style";
import { addCommas, removeCommas, digitsEnToFa } from "persian-tools2";
import { useCart } from "../../context/cart/use-cart";
import { useSelector } from "react-redux";
import { AppState } from "@store/store";

const CartPopupStyle = createGlobalStyle`
  .cartPopup{
    top: auto !important;
    left: auto !important;
    bottom: 50px !important;
    right: 50px !important;
    box-shadow: ${themeGet("shadows.big", "0 21px 36px rgba(0, 0, 0, 0.16)")};
    transform-origin: bottom right;

    @media (max-width: 580px) {
      max-width: none!important;
      width: 100% !important;
      bottom: 0 !important;
      left: 0!important;
      background: ${themeGet("colors.white", "#ffffff")};
      overflow: initial !important;
      transform-origin: bottom center;
    }
  }
`;

type CartProps = {
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};

const CartPopUp: React.FC<CartProps> = ({
  deviceType: { mobile, tablet, desktop },
}) => {
  const { isOpen, toggleCart, calculatePrice } = useCart();
  const {cartItems, cart} = useSelector((state: AppState) => state.cart);
  const cartItemsCount = cartItems && cartItems.length;
  const totalPrice = cart && cart.total_price;
  
  const handleModal = () => {
    openModal({
      show: true,
      config: {
        className: "cartPopup",
        width: "auto",
        height: "auto",
        enableResizing: false,
        disableDragging: true,
        transition: {
          tension: 360,
          friction: 40,
        },
      },
      closeOnClickOutside: true,
      component: Cart,
      closeComponent: () => <div />,
      componentProps: { onCloseBtnClick: closeModal, scrollbarHeight: 330 },
    });
  };

  let cartSliderClass = isOpen === true ? "cartPopupFixed" : "";

  return (
    <>
      {mobile ? (
        <>
          <CartPopupStyle />
          <CartPopupButton
            className="product-cart"
            itemCount={cartItemsCount}
            itemPostfix={cartItemsCount > 1 ? <div>آیتم</div> : <div>آیتم</div>}
            price={totalPrice}
            pricePrefix="تومان"
            onClick={handleModal}
          />
        </>
      ) : tablet ? (
        <>
          <CartSlidePopup className={cartSliderClass}>
            {isOpen && (
              <Cart onCloseBtnClick={toggleCart} scrollbarHeight="100vh" />
            )}
          </CartSlidePopup>

          <BoxedCartButton
            className="product-cart"
            itemCount={cartItemsCount}
            itemPostfix={
              cartItemsCount > 1 ? <div>آیتم</div> : <div>آیتم</div>
            }
            price={totalPrice}
            pricePrefix="تومان"
            onClick={toggleCart}
          />
        </>
      ) : (
        <>
          <CartSlidePopup className={cartSliderClass}>
            {isOpen && (
              <Cart onCloseBtnClick={toggleCart} scrollbarHeight="100vh" />
            )}
          </CartSlidePopup>

          {/* <BoxedCartButton
            className='product-cart'
            itemCount={cartItemsCount}
            itemPostfix={
              cartItemsCount > 1 ? (
                <div>items</div>
              ) : (
                <div>item</div>
              )
            }
            price={calculatePrice()}
            pricePrefix="تومان"
            onClick={toggleCart}
          /> */}
        </>
      )}
    </>
  );
};

export default CartPopUp;
