import React from "react";
import Sticky from "react-stickynode";
import BrandsCategory from "./SidebarWidgets/BrandsCategoryWidget";
import ColorSwitchWidget from "./SidebarWidgets/ColorFilterWidget";
import SortByWidget from "./SidebarWidgets/SortByWidget";
import SwitchWidget from "./SidebarWidgets/SwitchWidget";


export default function index({brands}:any) {
  return (
    <>


          <SortByWidget />
          <BrandsCategory brands={brands} />
          <SwitchWidget label="فقط کالاهای موجود" />
          <ColorSwitchWidget />


    </>
  );
}
