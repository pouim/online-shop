import { CalendarIcon } from "@assets/icons/Calendar";
import { CallIcon } from "@assets/icons/Call";
import { DeleteIcon } from "@assets/icons/Delete";
import { EditIcon } from "@assets/icons/Edit";
import { EnvelopeIcon } from "@assets/icons/Envelope";
import { LocationIcon } from "@assets/icons/Location";
import { ProfileIcon } from "@assets/icons/Profile";
import { AppState } from "@store/store";
import classNames from "classnames";
import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import jwtAxios from "src/axios-config/jwtAxios";
import { Modal, openModal, closeModal } from "@redq/reuse-modal";
import DeleteDialog from '@components/Delete-Dialog';
import styles from "./styles.module.scss";
import { dispatch } from "react-hot-toast";
import { deleteLocation } from "@store/actions/Locations";
import UpdateAddress from "@features/user-profile/my-location/address-card/address-card";


export type LocationInfo = {
  id: number;
  name: string;
  phone_number: string;
  state: string;
  city: string;
  postal_address: string;
  postal_code: string;
};

interface LocationCardProps {
  locationInfo: LocationInfo;
}

const LocationCard: FC<LocationCardProps> = ({ locationInfo }) => {
  const authState = useSelector((state: AppState) => state.auth);
  const { user } = authState;
  const dispatch = useDispatch();

 const handleCancel = () => {
   closeModal();
 }
  


  const handleDeleteLocation = async () => {
    try {
      console.log(`deleting id ${locationInfo.id} started`);
      const res = await jwtAxios.delete(`addresses/${locationInfo.id}/`);
      dispatch(deleteLocation(locationInfo.id));
      closeModal();
      console.log(`deleting id ${locationInfo.id} succedd`, res.data);
    } catch (error) {
      console.log(`deleting id ${locationInfo.id} failed`, error);
      closeModal();
    }
  }

  const handleModal = (
    modalComponent: any,
   
  ) => {
    openModal({
      show: true,
      config: {
        width: 360,
        height: "auto",
        enableResizing: false,
        disableDragging: true,
      },
      closeOnClickOutside: true,
      component: modalComponent,
      componentProps: {onSubmitClick:handleDeleteLocation, onCancelClick:handleCancel},
    });
  };

  const handleEditModal = (
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
      componentProps: { item: locationInfo, type: 'edit' },
    });
  };
  
  return (
    <div className={classNames(styles.wrapper, "container py-3 px-3 mb-3")}>
      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-row-reverse justify-content-between align-items-center mb-4">
            <div>
              <h5 style={{ letterSpacing: ".03rem", textAlign: "right" }}>
                {locationInfo.postal_address}
              </h5>
            </div>
            <div
              className={classNames(
                styles.EditDeleteIconWrapper,
                "d-flex align-items-center"
              )}
            >
              <div
                className={classNames(styles.EditDeleteIconButton, "mr-1")}
                onClick={() =>
                  handleModal(DeleteDialog)
                }
              >
                <DeleteIcon width={12} height={12} />
              </div>
              <div className={styles.EditDeleteIconButton} onClick={() =>
                handleEditModal(UpdateAddress, "add-contact-modal")
              }>
                <EditIcon width={12} height={12} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="d-flex flex-row-reverse">
            <div className="d-flex flex-row-reverse align-items-center ml-3 ml-sm-5">
              <LocationIcon width={12} height={12} />
              <p className={classNames(styles.locationInfoTitle, "mr-1")}>
                {locationInfo.city}
              </p>
            </div>

            <div className="d-flex flex-row-reverse align-items-center ml-3 ml-sm-5">
              <EnvelopeIcon width={12} height={12} />
              <p className={classNames(styles.locationInfoTitle, "mr-1")}>
                {locationInfo.postal_code}
              </p>
            </div>

            <div className="d-flex flex-row-reverse align-items-center ml-3 ml-sm-5">
              <CallIcon width={12} height={12} />
              <p className={classNames(styles.locationInfoTitle, "mr-1")}>
                {locationInfo.phone_number}
              </p>
            </div>

            <div className="d-flex flex-row-reverse align-items-center ml-3 ml-sm-5">
              <ProfileIcon width={12} height={12} />
              <p className={classNames(styles.locationInfoTitle, "mr-1")}>
                {user && user.first_name + " " + user.last_name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
