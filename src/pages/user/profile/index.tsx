import { NextPage } from "next";
import { Modal } from "@redq/reuse-modal";
import { ProfileProvider } from "@context/profile/profile.provider";
import UserAccountInfo from "@features/user-profile/UserAccountInfo";
import {
  PageWrapper,
  SidebarSection,
  ContentBox,
} from "@features/user-profile/user-profile.style";
import Sidebar from "@features/user-profile/sidebar/sidebar";
import { SEO } from "@components/seo";
import { useSelector } from "react-redux";
import { AppState } from "@store/store";
import Sticky from "react-stickynode";
import React, { FC } from "react";
import CartPopUp from "@features/carts/cart-popup";

type Props = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};
const ProfilePage: FC<any> = ({ deviceType }) => {

  
  return (
    <>
      <SEO title="online shop" description="Profile Details" />
      <Modal>
        <PageWrapper>
          <ContentBox>
            <UserAccountInfo />
            <CartPopUp deviceType={deviceType} />
          </ContentBox>
          <SidebarSection>
            <Sticky enabled={true} top={110} bottomBoundary={700}>
              <Sidebar />
            </Sticky>
          </SidebarSection>
        </PageWrapper>
      </Modal>
    </>
  );
};

export default ProfilePage;
