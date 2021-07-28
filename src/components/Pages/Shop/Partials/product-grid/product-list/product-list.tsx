import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import {
  ProductsRow,
  ProductsCol,
  ButtonWrapper,
  LoaderWrapper,
  LoaderItem,
  ProductCardWrapper,
} from "./product-list.style";

import Fade from "react-reveal/Fade";
import { Button } from "@components/button/button";
import { fetchMoreProducts } from "@store/actions/Products";
import { useDispatch, useSelector } from "react-redux";

const ErrorMessage = dynamic(
  () => import("@components/error-message/error-message")
);

const GeneralCard = dynamic(
  import("@components/Pages/Products/Partials/product-card/product-card")
);

type ProductsProps = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  fetchLimit?: number;
  loadMore?: boolean;
  type?: string;
  products: any[];
};
export const Products: React.FC<ProductsProps> = ({
  deviceType,
  fetchLimit = 20,
  loadMore = true,
  type,
  products,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {next, isLoading} = useSelector(state => state.products);
  const {loading} = useSelector(state => state.common);

  const handleLoadMore = () => {
    // fetchMore({
    //   variables: {
    //     offset: Number(data.products.items.length),
    //     limit: fetchLimit,
    //   },
    //   updateQuery: (previousResult, { fetchMoreResult }) => {
    //     if (!fetchMoreResult) {
    //       return previousResult;
    //     }
    //     return {
    //       products: {
    //         __typename: previousResult.products.__typename,
    //         items: [
    //           ...previousResult.products.items,
    //           ...fetchMoreResult.products.items,
    //         ],
    //         hasMore: fetchMoreResult.products.hasMore,
    //       },
    //     };
    //   },
    // });
    dispatch(fetchMoreProducts(next));
  };

  const renderCard = (props: any) => {
    return (
      <GeneralCard
        id= {props.id}
        title={props.title}
        description={props.description}
        image={props.photo_main}
        weight={props.unit}
        currency="تومان"
        colors={props.colors}
        available= {props.available}
        price={props.real_price}
        salePrice={props.price}
        discountInPercent={props.discount_percent}
        data={props}
        deviceType={deviceType}
        rating={props.rate}
        onClick={(id) => router.push(`/product/${id}`)}
      />
    );
  };

  return (
    <>
      <ProductsRow>
        {products &&
          products.map((item: any, index: number) => (
            <ProductsCol key={index}>
              <ProductCardWrapper>
                <Fade
                  duration={800}
                  delay={index * 10}
                  style={{ height: "100%" }}
                >
                  {renderCard(item)}
                </Fade>
              </ProductCardWrapper>
            </ProductsCol>
          ))}
      </ProductsRow>
      {next && (
        <ButtonWrapper>
          <Button
            onClick={() => dispatch(fetchMoreProducts(next))}
            loading={isLoading}
            variant="primary"
            style={{
              fontSize: 16,
              padding: "10px 35px",
            }}
            border="1px solid #f1f1f1"
          >
            بیشتر
          </Button>
        </ButtonWrapper>
      )}
    </>
  );
};
export default Products;
