import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import Sticky from "react-stickynode";
import { useRouter } from "next/router";
import { LayoutWrapper } from "./layout.style";
import { useAppState } from "../context/app/app.provider";
import { minHeight } from "styled-system";
import Footer from "./footer/footer";
import Header from "./header/header";
import { useDispatch, useSelector } from "react-redux";
import { authCheckStatus, loadAuthUser } from "@store/actions";
import jwtAxios, { setAuthToken } from "src/axios-config/jwtAxios";
import { Cookies } from "react-cookie";
import { loaduserLocations } from "@store/actions/Locations";
import { setCategories } from "@store/actions/Categories";
import { fetchFavoriteProducts } from "@store/actions/Favorities";
import { fetchCart, loadCart, loadCartitems } from "@store/actions/Cart";
const MobileHeader = dynamic(() => import("./header/mobile-header"), {
  ssr: false,
});

type LayoutProps = {
  className?: string;
  token?: string;
};

const Layout: React.FunctionComponent<LayoutProps> = ({
  className,
  children,
  // deviceType: { mobile, tablet, desktop },
  token,
}) => {
  const isSticky = useAppState("isSticky");
  const { pathname, query } = useRouter();
  const type = query.type;

  const fetchInitialCategories = async () => {
    try {
      const res = await jwtAxios.get("categories/");
      dispatch(setCategories(res.data));
    } catch (error) {}
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    // const token = localStorage.getItem("token");

    dispatch(authCheckStatus());
    if (token) {
      setAuthToken(token);
      dispatch(loadAuthUser());
      dispatch(fetchFavoriteProducts())
      dispatch(loadCartitems());
      dispatch(loadCart());
    }
    fetchInitialCategories();
    
  }, [dispatch]);

  return (
    <LayoutWrapper className={`layoutWrapper ${className}`}>
      <Sticky enabled={isSticky} innerZ={1001}>
        <MobileHeader className="sticky home desktop" />
        {/* <div className="home sticky" style={{backgroundColor: 'black', width: '100%'}}>hello</div> */}
        <Header className="home sticky" />
      </Sticky>

      {children}

      <Footer />
    </LayoutWrapper>
  );
};

export default Layout;
