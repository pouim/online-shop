import React from 'react';
import { Counter } from '../counter/counter-1/counter';
import { CloseIcon } from '../../assets/icons/CloseIcon';
import { CURRENCY } from '../../utils/constant';
import { addCommas, removeCommas, digitsEnToFa } from "persian-tools2";
import {
  ItemBox,
  Image,
  Information,
  Name,
  Price,
  Weight,
  Total,
  RemoveButton,
} from './cart-item.style';
import { AppState } from '@store/store';
import { useSelector } from 'react-redux';

interface Props {
  data: any;
  onDecrement: () => void;
  onIncrement: () => void;
  onRemove: () => void;
}

export const CartItem: React.FC<Props> = ({
  data,
  onDecrement,
  onIncrement,
  onRemove,
}) => {
  const { title, photo_main, real_price, price, unit } = data.product;
  const { quantity } = data;
  const displayPrice = price ? price : real_price;
  const {cartLoading} = useSelector((state: AppState) => state.cart);
  return (
    <ItemBox>
      <Counter
        value={quantity}
        onDecrement={onDecrement}
        onIncrement={onIncrement}
        variant="lightVertical"
        // loading={cartLoading}
      />
      <Image src={photo_main} />
      <Information>
        <Name>{title}</Name>
        <Price>
          {digitsEnToFa(addCommas(displayPrice))}
          <span> </span>
          {CURRENCY}
        </Price>
        <Weight>
          {quantity} X {unit}
        </Weight>
      </Information>
      <Total>
        {digitsEnToFa(addCommas(quantity * displayPrice))}
        <span> </span>
        {CURRENCY}
      </Total>
      <RemoveButton onClick={onRemove}>
        <CloseIcon />
      </RemoveButton>
    </ItemBox>
  );
};
