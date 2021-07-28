import React, { Children } from "react";
import { Menu, MenuItem } from "@progress/kendo-react-layout";
import items from "./items.json";
import { useSelector } from "react-redux";
import categoriesReducer from "@store/reducers/Categories";
import styles from "./styles.module.scss";
import styled, { keyframes } from "styled-components";

export const CustomDropDown = () => {
  const { categories } = useSelector((state) => state.categories);

  const renderChild = (items: any) => {
    return items.map((item: any) => {
      if (item.children && item.children.length > 0) {
        return (
          <MenuItem
            url={`/shop/category/${item.id}`}
            text={item.name}
            cssStyle={{
              fontSize: "15px",
              borderRadius: "20px",
              padding: "5px",
              width: '10vw',
            }}
          >
            {renderChild(item.children)}
          </MenuItem>
        );
      } else {
        return (
          <MenuItem
            url={`/shop/category/${item.id}`}
            text={item.name}
            cssStyle={{
              fontSize: "15px",
              borderRadius: "20px",
              padding: "5px",
              width: '10vw',
            }}
          ></MenuItem>
        );
      }
    });
  };

  const renderSubMenu = (items: any) => {
    const menu = items.map((item: any) => {
      if (item.parent === null) {
        if (item.children && item.children.length > 0) {
          return (
            <MenuItem
              url={`/shop/category/${item.id}`}
              text={item.name}
              cssStyle={{
                fontSize: "15px",
                borderRadius: "20px",
                padding: "5px",
                width: '10vw',
              }}
            >
              {renderChild(item.children)}
            </MenuItem>
          );
        } else {
          return (
            <MenuItem
              url={`/shop/category/${item.id}`}
              text={item.name}
              cssStyle={{
                fontSize: "15px",
                borderRadius: "20px",
                padding: "5px",
                width: '10vw',
              }}
            ></MenuItem>
          );
        }
      }
    });

    return menu;
  };

  return (
    <div className={styles.menuContainer}>
      <Menu
        hoverOpenDelay={200}
        hoverCloseDelay={200}
        style={{ direction: "rtl" }}
        // className={styles.menuContainer}
      >
        <MenuItem
          text="محصولات"
          cssStyle={{
            fontSize: "16px",
            fontWeight: "bold",
            padding: "0px",
            zIndex: 99999,
            
          }}
        >
          {renderSubMenu(categories)}
        </MenuItem>
      </Menu>
    </div>
  );
};

export default CustomDropDown;
