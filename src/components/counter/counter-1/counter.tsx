import Tooltip from '@components/Tooltip';
import { themeGet } from '@styled-system/theme-get';
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Plus, Minus } from '../../../assets/icons/PlusMinus';
import { CounterBox, CounterButton, CounterValue } from './counter.style';



const rotate = keyframes`
  from {transform: rotate(0deg);}
  to {transform: rotate(360deg);}
`;

const Spinner = styled.div`
  width: 18px;
  height: 18px;
  margin-left: 10px;
  border: 3px solid #ffffff;
  border-top: 3px solid
    ${(props) =>
      props.color ? props.color : themeGet('primary.regular', '#009E7F')};
  border-radius: 50%;
  transition-property: transform;
  animation-name: ${rotate};
  animation-duration: 1.2s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;

interface Props {
  onDecrement: (e: Event) => void;
  onIncrement: (e: Event) => void;
  value: number;
  variant?: string;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}

export const Counter: React.FC<Props> = ({
  onDecrement,
  onIncrement,
  value,
  variant,
  className,
  disabled,
  loading,
}) => {
  return (
    <CounterBox variant={variant} className={className}>
      <CounterButton
        onClick={onDecrement}
        variant={variant}
        disabled={disabled}
      >
        {disabled ? (
          <Tooltip content="لطفا یک رنگ انتخاب کنید" direction="top">
            <Minus />
          </Tooltip>
        ) : (
          <Minus />
        )}
      </CounterButton>
      <CounterValue>{loading ? <Spinner /> : value}</CounterValue>
      <CounterButton
        onClick={onIncrement}
        variant={variant}
        disabled={disabled}
      >
         {disabled ? (
          <Tooltip content="لطفا یک رنگ انتخاب کنید" direction="top">
            <Plus />
          </Tooltip>
        ) : (
          <Plus />
        )}
      </CounterButton>
    </CounterBox>
  );
};
