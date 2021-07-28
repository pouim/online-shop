import React, { useContext } from "react";
import Router from "next/router";
import {
  SidebarWrapper,
  SidebarTop,
  SidebarBottom,
  SidebarMenu,
  LogoutButton,
} from "./sidebar.style";
import {
  PROFILE_SIDEBAR_TOP_MENU,
  PROFILE_SIDEBAR_BOTTOM_MENU,
} from "../../../site-settings/site-navigation";
import { UserAvatar } from "src/layouts/header/header.style";
import { dashboardMenuItems } from "src/site-settings/dashboard-menu";
import { useSelector } from "react-redux";
import { AppState } from "@store/store";

const SidebarCategory: React.FC<{}> = () => {
  const authState = useSelector((state: AppState) => state.auth);
  const { user } = authState;
  const handleLogout = () => {};
  return (
    <>
      <SidebarWrapper className="p-3">
        <div className="d-flex flex-row-reverse align-items-center justify-content-start">
          <div>
            <UserAvatar>
              <img src="/user.jpg" />
            </UserAvatar>
          </div>
          <div className="d-flex flex-column mr-5 align-items-center">
            <h5 style={{ fontSize: "1rem" }}>{user && user.first_name + ' ' + user.last_name}</h5>
            <p>{user && user.phone_number}</p>
          </div>
        </div>

        {/* content Section  */}
        <div className="mt-5">
          {dashboardMenuItems.map((item) => (
            <div className="d-flex flex-row-reverse align-items-center p-2 justify-content-between">
              <SidebarMenu
                href={item.link}
                label={item.label}
                icon={item.icon}
              />
            </div>
          ))}
        </div>
      </SidebarWrapper>
    </>
  );
};

export default SidebarCategory;
