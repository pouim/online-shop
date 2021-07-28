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
  ItemWrapper,
  CouponBoxWrapper,
  CouponCode,
  ErrorMsg,
} from './cart.style';
import { CloseIcon } from '@assets/icons/CloseIcon';
import { ShoppingBagLarge } from '@assets/icons/ShoppingBagLarge';
import { CURRENCY } from '@utils/constant';
import CouponBox from '@components/coupon-box/coupon-box';

import { Scrollbars } from 'react-custom-scrollbars';
import { useCart } from '@context/cart/use-cart';
import { TextCartItem } from '@components/cart-item/text-cart-item';

type CartPropsType = {
  style?: any;
  className?: string;
  scrollbarHeight?: string;
  onCloseBtnClick?: (e: any) => void;
  onCheckout?: (e: any) => void;
};


const FixedCart: React.FC<CartPropsType> = ({
  style,
  className,
  onCloseBtnClick,
  scrollbarHeight,
  onCheckout,
}) => {
  const {
    items,
    coupon,
    addItem,
    removeItem,
    removeItemFromCart,
    cartItemsCount,
    calculatePrice,
    applyCoupon,
  } = useCart();
  const [couponText, setCoupon] = useState('');
  const [displayCoupon, showCoupon] = useState(false);
  const [error, setError] = useState('');

  const isRtl = true;

  const handleApplyCoupon = async () => {
  
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setCoupon(e.currentTarget.value);
  };

  const toggleCoupon = () => {
    showCoupon(true);
  };

  return (
    <CartPopupBody className={className} style={style}>
      <PopupHeader>
        <PopupItemCount>
          <ShoppingBagLarge width="19px" height="24px" />
          <span>
            {cartItemsCount}
            &nbsp;
             items
          </span>
        </PopupItemCount>

        <CloseButton onClick={onCloseBtnClick} className="fixedCartClose">
          <CloseIcon />
        </CloseButton>
      </PopupHeader>

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
        <ItemWrapper className="items-wrapper">
          {!!cartItemsCount ? (
            items.map((item: { id: any; }) => (
              <TextCartItem
                key={`cartItem-${item.id}`}
                onIncrement={() => addItem(item)}
                onDecrement={() => removeItem(item)}
                onRemove={() => removeItemFromCart(item)}
                data={item}
              />
            ))
          ) : (
            <NoProductMsg>
              No products found
            </NoProductMsg>
          )}
        </ItemWrapper>
      </Scrollbars>

      <CheckoutButtonWrapper>
        <PromoCode>
          {!coupon?.discountInPercent ? (
            <>
              {!displayCoupon ? (
                <button onClick={toggleCoupon}>
                  Have a special code?
                </button>
              ) : (
                <CouponBoxWrapper>
                  <CouponBox
                    onChange={handleChange}
                    value={couponText}
                    onClick={handleApplyCoupon}
                    disabled={!couponText.length || !items.length}
                    style={{
                      boxShadow: '0 3px 6px rgba(0, 0, 0, 0.06)',
                    }}
                  />
                  {error ? <ErrorMsg>{error}</ErrorMsg> : ''}
                </CouponBoxWrapper>
              )}
            </>
          ) : (
            <CouponCode>
              Coupon Applied
              <span>{coupon.code}</span>
            </CouponCode>
          )}
        </PromoCode>

        {cartItemsCount !== 0 ? (
          <Link href="/checkout">
            <CheckoutButton onClick={onCheckout}>
              <>
                <Title>
                Checkout
                </Title>
                <PriceBox>
                  {CURRENCY}
                  {calculatePrice()}
                </PriceBox>
              </>
            </CheckoutButton>
          </Link>
        ) : (
          <CheckoutButton>
            <>
              <Title>
                Checkout
              </Title>
              <PriceBox>
                {CURRENCY}
                {calculatePrice()}
              </PriceBox>
            </>
          </CheckoutButton>
        )}
      </CheckoutButtonWrapper>
    </CartPopupBody>
  );
};

export default FixedCart;
