import React from 'react';
export const ArrowDropDown = (props: any) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={props.width}
      height={props.height}
      viewBox='0 0 10 5'
    >
      <path
        data-name='Path 2030'
        d='M0,63.75l5,5,5-5Z'
        transform='translate(0 -63.75)'
        fill={props.color}
      />
    </svg>
  );
};
