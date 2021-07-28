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
import Scrollbars from "react-custom-scrollbars";
import React, { FC, useEffect } from "react";
import Sticky from "react-stickynode";
import jwtAxios from "src/axios-config/jwtAxios";
import CartPopUp from "@features/carts/cart-popup";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@store/store";
import { fetchFavoriteProducts } from "@store/actions/Favorities";

const Products = dynamic(
    () => import("@components/Pages/Shop/Partials/product-grid/product-list/product-list")
  );

type Props = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};
const FavoritiesPage: FC<any> = ({ deviceType }) => {
  const {favorities} = useSelector((state: AppState) => state.favorities);
  const dispatch = useDispatch();
  const fetchData = async () => {
    try {
      console.log("fetching products started");
      const res = await jwtAxios.get("user/");
      console.log("fetching products succed", res.data);
    } catch (error) {
      console.log("fetching products failed", error);
    }
  };

  useEffect(() => {
    dispatch(fetchFavoriteProducts())
  }, [dispatch])
  return (
    <>
      <SEO title="online shop" description="simple online shop" />
      <Modal>
        <PageWrapper style={{ backgroundColor: "#F7F7F7" }}>
          <ContentBox style={{ border: "none" }}>
            <div style={{ marginTop: "-50px" }}>
              <Products
                deviceType={deviceType}
                fetchLimit={20}
                products={favorities && favorities}
              />
            </div>
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

export default FavoritiesPage;
