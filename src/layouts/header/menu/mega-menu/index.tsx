import { ArrowDropDown } from "@assets/icons/ArrowDropDown";
import { ArrowNext } from "@assets/icons/ArrowNext";
import { ArrowPrev } from "@assets/icons/ArrowPrev";
import { AppState } from "@store/store";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MegaMenu = () => {
  const [activeSidebarMenu, setactiveSidebarMenu] = useState<any>(null);
  const { categories } = useSelector((state: AppState) => state.categories);
  const router = useRouter();
  
  //function to define the item is header Item in list not sub Item by checking its parent has not parent
  const isHeaderItem = (id: number) => {
    const foundedItem =  categories?.filter((item: any) => item.id === id);
    // console.log('foundedItem', foundedItem);
    if(!foundedItem[0]?.parent) {
      return true;
    } else return false;
  }

  const setActiveMenu = () => {
    const sidebarMenuIds = categories?.map(
      (item: any) => item.parent === null && item
    );
    setactiveSidebarMenu(sidebarMenuIds && sidebarMenuIds[0]);
  }


  const onMouseOverHandler = (item: any) => {
    setactiveSidebarMenu(item)
  }

  const renderChild = (items: any) => {
    return items?.map((item: any) => {
        if (item.children && item.children.length > 0) {
          return (
            <>
              <li
                onClick={() => router.push(`/shop/category/${item.id}`)}
                className="py-2 mega-menu-list-item-header"
              >
                <span>{item.name}</span> <ArrowPrev width={12} />
              </li>
              {renderChild(item.children)}
            </>
          );
        } else if (item.children.length === 0  && isHeaderItem(item.parent)) {
          return (
            <li
              onClick={() => router.push(`/shop/category/${item.id}`)}
              className="py-2 mega-menu-list-item-header"
            >
              <span>{item.name}</span> <ArrowPrev width={12} />
            </li>
          );
        } else {
          return (
            <li
              onClick={() => router.push(`/shop/category/${item.id}`)}
              className="py-2 mega-menu-list-item-label"
            >
              <span>{item.name}</span>
            </li>
          );
        }
      });
  };

  const renderSidebarMenu = (items: any) => {
    const menu = items.map((item: any) => {
      if (item.parent === null) {
        if (item.children && item.children.length > 0) {
          return (
            <div
              className={
                item.id === activeSidebarMenu?.id
                  ? "mega-menu-sidebar-item mega-menu-sidebar-item-active"
                  : "mega-menu-sidebar-item "
              }
              onMouseOver={() => onMouseOverHandler(item)}
            >
              {item.name}
            </div>
          );
        } else {
          return (
            <div
              className={
                item.id === activeSidebarMenu?.id
                  ? "mega-menu-sidebar-item mega-menu-sidebar-item-active"
                  : "mega-menu-sidebar-item "
              }
              onMouseOver={() => onMouseOverHandler(item)}
            >
              {item.name}
            </div>
          );
        }
      }
    });

    return menu;
  };


  useEffect(() => {
   setActiveMenu();
  }, [categories]);
  console.log("headerIem", isHeaderItem(20));
  
  return (
    <li>
      <div className="sf-with-ul">
        <ArrowDropDown />
        <span className="ml-1">محصولات</span>
      </div>

      <div className="megamenu megamenu-md">
        <div
          className="row no-gutters"
          style={{
            backgroundColor: "#FFF",
            padding: ".5rem 0",
            borderRadius: "0 0 8px 8px",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          }}
        >
          <div className="col-md-2 mega-menu-sidebar px-1">
            <div>{renderSidebarMenu(categories.filter((item: any) => !item.in_langding))}</div>
          </div>

          <div className="col-md-8 px-4">
            <div
              onClick={() => router.push(`/shop/category/${activeSidebarMenu.id}`)}
              className="mega-menu-content-seeall"
            >
              همه دسته بندی های {activeSidebarMenu?.name}{" "}
              <ArrowPrev width={16} />
            </div>
            <div className="row text-right px-4 my-3">
              <ul className="mega-items-list">
                {renderChild(activeSidebarMenu?.children)}
              </ul>
            </div>
          </div>

          <div className="col-md-2">
            <div style={{ position: "absolute", bottom: "5%", left: "5%" }}>
              <img
                style={{
                  width: "200px",
                  height: "200px",
                  borderRadius: "20px",
                }}
                src="/images/home/cats/1.png"
              />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default MegaMenu;
