import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Modal } from "@redq/reuse-modal";
import { SEO } from "@components/seo";
import ContactUSForm from "@components/Pages/Contact-Us/partials/Contact-US-Form";
import { SingleOrderList } from "@features/user-profile/order-2/order-card/order-card.style";


const Heading = styled.div`
  font-size: 21px;
  font-weight: 700;
  color: #0d1136;
  line-height: 1.2;
  margin-bottom: 25px;
  width: 100%;
  text-align: Right;
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



const index = () => {
  

  return (
    <Modal>
      <SEO title="الفبای روشنایی - سوالات متداول" description="سوالات متداول" />
      <HelpPageWrapper>
        <HelpPageContainer>
          <h2
            style={{
              fontSize: "25px",
              fontWeight: "bold",
              color: "#0d1136",
              lineHeight: 1.2,
              marginBottom: "25px",
              width: "100%",
              textAlign: "right",
            }}
          >
            راه های ارتباط با ما
          </h2>
        </HelpPageContainer>
        <div className="container mt-5">
          <div className="row" style={{ direction: "rtl" }}>
            <div className="col-md-6">
              <ContactUSForm />
            </div>

            <div className="col-md-6 mt-5">
              <SingleOrderList className="active p-5 text-right">
                <h4 className="text-right">نشانی ما</h4>
                <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ</p>

                <h4 className="text-right mt-5">شماره تماس ما</h4>
                <p>021-33951766/021-3394651</p>
              </SingleOrderList>
            </div>
          </div>
        </div>
      </HelpPageWrapper>
    </Modal>
  );
};

export default index;
