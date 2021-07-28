import React, { useEffect } from "react";
import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
import { SEO } from "../../components/seo";
import { Modal } from "@redq/reuse-modal";
import ProductSingleWrapper, {
  ProductSingleContainer,
} from "../../assets/styles/product-single.style";
import { product } from "../../site-settings/product";
import jwtAxios, { setAuthToken } from "src/axios-config/jwtAxios";
import { Cookies } from "react-cookie";
import { fetchSSGProducts } from "src/helpers";

const CartPopUp = dynamic(() => import('@features/carts/cart-popup'), {
  ssr: false,
});



const ProductDetails = dynamic(
  () =>
    import(
      "../../components/Pages/Products/Partials/product-details/product-details"
    )
);



type Props = {
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  data: any;
  [key: string]: any;
};

const ProductPage: NextPage<Props> = ({ product, comments, deviceType }) => {
  let content = <ProductDetails product={product && product} comments={comments} deviceType={deviceType} />;


  // const fetchData = async () => {
  //   try {
  //     console.log("fetching products started");
  //     const res = await jwtAxios.get("user/");
  //     console.log("fetching products succed", res.data);
  //   } catch (error) {
  //     console.log("fetching products failed", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, [])

  


  return (
    <>
      <SEO title="online shop" description="simple online shop" />
      <Modal>
        <ProductSingleWrapper>
          <ProductSingleContainer>
            {content}
            <CartPopUp deviceType={deviceType} />
          </ProductSingleContainer>
        </ProductSingleWrapper>
      </Modal>
    </>
  );
};

// export const getStaticProps: GetStaticProps = async ({ params }: any) => {
//   let data = await fetchProducts();
//   let product = data.find((x: any) => x.id === params && params.id);
  // const productId = params && params.id;
  // const fetchProductById = async () => {
  //   try {
  //     console.log("fetching initil products started");
  //     const res = await jwtAxios.get(`products/${productId}`);
  //     console.log("fetching initil products succedd", res.data);
  //     return res;
  //   } catch (error) {
  //     console.log("fetching initil products fialed", error);
  //   }
  // };

  // const fetchProductComments = async () => {
  //   try {
  //     console.log("fetching initil products started");
  //     const res = await jwtAxios.get(`comments/?product__id=${productId}`);
  //     console.log("fetching initil products succedd", res.data);
  //     return res;
  //   } catch (error) {
  //     console.log("fetching initil products fialed", error);
  //   }
  // };

  // let res = await fetchProductById();
  // let resComments = await fetchProductComments();



 

  // return {
  //   props: {
  //     product: res && res.data,
  //     comments: resComments && resComments.data,
  //   },
  // };

//   return {
//     product: product
// }
// };

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const productId = params && params.id;
  const fetchProductById = async () => {
    try {
      console.log("fetching initil products started");
      const res = await jwtAxios.get(`products/${productId}`);
      console.log("fetching initil products succedd", res.data);
      return res;
    } catch (error) {
      console.log("fetching initil products fialed", error);
    }
  };

  const fetchProductComments = async () => {
    try {
      console.log("fetching initil products started");
      const res = await jwtAxios.get(`comments/?product__id=${productId}`);
      console.log("fetching initil products succedd", res.data);
      return res;
    } catch (error) {
      console.log("fetching initil products fialed", error);
    }
  };

  let res = await fetchProductById();
  let resComments = await fetchProductComments();

  return {
    props: {
      product: res && res.data,
      comments: resComments && resComments.data,
    },
    revalidate: 10,
  };
};

export async function getStaticPaths() {
  let data = await fetchSSGProducts();

  // Get the paths we want to pre-render based on posts
  const paths = data.map((product: any) => ({
      params: {id: product.id.toString()},
  }));

  // We'll pre-render only these paths at build time.
  return {paths, fallback: false}
}

export default ProductPage;
