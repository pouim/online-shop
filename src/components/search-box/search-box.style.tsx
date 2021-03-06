import styled from 'styled-components';
import css from '@styled-system/css';
import { shadow } from 'styled-system';
export const StyledForm = styled.form<any>(
  (props) =>
    css({
      direction: 'rtl',
      display: 'flex',
      alignItems: 'center',
      borderRadius: '10rem',
      border: '0.1rem solid ',
      borderColor: 'gray.800',
      overflow: 'hidden',
      width: 330,
      color: 'text.regular',
      backgroundColor: props.minimal ? 'white' : 'white',
      '@media only screen and (min-width: 991px) and (max-width: 1250px)': {
        width: 200,
      },
    }),
  shadow
);

export const StyledInput = styled.input(
  css({
    flexGrow: 1,
    fontSize: 'base',
    px: 20,
    height: 48,
    color: 'text.regular',
    backgroundColor: 'inherit',
  }),
  {
    border: 0,
    '&:focus': {
      outline: 0,
    },

    '&::-webkit-input-placeholder, &::-moz-placeholder, &::-moz-placeholder, &::-ms-input-placeholder': {
      fontSize: 'base',
      color: 'text.regular',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
  }
);

export const StyledCategoryName = styled.span(
  css({
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: '38px',
    px: 15,
    color: 'primary.regular',
    backgroundColor: 'gray.200',
    borderRadius: 'base',
  }),
  {
    margin: '5px',
    whiteSpace: 'nowrap',
    textTransform: 'capitalize',
  }
);

export const StyledSearchButton = styled.button(
  css({
    backgroundColor: 'primary.regular',
    color: 'white',
    fontSize: 'base',
    fontWeight: 'bold',
  }),
  {
    display: 'flex',
    height: 48,
    alignItems: 'center',
    border: 0,
    outline: 0,
    paddingLeft: 30,
    paddingRight: 30,
    cursor: 'pointer',
    flexShrink: 0,
  }
);
