import styled from 'styled-components';
import css from '@styled-system/css';
import { variant } from 'styled-system';
export const CounterBox = styled.div<any>(
  css({
    display: 'flex',
    flexDirection: 'row-reverse',
    backgroundColor: 'primary.regular',
    color: 'white',
    fontSize: '22px',
    fontWeight: 'bold',
  }),  
  {
    borderRadius: 200,
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
    flexShrink: 0,
    '&:focus': {
      outline: 'none',
    },
  },
  variant({
    variants: {
      horizontal: {
        width: 104,
        height: 36,
      },
      vertical: {
        width: 50,
        height: 90,
        flexDirection: 'column-reverse',
      },
      lightHorizontal: {
        width: 65,
        height: 30,
        backgroundColor: 'gray.200',
        color: 'text.bold',
      },
      lightVertical: {
        width: 30,
        height: 90,
        flexDirection: 'column-reverse',
        backgroundColor: 'gray.200',
        color: 'text.bold',
      },
    },
  })
);

export const CounterButton = styled.button<any>(
  {
    border: 'none',
    fontSize: '12px !important',
    backgroundColor: 'transparent',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: 1.4,
    cursor: 'pointer',
    '&:hover, &:focus': {
      outline: 'none',
    },
  },
  variant({
    variants: {
      lightHorizontal: {
        color: 'text.regular',
        border: '.1rem solid #FF595E',
        height: '50%',
        borderRadius: 5,
      },
      lightVertical: {
        color: 'text.regular',
      },
    },
  })
);

export const CounterValue = styled.span({
  pointerEvents: 'none',
});
CounterValue.displayName = 'CounterValue';
CounterButton.displayName = 'CounterButton';
CounterBox.displayName = 'CounterBox';
CounterBox.defaultProps = {
  variant: 'horizontal',
};
