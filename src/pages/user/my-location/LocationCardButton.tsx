import React from "react";
import { Modal, openModal } from "@redq/reuse-modal";
import { Button } from "@components/button/button";
import UpdateAddress from "@features/user-profile/my-location/address-card/address-card";

const LocationCardButton = () => {
  const handleModal = (
    modalComponent: any,
    modalProps = {},
    className: string = "add-address-modal"
  ) => {
    openModal({
      show: true,
      config: {
        width: 360,
        height: "auto",
        enableResizing: false,
        disableDragging: true,
        className: className,
      },
      closeOnClickOutside: true,
      component: modalComponent,
      componentProps: { item: modalProps },
    });
  };

  return (
    <button
      className="btn btn-primary  mx-auto mt-2"
      onClick={() => handleModal(UpdateAddress, {}, "add-contact-modal")}
    >
      <p>افزودن نشانی جدید</p>
    </button>
  );
};

export default LocationCardButton;
