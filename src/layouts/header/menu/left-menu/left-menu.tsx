import React from "react";
import Router, { useRouter } from "next/router";
import AuthMenu from "../auth-menu";

// import { MenuDown } from '../../../../assets/icons/MenuDown';

import {
  MainMenu,
  MenuItem,
  SelectedItem,
  Icon,
  Arrow,
  LeftMenuBox,
} from "./left-menu.style";
import Logo from "src/layouts/logo/logo";
import { CartIcon } from "@assets/icons/Cart";
import { useCart } from "@context/cart/use-cart";
import { useSelector } from "react-redux";

type Props = {
  onLogout?: () => void;
  onJoin?: () => void;
  avatar: string;
  isAuthenticated: boolean;
};

export const LeftMenu: React.FC<Props> = ({
  onJoin,
  onLogout,
  avatar,
  isAuthenticated,
}) => {
  const { isOpen, toggleCart, calculatePrice } = useCart();

  const { cartItems } = useSelector((state) => state.cart);
  const cartItemsCount = cartItems.length;
  return (
    <>
      {/* <img src="/Cart.svg" alt="cart" style={{height: 50, width: 40}} /> */}

      <div className="d-flex">
        <div
          className="mr-5 position-relative"
          style={{ cursor: "pointer" }}
          onClick={toggleCart}
        >
          <CartIcon height={39} width={40} />
          {cartItemsCount > 0 && (
            <div
              style={{
                backgroundColor: "#637CFF",
                width: "25px",
                height: "25px",
                position: "absolute",
                borderRadius: "50%",
                textAlign: "center",
                color: "#FFF",
                fontSize: "18px",
                top: 23,
                left: 30,
                userSelect: "none",
              }}
            >
              {cartItemsCount}
            </div>
          )}
        </div>
        <AuthMenu
          avatar={avatar}
          onJoin={onJoin}
          onLogout={onLogout}
          isAuthenticated={isAuthenticated}
        />
      </div>
    </>
  );
};
