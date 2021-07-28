import React from "react";
import dynamic from "next/dynamic";
import NavLink from "../../../../components/nav-link/nav-link";

import {
  OFFER_MENU_ITEM,
  HELP_MENU_ITEM,
  PRODUCTS_MENU_ITEM,
  PRICE_MENU_ITEM,
  BLOG_MENU_ITEM,
  FAQ_MENU_ITEM,
  CONTACTUS_MENU_ITEM,
} from "../../../../site-settings/site-navigation";
// import LanguageSwitcher from '../language-switcher/language-switcher';
import { HelpIcon } from "../../../../assets/icons/HelpIcon";
import { RightMenuBox } from "./right-menu.style";
import Logo from "src/layouts/logo/logo";
import { ArrowDropDown } from "@assets/icons/ArrowDropDown";
import { ArrowDown } from "@assets/icons/ArrowDown";
import CustomDropDown from "../dropDown";
import MegaMenu from "../mega-menu";
import Link from "next/link";
const AuthMenu = dynamic(() => import("../auth-menu"), { ssr: false });

type Props = {
  logo?: string;
};

export const RightMenu: React.FC<Props> = ({ logo }) => {
  return (
    <RightMenuBox>
      <div className="d-flex align-items-center mr-5">
        <NavLink
          className="menu-item"
          href={CONTACTUS_MENU_ITEM.href}
          label={CONTACTUS_MENU_ITEM.defaultMessage}
          intlId={CONTACTUS_MENU_ITEM.id}
        />
        <NavLink
          className="menu-item"
          href={FAQ_MENU_ITEM.href}
          label={FAQ_MENU_ITEM.defaultMessage}
          intlId={FAQ_MENU_ITEM.id}
        />
        {/* <NavLink
        className="menu-item"
        href={BLOG_MENU_ITEM.href}
        label={BLOG_MENU_ITEM.defaultMessage}
        intlId={BLOG_MENU_ITEM.id}
      /> */}
        <div className="menu-item">
          <Link href="http://185.206.147.122:8000/">
            <a
              // className={isCurrentPath ? " current-page" : ""}
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
              }}
              aria-haspopup="true"
              target="_blank"
            >
              <span className="label" style={{ fontSize: "16px" }}>
                بلاگ
              </span>
            </a>
          </Link>
        </div>

        {/* <CustomDropDown /> */}
        <MegaMenu />
      </div>

      <Logo imageUrl={logo} alt="shop logo" />
    </RightMenuBox>
  );
};
