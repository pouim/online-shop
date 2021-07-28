import React from 'react';
import {
  CartPopupButtonStyled,
  ButtonImgBox,
  ItemCount,
  PriceBox,
  CartPopupBoxButton,
  PriceBoxAlt,
  TotalItems,
} from './cart-popup.style';
import { ShoppingBag } from '@assets/icons/ShoppingBag';
import { addCommas, removeCommas, digitsEnToFa } from "persian-tools2";

type CartButtonProps = {
  style?: React.CSSProperties;
  itemCount?: number;
  itemPostfix?: any;
  price?: number;
  pricePrefix?: string;
  className?: string;
  onClick?: (e: any) => void;
};

const CartPopupButton: React.FC<CartButtonProps> = ({
  itemCount,
  itemPostfix = 'items',
  price,
  pricePrefix = '$',
  style,
  onClick,
  className,
}) => (
  <CartPopupButtonStyled style={style} onClick={onClick} className={className}>
    <ButtonImgBox>
      <ShoppingBag />
    </ButtonImgBox>
    <ItemCount>
    {itemCount} {itemPostfix}
    </ItemCount>
    <PriceBox>
      
      {/* {price} */}
      {parseFloat(`${price}`)}
      <span> </span>
      {pricePrefix}
    </PriceBox>
  </CartPopupButtonStyled>
);

export const BoxedCartButton: React.FC<CartButtonProps> = ({
  itemCount,
  itemPostfix = 'items',
  price,
  pricePrefix = '$',
  style,
  onClick,
  className,
}) => (
  <CartPopupBoxButton style={style} onClick={onClick} className={className}>
    <TotalItems>
      <ShoppingBag />
      {itemCount} {itemPostfix}
    </TotalItems>
    <PriceBoxAlt>
      {digitsEnToFa(addCommas(price && price))}
      <span> </span>
      {pricePrefix}
    </PriceBoxAlt>
  </CartPopupBoxButton>
);

export default CartPopupButton;
