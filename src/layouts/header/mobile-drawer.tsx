import React, { useContext, useState } from "react";
import { openModal } from "@redq/reuse-modal";
import Router, { useRouter } from "next/router";
import { Scrollbars } from "react-custom-scrollbars";
import Drawer from "../../components/drawer/drawer";
import { Button } from "../../components/button/button";
import NavLink from "../../components/nav-link/nav-link";
import { CloseIcon } from "../../assets/icons/CloseIcon";
import { AuthContext } from "@context/auth/auth.context";
import AuthenticationForm from "../../features/authentication-form";
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarContent, SidebarHeader, SidebarFooter } from 'react-pro-sidebar';
import { PanelBar, PanelBarItem } from '@progress/kendo-react-layout';

import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';

import {
  HamburgerIcon,
  DrawerContentWrapper,
  DrawerClose,
  DrawerProfile,
  LogoutView,
  LoginView,
  UserAvatar,
  UserDetails,
  DrawerMenu,
  DrawerMenuItem,
  UserOptionMenu,
} from "./header.style";

import {
  MOBILE_DRAWER_MENU,
  PROFILE_PAGE,
} from "../../site-settings/site-navigation";
import { useAppState, useAppDispatch } from "../../context/app/app.provider";
import { dashboardMenuItems } from "src/site-settings/dashboard-menu";
import jwtAxios, { setAuthToken } from "src/axios-config/jwtAxios";
import { useDispatch, useSelector } from "react-redux";
import { onJWTAuthSignout, onSingInRefresh } from "@store/actions/JWTAuth";
import { setProducts } from "@store/actions/Products";
import { string } from "yup/lib/locale";

