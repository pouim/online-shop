import { AppContext, AppProps } from "next/app";
import NProgress from 'nprogress';
import Router from 'next/router';

import { ThemeProvider } from "styled-components";
import { defaultTheme } from "../site-settings/site-theme/default";
import { useMedia } from "../utils/use-media";
import AppLayout from "../layouts/app-layout";
import { AuthProvider } from "@context/auth/auth.provider";
import { AppProvider } from "src/context/app/app.provider";
import { CartProvider } from "../context/cart/use-cart";

// External CSS import here
// import '@progress/kendo-theme-material/dist/all.css';
import '@assets/styles/loginSucess.scss';
import '@assets/styles/megaMenu.scss';
import '@assets/styles/Pouyan/Pouyan.css';
import "@components/Tooltip/tooltip.css";
import "@assets/styles/Sidebar.scss";
import "nprogress/nprogress.css";
import "react-multi-carousel/lib/styles.css";
import "../components/multi-carousel/multi-carousel.style.css";
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'rc-table/assets/index.css';
import "rc-drawer/assets/index.css";
import "rc-collapse/assets/index.css";
import "react-tabs/style/react-tabs.css";
import "@assets/styles/inputstyles.scss";
import "@redq/reuse-modal/lib/index.css";
import { GlobalStyle } from "../assets/styles/global.style";
import "../assets/styles/bootstrap.min.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authCheckStatus, loadAuthUser } from "@store/actions";
import { useStore } from "@store/store";
import { NextPageContext } from "next";
import { CookiesProvider } from "react-cookie";
// import '../assets/styles/font-awesome/css/all.min.css';

NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  showSpinner: false,
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState);
  const mobile = useMedia("(max-width: 580px)");
  const tablet = useMedia("(max-width: 991px)");
  const desktop = useMedia("(min-width: 992px)");
  return (
    <CookiesProvider>
      <Provider store={store}>
        <ThemeProvider theme={defaultTheme}>
          <CartProvider>
            <AppProvider>
              <AppLayout>
                <Component
                  {...pageProps}
                  deviceType={{ mobile, tablet, desktop }}
                />
              </AppLayout>
              <GlobalStyle />
            </AppProvider>
          </CartProvider>
        </ThemeProvider>
      </Provider>
    </CookiesProvider>
  );
}

export default MyApp;
