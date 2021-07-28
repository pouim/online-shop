import React, { FC, ReactNode, useState } from 'react';
import { letterSpacing } from 'styled-system';

type ReadMoreProps = {
  more?: string;
  less?: string;
  character?: any;
  children: any;
};

const ReadMore: FC<ReadMoreProps>= ({ children, more, less, character }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleLines = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setExpanded(!expanded);
  };

  if (!children) return null;

  return (
    <>
      {(children && children.length < character) || expanded
        ? <div dir="rtl" style={{textAlign: 'right', letterSpacing: '.5px', fontSize: '20px', lineHeight: '2.2rem'}}>{children}</div>
        : <div dir="rtl" style={{textAlign: 'right' , letterSpacing: '.5px', fontSize: '20px', lineHeight: '2.2rem'}}>{children.substring(0, character)} ...</div>
        }
      {children && children.length > character && !expanded && (
        <>
          {/* <br /> */}
          <div className="text-center mt-2">
            <a
              href="#"
              onClick={toggleLines}
              style={{ color: '#808080', fontWeight: 700, fontSize: '1rem', textDecoration: 'none'}}
            >
              {more}
            </a>
          </div>
        </>
      )}
      {children && children.length > character && expanded && (
        <>
          {/* <br /> */}
          <div className="text-center mt-2">
            <a
              href="#"
              onClick={toggleLines}
              style={{ color: '#808080', fontWeight: 700, fontSize: '1rem' , textDecoration: 'none'}}
            >
              {less}
            </a>
          </div>
        </>
      )}
    </>
  );
};

ReadMore.defaultProps = {
  character: 150,
  more: 'Read more',
  less: 'less',
};

export default ReadMore;
