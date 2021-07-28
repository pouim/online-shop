import React, { useContext } from "react";
import styled from "styled-components";
import { Modal } from "@redq/reuse-modal";
import { SEO } from "@components/seo";
import Footer from "../layouts/footer/footer";
import {
  Accordion,
  AccordionContext,
  Card,
  useAccordionToggle,
} from "react-bootstrap";
import { ShopArrowUpIcon } from "@assets/icons/SidebarArrowUp";
import { ShopArrowDownIcon } from "@assets/icons/SidebarArrowDown";

const accordionData = [
  {
    id: 1,
    title: "لورم ایپسوم",
    content: " لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم",
  },
  {
    id: 2,
    title: "لورم ایپسوم",
    content: " لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم",
  },
  {
    id: 3,
    title: "لورم ایپسوم",
    content: " لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم",
  },
  {
    id: 4,
    title: "لورم ایپسوم",
    content: " لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم",
  },
];

const Heading = styled.h3`
  font-size: 21px;
  font-weight: 700;
  color: #0d1136;
  line-height: 1.2;
  margin-bottom: 25px;
  width: 100%;
  text-align: center;
`;

const HelpPageWrapper = styled.div`
  background-color: #f7f7f7;
  position: relative;
  padding: 130px 0 60px 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 989px) {
    padding-top: 70px;
  }
`;

export const HelpPageContainer = styled.div`
  background-color: transparent;
  padding: 0;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  @media (min-width: 990px) {
    width: 870px;
    margin-left: auto;
    margin-right: auto;
  }

  @media (max-width: 989px) {
    padding: 30px;
  }
`;

export default function () {
  const CustomSidebarToggle = ({ children, eventKey, callback, title }: any) => {
    const currentEventKey = useContext(AccordionContext);

    const decoratedOnClick = useAccordionToggle(
      eventKey,
      () => callback && callback(eventKey)
    );

    const isCurrentEventKey = currentEventKey === eventKey;

    return (
      <div
        className="d-flex justify-content-between align-items-center"
        onClick={decoratedOnClick}
        style={{ cursor: "pointer" }}
      >
        <h4>{title}</h4>
        {isCurrentEventKey ? (
          <ShopArrowUpIcon height={19} width={19} />
        ) : (
          <ShopArrowDownIcon height={19} width={19} />
        )}
      </div>
    );
  };
  return (
    <Modal>
      <SEO title="الفبای روشنایی - سوالات متداول" description="سوالات متداول" />
      <HelpPageWrapper>
        <HelpPageContainer>
          <Heading>ُسوالات متداول</Heading>
           {accordionData.map((item: any) => (
               <Accordion className="my-3" style={{ direction: "rtl" }}>
               <Card style={{ borderRadius: "20px" }}>
                 <Card.Header
                   style={{
                     backgroundColor: "#fff",
                     borderBottom: ".001rem solid #647CFF",
                   }}
                 >
                   <CustomSidebarToggle eventKey="0" title={item.title}>
                     Click me!
                   </CustomSidebarToggle>
                 </Card.Header>
                 <Accordion.Collapse eventKey="0">
                   <Card.Body>
                     <h4 className="text-right">{item.content}</h4>
                   </Card.Body>
                 </Accordion.Collapse>
               </Card>
             </Accordion>
           ))}
           
        </HelpPageContainer>

        {/* <Footer /> */}
      </HelpPageWrapper>
    </Modal>
  );
}
