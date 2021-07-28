import React from "react";
import Collapse, { Panel } from "rc-collapse";
import AccordionWrapper from "./accordion.style";
import CSSMotion from "rc-motion";

export const Motion = () => {
  <CSSMotion visible={true} motionName="my-motion">
    {({ className, style }) => <div className={className} style={style} />}
  </CSSMotion>;
};

type AccordionProps = {
  router?: any;
  className?: string;
  active?: boolean;
  items?: any[];
  id?: number;
  headerElements: any;
  children: any;
  handleCategorySelection?: any;
};

function expandIcon({ isActive }: any) {
  return (
    <i>
      {isActive ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32.546"
          height="21.7"
          viewBox="0 0 32.546 21.7"
        >
          <g id="next" transform="translate(32.546) rotate(90)">
            <g id="Group_27" data-name="Group 27" transform="translate(0 0)">
              <g id="Group_26" data-name="Group 26" transform="translate(0)">
                <path
                  id="Path_1385"
                  data-name="Path 1385"
                  d="M1.589,20.11l10.85,10.85a5.424,5.424,0,1,0,7.671-7.671L13.1,16.274,20.11,9.26a5.424,5.424,0,1,0-7.671-7.671L1.589,12.439a5.422,5.422,0,0,0,0,7.671Zm1.918-5.753,10.85-10.85a2.776,2.776,0,0,1,3.835,0,2.714,2.714,0,0,1,0,3.835L9.26,16.274l8.932,8.932a2.713,2.713,0,0,1-3.835,3.838L3.507,18.195a2.714,2.714,0,0,1,0-3.838Z"
                  fill="#516eff"
                />
              </g>
            </g>
          </g>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32.547"
          height="21.7"
          viewBox="0 0 32.547 21.7"
        >
          <g id="next" transform="translate(0 31.534) rotate(-90)">
            <g
              id="Group_27"
              data-name="Group 27"
              transform="translate(9.834 0)"
            >
              <g id="Group_26" data-name="Group 26" transform="translate(0 0)">
                <path
                  id="Path_1385"
                  data-name="Path 1385"
                  d="M1.589,60.453,12.439,49.6a5.424,5.424,0,1,1,7.671,7.671L13.1,64.288,20.11,71.3a5.424,5.424,0,1,1-7.671,7.671L1.589,68.123a5.422,5.422,0,0,1,0-7.671Zm1.918,5.753,10.85,10.85a2.776,2.776,0,0,0,3.835,0,2.714,2.714,0,0,0,0-3.835L9.26,64.288l8.932-8.932a2.713,2.713,0,0,0-3.835-3.838L3.507,62.368a2.714,2.714,0,0,0,0,3.838Z"
                  transform="translate(0 -48.016)"
                  fill="#516eff"
                />
              </g>
            </g>
          </g>
        </svg>
      )}
    </i>
  );
}

const Accordion: React.FC<AccordionProps> = ({
  headerElements,
  children,
  className,
  active,
}) => (
  <AccordionWrapper style={{ transitionDuration: "1s" }}>
    <Collapse
      style={{ direction: "rtl" }}
      accordion={true}
      className={`accordion ${className}`.trim()}
      defaultActiveKey="active"
      expandIcon={expandIcon}
    >
      <Panel
        key={active ? "active" : ""}
        header={headerElements}
        headerClass="accordion-title"
        style={{ textAlign: "right" }}
      >
        {children}
      </Panel>
    </Collapse>
  </AccordionWrapper>
);

export default Accordion;
