import { NextPage } from "next";
import { Modal } from "@redq/reuse-modal";
import {
  PageWrapper,
  SidebarSection,
  ContentBox,
} from "@features/user-profile/user-profile.style";
import Sidebar from "@features/user-profile/sidebar/sidebar";
import { SEO } from "@components/seo";
import Sticky from "react-stickynode";
import NotificationCard from "@features/user-profile/notifications/Notification-card";
import React, { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import jwtAxios, { setAuthToken } from "src/axios-config/jwtAxios";
import CartPopUp from "@features/carts/cart-popup";
import { Cookies } from "react-cookie";

type Props = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};
const NotificationsPage: FC<any> = ({ deviceType }) => {
  const [notifications, setnotifications] = useState<any>();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      console.log("fetching user notifications started");
      setLoading(true);
      const cookeis = new Cookies();
      const token = cookeis.get('token');
      if (token) {
        setAuthToken(token);
      }
      const res = await jwtAxios.get("notifications/");
      setnotifications(res.data);
      console.log("fetching user notifications succed", res.data);
      setLoading(false);
    } catch (error) {
      console.log("fetching user notifications failed", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <SEO title="online shop" description="Profile Details" />
      <Modal>
        <PageWrapper>
          <ContentBox>
            {notifications &&
              notifications.map((notification: any) => (
                <NotificationCard
                  title={notification.title}
                  description={notification.description}
                  date={notification.created_at}
                />
              ))}
              <CartPopUp deviceType={deviceType} />
          </ContentBox>
          {/* <Sticky enabled={true} top={100}> */}
          <SidebarSection>
            <Sticky enabled={true} top={110}  bottomBoundary={700}>
              <Sidebar />
            </Sticky>
          </SidebarSection>
          {/* </Sticky> */}
        </PageWrapper>
      </Modal>
    </>
  );
};

export default NotificationsPage;
