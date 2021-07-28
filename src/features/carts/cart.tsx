import React, { useState } from 'react';
import Link from 'next/link';
import toast, { Toaster } from "react-hot-toast";
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
} from './cart.style';
import { CloseIcon } from '@assets/icons/CloseIcon';
import { ShoppingBagLarge } from '@assets/icons/ShoppingBagLarge';
import { NoCartBag } from '@assets/icons/NoCartBag';
import { addCommas, removeCommas, digitsEnToFa } from "persian-tools2";

import CouponBox from '@components/coupon-box/coupon-box';

import { Scrollbars } from 'react-custom-scrollbars';
import { useCart } from '../../context/cart/use-cart';
import { CartItem } from '@components/cart-item/cart-item';
import { CURRENCY } from '@utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromCart, updateCart } from '@store/actions/Cart';

type CartPropsType = {
  style?: any;
  className?: string;
  scrollbarHeight?: string;
  onCloseBtnClick?: (e: any) => void;
};

// const APPLY_COUPON = gql`
//   mutation applyCoupon($code: String!) {
//     applyCoupon(code: $code) {
//       id
//       code
//       discountInPercent
//     }
//   }
// `;

const Cart: React.FC<CartPropsType> = ({
  style,
  className,
  onCloseBtnClick,
  scrollbarHeight,
}) => {
  const {
    items,
    coupon,
    addItem,
    removeItem,
    removeItemFromCart,
    calculatePrice,
    applyCoupon,
  } = useCart();
  const [couponText, setCoupon] = useState('');
  const [displayCoupon, showCoupon] = useState(false);
  const [error, setError] = useState('');
  const {token, user} = useSelector(state => state.auth);
  const {cart, cartItems} = useSelector(state => state.cart);
  
  const cartItemsCount = cartItems && cartItems.length;

  const dispatch = useDispatch();

  // const [appliedCoupon] = useMutation(APPLY_COUPON);
  // const { isRtl } = useLocale();
  const isRtl = true;

  // const getItemToUpdate = (id: any) => {
  //   return cartItems?.find((item: any) => item.product.id === id && item.color.id === selectedColor?.id);
  // }

  const handleApplyCoupon = async () => {
    // const { data }: any = await appliedCoupon({
    //   variables: { code: couponText },
    // });
    // if (data.applyCoupon && data.applyCoupon.discountInPercent) {
    //   setError('');
    //   applyCoupon(data.applyCoupon);
    //   setCoupon('');
    // } else {
    //   setError('Invalid Coupon');
    // }
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setCoupon(e.currentTarget.value);
  };

  const handleAddClick = (item: any) => {
    const cartID =  item.id
    const newData = {
      ID : item.product.id,
      colorID: item.color.id,
      quantity: item.quantity + 1,
    }
   dispatch(updateCart(newData, cartID));

  };

  const handleRemoveClick = (item: any) => {
    const cartID =  item.id
    const newData = {
      ID : item.product.id,
      colorID: item.color.id,
      quantity: item.quantity - 1,
    }
   dispatch(updateCart(newData, cartID));
  };

  const toggleCoupon = () => {
    showCoupon(true);
  };

  return (
    <CartPopupBody className={className} style={style}>
      <PopupHeader>
        <PopupItemCount>
          <ShoppingBagLarge width="19px" height="24px" />
          <div className="d-flex flex-row-reverse ml-2">
            {cartItemsCount}
            <span> </span>
            {cartItemsCount > 1 ? <div>آیتم</div> : <div>آیتم</div>}
          </div>
        </PopupItemCount>

        <CloseButton onClick={onCloseBtnClick}>
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
            cartItems.map((item: { id: any }) => (
              <CartItem
                key={`cartItem-${item.id}`}
                onIncrement={() => handleAddClick(item)}
                onDecrement={() => handleRemoveClick(item)}
                onRemove={() => dispatch(deleteFromCart(item.id))}
                data={item}
              />
            ))
          ) : (
            <>
              <NoProductImg>
                <NoCartBag />
              </NoProductImg>
              <NoProductMsg>! سبد خرید شما خالی است</NoProductMsg>
            </>
          )}
        </ItemWrapper>
      </Scrollbars>

      <CheckoutButtonWrapper>
        <PromoCode>
          {!coupon?.discountInPercent ? (
            <>
              {!displayCoupon ? (
                <button onClick={toggleCoupon}>کد تخفیف دارید؟</button>
              ) : (
                <CouponBoxWrapper>
                  <CouponBox
                    onChange={handleChange}
                    value={couponText}
                    onClick={handleApplyCoupon}
                    disabled={!couponText.length || !items.length}
                    style={{
                      boxShadow: "0 3px 6px rgba(0, 0, 0, 0.06)",
                    }}
                  />
                  {error ? <ErrorMsg>{error}</ErrorMsg> : ""}
                </CouponBoxWrapper>
              )}
            </>
          ) : (
            <CouponCode>
              کد تخفیف با موفقیت ثبت شد
              <span>{coupon.code}</span>
            </CouponCode>
          )}
        </PromoCode>

        {cartItemsCount !== 0 && token ? (
          <Link href="/checkout">
            <CheckoutButton onClick={onCloseBtnClick}>
              <>
                <Title>پرداخت نهایی</Title>
                <PriceBox>
                  {cart && digitsEnToFa(addCommas(cart.total_price))}
                  <span> </span>
                  {CURRENCY}
                </PriceBox>
              </>
            </CheckoutButton>
          </Link>
        ) : !token ? (
          <>
            <Toaster />
            <CheckoutButton
              onClick={() =>
                toast.error(
                  "برای ادامه فرآیند پرداخت لطفا ابتدا وارد حساب کاربری خود شوید",
                  {
                    duration: 4000,
                    style: {
                      minWidth: "500px",
                    },
                  }
                )
              }
            >
              <>
                <Title>پرداخت نهایی</Title>
                <PriceBox>
                  {calculatePrice()}
                  <span> </span>
                  {CURRENCY}
                </PriceBox>
              </>
            </CheckoutButton>
          </>
        ) : (
          <CheckoutButton>
            <>
              <Title>پرداخت نهایی</Title>
              <PriceBox>
                {calculatePrice()}
                <span> </span>
                {CURRENCY}
              </PriceBox>
            </>
          </CheckoutButton>
        )}
      </CheckoutButtonWrapper>
    </CartPopupBody>
  );
};

export default Cart;
