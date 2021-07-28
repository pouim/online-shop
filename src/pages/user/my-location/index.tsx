import { NextPage } from "next";
import { Modal, openModal } from "@redq/reuse-modal";
import { useDispatch, useSelector } from 'react-redux';

import {
  PageWrapper,
  SidebarSection,
  ContentBox,
} from "@features/user-profile/user-profile.style";
import Sidebar from "@features/user-profile/sidebar/sidebar";
import { SEO } from "@components/seo";
import Sticky from "react-stickynode";
import LocationCard, {
  LocationInfo,
} from "@features/user-profile/my-location/Location-card";
import React, { FC, useEffect, useState } from "react";
import { initialLocations } from "src/site-settings/locations";
import LocationCardButton from "./LocationCardButton";
import UpdateAddress from "@features/user-profile/my-location/address-card/address-card";
import jwtAxios from "src/axios-config/jwtAxios";
import { AppState } from "@store/store";
import { loaduserLocations } from "@store/actions/Locations";
import CartPopUp from "@features/carts/cart-popup";

type Props = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};

const LocationPage: FC<any> = ({ deviceType }) => {
  const locationsState = useSelector((state): AppState => state.locations);
  const { locations } = locationsState;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      dispatch(loaduserLocations());
  }, []);

  const handleAddNewAddress = () => {};

  const handleModal = (
    modalComponent: any,
    modalProps = {},
    className: string = "add-address-modal",
  ) => {
    openModal({
      show: true,
      config: {
        width: 500,
        height: "auto",
        enableResizing: false,
        disableDragging: true,
        className: className,
      },
      closeOnClickOutside: true,
      component: modalComponent,
      componentProps: { item: modalProps, type: 'add' },
    });
  };

  return (
    <>
      <SEO title="online shop" description="Profile Details" />
      <Modal>
        <PageWrapper>
          <ContentBox>
            {locations &&
              locations.map((location: LocationInfo) => (
                <LocationCard locationInfo={location} />
              ))}

            <button
              className="btn btn-primary  mx-auto mt-2"
              onClick={() =>
                handleModal(UpdateAddress, {}, "add-contact-modal")
              }
            >
              <p>افزودن نشانی جدید</p>
            </button>
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

export default LocationPage;