const MobileDrawer: React.FunctionComponent = () => {
  const isDrawerOpen = useAppState("isDrawerOpen");
  const dispatch = useAppDispatch();
  const dispatchActions = useDispatch();
  const authState = useSelector((state) => state.auth);
  const {categories} = useSelector(state => state.categories);
  const { token, user } = authState;
  const isAuthenticated = token ? true : false;
  const router = useRouter();
  const [categoryToggle, setCategoryToggle] = useState(true);

  // Toggle drawer
  const toggleHandler = React.useCallback(() => {
    dispatch({
      type: "TOGGLE_DRAWER",
    });
  }, [dispatch]);

  const handleLogout = () => {
    dispatchActions(onJWTAuthSignout());

    router.push("/");
  };

  const signInOutForm = () => {
    dispatch({
      type: "TOGGLE_DRAWER",
    });

    dispatchActions(onSingInRefresh());
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


  const fetchProductsByCategory = async (categoryID: any) => {
    try {
      console.log("fetching initil products started");
      const res = await jwtAxios.get(
        `products/?limit=50&offset=0&category=${categoryID}`
      );
      console.log("fetching initil products succedd", res.data);
      dispatchActions(setProducts(res.data))
      return res;
    } catch (error) {
      console.log("fetching initil products fialed", error.data);
      return error;
    }
  };


  const onItemSelect = async (id: any) => {
    if (typeof id === "string") {
      return;
    } else {
      const res = await fetchProductsByCategory(id);
      if (res) {
        router.push(`/shop/category/${id}`);
      }
    }
  };

  const renderChild = (items: any) => {
    return items.map((item: any) => {
      if (item.children && item.children.length > 0) {
        return (
          // <SubMenu onOpenChange={() => onItemSelect(item.id)} title={item.name}>
          //   {renderChild(item.children)}
          // </SubMenu>
          <PanelBarItem className="px-4 my-2"  title={item.name}>
              <PanelBarItem className="text-primary px-4 my-2" id={item.id} title=" تمام کالاهای این دسته "></PanelBarItem>
               {renderChild(item.children)}
            </PanelBarItem>

        );
      } else {
        return (
          // <SubMenu onOpenChange={() => onItemSelect(item.id)} title={item.name}></SubMenu>
          <PanelBarItem className="px-4 my-2" id={item.id} title={item.name}>
          </PanelBarItem>
        );
      }
    });
  };

   const renderSubMenu = (items: any) => {
     const menu = items.map((item: any) => {
       if (item.parent === null) {
         if (item.children && item.children.length > 0) {
           return (
            //  <SubMenu  onOpenChange={() => onItemSelect(item.id)} title={item.name}>
            //    {renderChild(item.children)}
            //  </SubMenu>
            <PanelBarItem className="px-4 my-2"  title={item.name}>
               <PanelBarItem className="text-primary px-4 my-2" id={item.id} title=" تمام کالاهای این دسته "></PanelBarItem>
               {renderChild(item.children)}
            </PanelBarItem>
           );
         } else {
           return (
            // <SubMenu onOpenChange={() => onItemSelect(item.id)} title={item.name}></SubMenu>
            <PanelBarItem className="px-4 my-2" id={item.id} title={item.name}></PanelBarItem>
           );
         }
       }
     });

     return menu;
   };

  return (
    <Drawer
      width="280px"
      drawerHandler={
        <HamburgerIcon>
          <span />
          <span />
          <span />
        </HamburgerIcon>
      }
      open={isDrawerOpen}
      toggleHandler={toggleHandler}
      closeButton={
        <DrawerClose>
          <CloseIcon />
        </DrawerClose>
      }
    >
      <Scrollbars autoHide>
        <DrawerContentWrapper>
          <DrawerProfile>
            {isAuthenticated ? (
              <LoginView>
                <UserAvatar>
                  <img src="/user.jpg" alt="user_avatar" />
                </UserAvatar>
                <UserDetails>
                  <h3>{user && user.first_name + " " + user.last_name}</h3>
                  <span>{user && user.phone_number}</span>
                </UserDetails>
              </LoginView>
            ) : (
              <LogoutView>
                <button
                  className="btn btn-secondary px-5"
                  onClick={signInOutForm}
                >
                  ورود
                </button>
              </LogoutView>
            )}
          </DrawerProfile>
          
          {isAuthenticated && <PanelBar>
            <PanelBarItem expanded={false} title="پروفایل من">
              <DrawerMenu>
                {isAuthenticated &&
                  dashboardMenuItems.map((item) => (
                    <DrawerMenuItem key={item.id}>
                      <NavLink
                        onClick={toggleHandler}
                        href={item.link}
                        label={item.label}
                        className="drawer_menu_item"
                      />
                    </DrawerMenuItem>
                  ))}
              </DrawerMenu>
            </PanelBarItem>
          </PanelBar>}

          <PanelBar onSelect={e => onItemSelect(e.target.props.id)}>
            <PanelBarItem className="mt-2"  expanded={true} title="دسته بندی کالا">
              {renderSubMenu(categories)}
            </PanelBarItem>
          </PanelBar>

          {isAuthenticated && (
            <UserOptionMenu>
              <DrawerMenuItem>
                <div
                  onClick={handleLogout}
                  className="drawer_menu_item"
                  style={{ cursor: "pointer" }}
                >
                  <span className="logoutBtn">خروج</span>
                </div>
              </DrawerMenuItem>
            </UserOptionMenu>
          )}
        </DrawerContentWrapper>
      </Scrollbars>
      {/* <ProSidebar>
        <SidebarHeader>
          <DrawerProfile>
            {isAuthenticated ? (
              <LoginView>
                <UserAvatar>
                  <img src="/user.jpg" alt="user_avatar" />
                </UserAvatar>
                <UserDetails>
                  <h3>{user && user.first_name + " " + user.last_name}</h3>
                  <span>{user && user.phone_number}</span>
                </UserDetails>
              </LoginView>
            ) : (
              <LogoutView>
                <button
                  className="btn btn-secondary px-5"
                  onClick={signInOutForm}
                >
                  ورود
                </button>
              </LogoutView>
            )}
          </DrawerProfile>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            {isAuthenticated && (
              <SubMenu title="پروفایل من" icon={<CgProfile />}>
                <DrawerMenu>
                  {isAuthenticated &&
                    dashboardMenuItems.map((item) => (
                      <DrawerMenuItem key={item.id}>
                        <NavLink
                          onClick={toggleHandler}
                          href={item.link}
                          label={item.label}
                          className="drawer_menu_item"
                        />
                      </DrawerMenuItem>
                    ))}
                </DrawerMenu>
              </SubMenu>
            )}

            <SubMenu
              open={categoryToggle}
              title="دسته بندی محصولات"
              icon={<FaList />}
            >
             {renderSubMenu(categories)}
            </SubMenu>
          </Menu>
        </SidebarContent>
        <SidebarFooter>
          {isAuthenticated && (
            <UserOptionMenu>
              <DrawerMenuItem>
                <div
                  onClick={handleLogout}
                  className="drawer_menu_item"
                  style={{ cursor: "pointer" }}
                >
                  <span className="logoutBtn">خروج</span>
                </div>
              </DrawerMenuItem>
            </UserOptionMenu>
          )}
        </SidebarFooter>
      </ProSidebar> */}
    </Drawer>
  );
};

export default MobileDrawer;
