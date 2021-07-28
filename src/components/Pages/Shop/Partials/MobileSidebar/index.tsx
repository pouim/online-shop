import React, { useState } from 'react';
import Link from 'next/link';
import {
  CartPopupBody,
  PopupHeader,
  PopupItemCount,
  CloseButton,
  PromoCode,
  CheckoutButtonWrapper,
  CheckoutButton,
  Title,
  PriceBox,
  NoProductMsg,
  NoProductImg,
  ItemWrapper,
  CouponBoxWrapper,
  CouponCode,
  ErrorMsg,
} from './MobileSidebar.style';
import { CloseIcon } from '@assets/icons/CloseIcon';



import { Scrollbars } from 'react-custom-scrollbars';
import BrandsCategoryWidget from '../Sidebar/SidebarWidgets/BrandsCategoryWidget';
import { ColorCategories } from 'src/site-settings/Sidebar';
import ColorSwitchWidget from '../Sidebar/SidebarWidgets/ColorFilterWidget';


type CartPropsType = {
  style?: any;
  className?: string;
  children?: any;
  scrollbarHeight?: string;
  onCloseBtnClick?: (e: any) => void;
};



const Cart: React.FC<CartPropsType> = ({
  style,
  className,
  onCloseBtnClick,
  scrollbarHeight,
  children,
}) => {

  const isRtl = false;






  return (
    <CartPopupBody className={className} style={style}>

      <Scrollbars
        universal
        autoHide
        autoHeight
        autoHeightMax={scrollbarHeight}
        renderView={(props) => (
          <div
            {...props}
            style={{
              ...props.style,
              marginLeft: isRtl ? props.style.marginRight : 0,
              marginRight: isRtl ? 0 : props.style.marginRight,
            }}
          />
        )}
      >
        <ItemWrapper className='items-wrapper'>
           {children}
        </ItemWrapper>
      </Scrollbars>
    </CartPopupBody>
  );
};

export default Cart;
