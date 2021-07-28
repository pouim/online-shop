import HomePage from "@components/Pages/Home";
import React, { FC, useEffect } from "react";
import { Modal } from "@redq/reuse-modal";
import jwtAxios from "src/axios-config/jwtAxios";
import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import { useDispatch } from "react-redux";
import { setCategories } from "@store/actions/Categories";
import { setBrands } from "@store/actions/Brands";
import { setColors } from "@store/actions/Colors";
const CartPopUp = dynamic(() => import("@features/carts/cart-popup"), {
  ssr: false,
});

const index: FC<any> = ({
  deviceType,
  initialBrands,
  initialProuducts,
  initialCategories,
  initialColors
}) => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCategories(initialCategories));
    dispatch(setBrands(initialBrands));
    dispatch(setColors(initialColors));
  }, [dispatch]);
  return (
    <>
      <Modal>
        <HomePage
          deviceType={deviceType}
          brands={initialBrands}
          products={initialProuducts}
          categories={initialCategories}
        />
        <CartPopUp deviceType={deviceType} />
      </Modal>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const fetchInitialBrands = async () => {
    try {
      console.log("fetching initil companies started");
      const res = await jwtAxios.get("companies/");
      console.log("fetching initil companies succedd", res.data);
      return res;
    } catch (error) {
      console.log("fetching initil companies fialed", error);
    }
  };

  const fetchInitialLandinProducts = async () => {
    try {
      console.log("fetching initil products started");
      const res = await jwtAxios.get("products/");
      console.log("fetching initil products succedd", res.data);
      return res;
    } catch (error) {
      console.log("fetching initil products fialed", error);
    }
  };

  const fetchInitialCategories = async () => {
    try {
      const res = await jwtAxios.get("categories/");
      return res;
    } catch (error) {}
  };

  
  
  const brandRes = await fetchInitialBrands();
  const productRes = await fetchInitialLandinProducts();
  const categoriesRes = await fetchInitialCategories();

  return {
    props: {
      initialBrands: brandRes && brandRes.data,
      initialProuducts: productRes && productRes.data,
      initialCategories: categoriesRes && categoriesRes.data,
    },
  };
};

export default index;
