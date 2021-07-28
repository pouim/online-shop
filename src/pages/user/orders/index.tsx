import dynamic from "next/dynamic";
import { NextPage } from "next";
import { Modal } from "@redq/reuse-modal";
import {
  PageWrapper,
  SidebarSection,
  ContentBox,
} from "@features/user-profile/user-profile.style";
import Sidebar from "@features/user-profile/sidebar/sidebar";
import { SEO } from "@components/seo";

import OrdersCard from '@features/user-profile/order-2/order';
import { Orders } from "src/site-settings/Orders";
import React, { FC, useEffect } from "react";
import Sticky from "react-stickynode";
import CartPopUp from "@features/carts/cart-popup";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@store/store";
import { fetchOrders } from "@store/actions/Orders";



type Props = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};
const OrdersPage: FC<any> = ({ deviceType }) => {
  const {orders} = useSelector((state: AppState) => state.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch])
  return (
    <>
      <SEO title="online shop" description="simple online shop" />
      <Modal>
        <PageWrapper style={{ backgroundColor: "#F7F7F7" }}>
          <ContentBox style={{ border: "none", padding: 0 }}>
            <OrdersCard orders={orders && orders} />
            <CartPopUp deviceType={deviceType} />
          </ContentBox>
          <SidebarSection>
            <Sticky enabled={true} top={110}  bottomBoundary={700}>
              <Sidebar />
            </Sticky>
          </SidebarSection>
        </PageWrapper>
      </Modal>
    </>
  );
};

export default OrdersPage;
