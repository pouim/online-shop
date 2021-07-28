import React, { useEffect } from "react";
import { NextPage, GetStaticProps } from "next";
import { Modal } from "@redq/reuse-modal";
import { SEO } from "@components/seo";
import Checkout from "@features/checkouts/checkout-two/checkout-two";
import jwtAxios, { setAuthToken } from "src/axios-config/jwtAxios";
import { useDispatch } from "react-redux";
import { loaduserLocations } from "@store/actions/Locations";
import Cookies from "react-cookie/cjs/Cookies";
import { useRouter } from "next/router";
import CartPopUp from "@features/carts/cart-popup";

type Props = {
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};
const CheckoutPage: NextPage<Props> = ({ deviceType }) => {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const token = cookies.get("token");
  const router = useRouter();

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      dispatch(loaduserLocations());
    }
  }, [dispatch]);

  return (
    <>
      <SEO
        title="الفبای روشنایی - صفحه پرداخت نهایی"
        description="جزییات پرداخت نهایی"
      />
      <Modal>
        <Checkout deviceType={deviceType} />
        <CartPopUp deviceType={deviceType} />
      </Modal>
    </>
  );
};

export default CheckoutPage;
