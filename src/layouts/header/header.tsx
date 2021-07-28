import React from "react";
import Router, { useRouter } from "next/router";
import { openModal } from "@redq/reuse-modal";
import { LeftMenu } from "./menu/left-menu/left-menu";
import HeaderWrapper from "./header.style";
import { RightMenu } from "./menu/righ-menu/right-menu";

import Search from "../../features/search/search";
import AuthenticationForm from "@features/authentication-form";
import { setAuthToken } from "src/axios-config/jwtAxios";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@store/store";
import { onJWTAuthSignout, onSingInRefresh } from "@store/actions";
type Props = {
  className?: string;
};

const Header: React.FC<Props> = ({ className }) => {
  const authState = useSelector((state:AppState) => state.auth);
  const { token } = authState;
  const isAuth = token ? true : false;
  const dispatch = useDispatch();

  const { pathname, query } = useRouter();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(onJWTAuthSignout());

    router.push("/");
  };

  const handleJoin = () => {
    dispatch(onSingInRefresh());
    openModal({
      show: true,
      overlayClassName: "quick-view-overlay",
      closeOnClickOutside: true,
      component: AuthenticationForm,
      closeComponent: "",
      config: {
        enableResizing: false,
        disableDragging: true,
        className: "quick-view-modal",
        width: 458,
        height: "auto",
      },
    });
  };

  return (
    <div>
      <HeaderWrapper className={className} id="layout-header">
        <LeftMenu
          avatar="/user.jpg"
          isAuthenticated={isAuth}
          onJoin={handleJoin}
          onLogout={handleLogout}
        />
        <Search minimal={true} className="headerSearch"  />
        <RightMenu logo="/logo.png" />
      </HeaderWrapper>
    </div>
  );
};

export default Header;
