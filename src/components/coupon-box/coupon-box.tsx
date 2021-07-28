import React from 'react';
import {
  CouponBoxWrapper,
  Display,
  CouponCode,
  DiscountPrice,
  CancelBtn,
} from './coupon-box.style';
import { CloseIcon } from '../../assets/icons/CloseIcon';
import { Input } from '../../components/forms/input';
import { Button } from '../../components/button/button';

type CouponBoxProps = {
  onChange?: (key: any) => void;
  onClick?: any;
  value?: any;
  disabled?: any;
  className?: string;
  style?: any;
};

const CouponBox: React.FC<CouponBoxProps> = ({
  onChange,
  value,
  onClick,
  disabled,
  className,
  style,
  ...props
}) => {

  return (
    <CouponBoxWrapper
      className={className ? className : 'boxedCoupon'}
      style={style}
    >
      <Input
        onChange={onChange}
        value={value}
        placeholder='کد تخفیف خود را وارد کنید'
        {...props}
      />
      <Button
        type='button'
        onClick={onClick}
        disabled={disabled}
        padding='0 30px'
      >
        ثبت
      </Button>
    </CouponBoxWrapper>
  );
};

type CouponDisplayProps = {
  onClick?: any;
  code?: string;
  sign?: string;
  currency?: string;
  price?: number;
  style?: any;
  btnStyle?: any;
};

export const CouponDisplay: React.FC<CouponDisplayProps> = ({
  code,
  currency,
  price,
  sign,
  onClick,
  style,
  btnStyle,
}) => {
  return (
    <Display style={style} className='couponDisplayBox'>
      <CouponCode className='couponCodeText'>{code}</CouponCode>
      <DiscountPrice className='discountedPrice'>
        {sign}
        {currency}
        {price}
      </DiscountPrice>
      <CancelBtn onClick={onClick} style={btnStyle}>
        <CloseIcon />
      </CancelBtn>
    </Display>
  );
};

export default CouponBox;
