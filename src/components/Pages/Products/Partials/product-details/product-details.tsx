import React, { useEffect, useState } from "react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { Button } from "@components/button/button";
import MultiCarousel from "@components/carousel/carousel";
import { openModal } from "@redq/reuse-modal";
import AuthenticationForm from "@features/authentication-form";
import {OfferSection } from "@assets/styles/pages.style";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {
  ProductDetailsWrapper,
  ProductPreview,
  ProductInfo,
  ProductTitlePriceWrapper,
  ProductTitle,
  BackButton,
  ProductWeight,
  ProductDescription,
  ButtonText,
  ProductMeta,
  ProductCartWrapper,
  ProductPriceWrapper,
  ProductPrice,
  SalePrice,
  ProductCartBtn,
  MetaSingle,
  MetaItem,
  RelatedItems,
  SubLabel,
  ProductSpecification
} from "./product-details.style";
import { LongArrowLeft } from "@assets/icons/LongArrowLeft";
import { CartIcon } from "@assets/icons/CartIcon";
import ReadMore from "@components/truncate/truncate";
import CarouselWithCustomDots from "@components/multi-carousel/multi-carousel";

import { useCart } from "@context/cart/use-cart";
import { Counter } from "@components/counter/counter-1/counter";
import Rating from "@components/Rating/Rating";
import { siteOffers } from "src/site-settings/site-offers";
import Desc from "@components/Pages/Products/Partials/Description";
import jwtAxios from "src/axios-config/jwtAxios";
import { CheckIcon } from "@assets/icons/Check";
import { addToCart, updateCart } from "@store/actions/Cart";
import App from "next/app";
import { AppState } from "@store/store";
import { useDispatch, useSelector } from "react-redux";
import { UnAvailable } from "../product-card/product-card.style";
import { onSingInRefresh } from "@store/actions";
import { CheckMark } from "@assets/icons/CheckMark";
import Tooltip from '@components/Tooltip';

type ProductDetailsProps = {
  product: any;
  comments?: any;
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};

const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  comments,
  deviceType,
}) => {
  const isRtl = true;
  const { addItem, removeItem } = useCart();
  const {cartItems, cartLoading} = useSelector((state: AppState) => state.cart)
  const data = product;
  const [similiarProducts, setSimiliarProducts] = useState<any>([]);
  const [selectedColor, setSelectedColor] = useState<any>(null);
  const {token} = useSelector((state: AppState) => state.auth);
  // const {loading} = useSelector(state => state.common);
  const router = useRouter();
  const dispatch = useDispatch();
  let productGalerry = [];

  if(product.photo_1) {
    productGalerry.push({
      url: product.photo_1,
      alt: product.title,
      key: product.id,
    });
    if(product.photo_2) {
      productGalerry.push({
        url: product.photo_2,
        alt: product.title,
        key: product.id,
      });
    }
    if(product.photo_3) {
      productGalerry.push({
        url: product.photo_3,
        alt: product.title,
        key: product.id,
      });
    }
    if(product.photo_4) {
      productGalerry.push({
        url: product.photo_4,
        alt: product.title,
        key: product.id,
      });
    }
  }

//methods 
  const isSelectedColor = (id: any) => {
    return selectedColor?.id === id;
  };

  const isInCart = (id: any) => {
    return cartItems?.some((item: any) => item.product.id === id && item.color.id === selectedColor?.id );
  };

  const getItem = (id: any) => {
    return cartItems?.find((item: any) => item.product.id === id);
    
  };

  const getItemToUpdate = (id: any) => {
    return cartItems?.find((item: any) => item.product.id === id && item.color.id === selectedColor?.id);
  }
  
  //

  const fetchSimiliarProducts = async () => {
    try {
      console.log('fetch similiar products started');
      const res = await jwtAxios.get(`products/?limit=20&offset=0&category=${product.category.id}`)
      console.log('fetch similiar products suceed', res.data);
      setSimiliarProducts(res.data.results);
    } catch (error) {
      console.log('fetch similiar products failed', error);
    }
  }

  const handleJoin = () => {
    dispatch(onSingInRefresh());
    openModal({
      show: true,
      overlayClassName: "quick-view-overlay",
      closeOnClickOutside: true,
      component: AuthenticationForm,
      closeComponent: "",
      config: {
        enableResizing: false,
        disableDragging: true,
        className: "quick-view-modal",
        width: 458,
        height: "auto",
      },
    });
  };

  const handleAddToCartClick = () => {
    // if not Legeid In => Log In //
    if(!token) {
      handleJoin();
    }
    dispatch(
      addToCart({
        ID: data.id,
        colorID: selectedColor.id,
      })
    );
  };

  const handleAddClick = () => {
    // e.stopPropagation();
    // addItem(data);
    const cartID =  getItemToUpdate(data.id) && getItemToUpdate(data.id).id;
    const newData = {
      ID : data.id,
      colorID: selectedColor.id,
      quantity: getItemToUpdate(data.id) && getItemToUpdate(data.id).quantity + 1,
    }
   dispatch(updateCart(newData, cartID));
   
  };

  const handleRemoveClick = () => {
    // e.stopPropagation();
    const cartID =  getItemToUpdate(data.id) && getItemToUpdate(data.id).id;
    const newData = {
      ID : data.id,
      colorID: selectedColor.id,
      quantity: getItemToUpdate(data.id) && getItemToUpdate(data.id).quantity - 1,
    }
   dispatch(updateCart(newData, cartID));
   
  };

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);
  }, []);

   useEffect(() => {
     fetchSimiliarProducts();
   }, [])

   useEffect(() => {
     setSelectedColor(getItem(data.id) && getItem(data.id).color)
   }, [])

 

  return (
    <>
      <ProductDetailsWrapper className="product-card" dir="ltr">
        <ProductInfo dir={isRtl ? "rtl" : "ltr"}>
          <div className="d-flex">
            <ProductTitlePriceWrapper>
              <ProductTitle>{product.title}</ProductTitle>
              <div
                className="d-flex flex-row-reverse my-3"
                style={{ direction: "ltr" }}
              >
                <Rating ratingNumber={product.rate} />
                <SubLabel>از 2500 رای</SubLabel>
              </div>

              <div className="d-flex flex-column">
                {product.features &&
                  product.features
                    .filter((item: any) => item.featured)
                    .map((item: any) => (
                      <div className="d-flex flex-row my-2">
                        <img
                          src="/tick.svg"
                          className="mx-2"
                          style={{ height: 16, width: 12 }}
                        />
                        <ProductSpecification>
                          {item.title}: {item.value}
                        </ProductSpecification>
                      </div>
                    ))}

                {product.warranty && (
                  <div className="d-flex mr-3 my-2">
                    <ProductSpecification>گارانتی</ProductSpecification>
                    <div
                      className="mr-1"
                      style={{
                        backgroundColor: "#516EFF",
                        color: "white",
                        borderRadius: "2rem",
                        padding: "0 1.5rem",
                      }}
                    >
                      {product.warranty.title}
                    </div>
                  </div>
                )}

                <div className="d-flex mr-3 my-2">
                  <ProductSpecification>رنگ</ProductSpecification>

                  <div className="d-flex align-items-center justify-content-center ">
                    {product.colors &&
                      product.colors.map((item: any) => {
                        const colorCode = item.color_code;
                        const Border = isSelectedColor(item.id)
                          ? "3px solid #D4AF37"
                          : "none";
                        return (
                          // <Button
                          //   className="mr-2"
                          //   style={{
                          //     borderRadius: 100,
                          //     height: 30,
                          //     width: 30,
                          //     // padding: 20,
                          //     backgroundColor: colorCode,
                          //   }}
                          //   onClick={() => setSelectedColor(item)}
                          // >
                          //   {isSelectedColor(item.id) && <CheckMark />}
                          // </Button>

                          <div
                            onClick={() => setSelectedColor(item)}
                            style={{
                              padding: "0.7rem",
                              backgroundColor: colorCode,
                              borderRadius: "2rem",
                              marginRight: "0.5rem",
                              cursor: "pointer",
                              border: Border,
                            }}
                          />
                        );
                      })}
                  </div>
                </div>
              </div>

              <ProductCartWrapper>
                {data.available ? (
                  <ProductCartBtn>
                    {!isInCart(data.id) ? (
                      <Button
                        disabled={!selectedColor}
                        className="cart-button"
                        loading={cartLoading}
                        variant="primary"
                        size={deviceType.mobile && "small"}
                        style={{ borderRadius: 10, padding: ".1rem 2rem" }}
                        onClick={handleAddToCartClick}
                      >
                        <ButtonText>افزودن به سبد خرید</ButtonText>
                        <CartIcon mr={2} />
                      </Button>
                      
                    ) : (
                      <Counter
                        disabled={!selectedColor}
                        loading={cartLoading}
                        value={
                          getItemToUpdate(data.id) &&
                          getItemToUpdate(data.id).quantity
                        }
                        onDecrement={handleRemoveClick}
                        onIncrement={handleAddClick}
                      />
                    )}
                  </ProductCartBtn>
                ) : (
                  <UnAvailable>ناموجود</UnAvailable>
                )}
              </ProductCartWrapper>
            </ProductTitlePriceWrapper>

            <div className="container d-none d-lg-flex mr-5 ">
              <div className="row mr-5">
                <div className="col-12 Col-sm-12">
                  <div className="d-flex align-items-center justify-content-around ">
                    {/* <button
                      className="btn btn-primary"
                      style={{
                        backgroundColor: "#F5F5F5",
                        borderRadius: ".7rem",
                        border: "none",
                      }}
                    >
                      <img src="/share.png" style={{ height: 18, width: 18 }} />
                    </button> */}
                    {/* <button
                      className="btn btn-primary"
                      style={{
                        backgroundColor: "#F5F5F5",
                        borderRadius: ".7rem",
                        border: "none",
                      }}
                    >
                      <img src="/bell.png" style={{ height: 18, width: 18 }} />
                    </button> */}
                    {/* <button
                      className="btn btn-primary"
                      style={{
                        backgroundColor: "#F5F5F5",
                        borderRadius: ".7rem",
                        border: "none",
                      }}
                    >
                      <img src="/heart.png" style={{ height: 18, width: 18 }} />
                    </button> */}
                  </div>
                </div>

                <div className="col-12 Col-sm-12">
                  <div
                    className="d-flex justify-content-center align-items-center py-1 px-4 mb-3"
                    style={{
                      backgroundColor: "#F5F5F5",
                      borderRadius: ".9rem",
                    }}
                  >
                    <img
                      src="/express-delivery.svg"
                      className="img-fluid ml-3"
                      style={{ height: 30, width: 30 }}
                    />
                    <p>تحویل سریع کالا</p>
                  </div>

                  <div
                    className="d-flex justify-content-center align-items-center py-1 px-4 mb-3"
                    style={{
                      backgroundColor: "#F5F5F5",
                      borderRadius: ".9rem",
                    }}
                  >
                    <img
                      src="/express-delivery.svg"
                      className="img-fluid ml-3"
                      style={{ height: 30, width: 30 }}
                    />
                    <p>پاسخگویی سریع</p>
                  </div>
                  <div
                    className="d-flex justify-content-center align-items-center py-1 px-4 mb-3"
                    style={{
                      backgroundColor: "#F5F5F5",
                      borderRadius: ".9rem",
                    }}
                  >
                    <img
                      src="/payment.svg"
                      className="img-fluid ml-3"
                      style={{ height: 30, width: 30 }}
                    />
                    <p>پرداخت امن</p>
                  </div>

                  <div
                    className="d-flex justify-content-center align-items-center py-1 px-4 mb-3"
                    style={{
                      backgroundColor: "#F5F5F5",
                      borderRadius: ".9rem",
                    }}
                  >
                    <img
                      src="/verify.svg"
                      className="img-fluid ml-3 "
                      style={{ height: 30, width: 30 }}
                    />
                    <p>ضمانت اصالت </p>
                  </div>
                </div>
              </div>
            </div>

            <ProductMeta>
              <MetaSingle>
                {product?.categories?.map((item: any) => (
                  <Link
                    href={`/${product.type.toLowerCase()}?category=${
                      item.slug
                    }`}
                    key={`link-${item.id}`}
                  >
                    {
                      <a>
                        <MetaItem>{item.title}</MetaItem>
                      </a>
                    }
                  </Link>
                ))}
              </MetaSingle>
            </ProductMeta>
          </div>
        </ProductInfo>

        {isRtl && (
          <ProductPreview>
            <CarouselWithCustomDots
              items={productGalerry}
              deviceType={deviceType}
            />
          </ProductPreview>
        )}
      </ProductDetailsWrapper>

      {/* PRODUCT DESCRIPTIO SECTION    */}

      <div
        className="p-2 mx-0 mx-lg-4"
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "1.5rem",
        }}
      >
        <Desc
          deviceType={deviceType}
          data={product}
          comments={comments}
          productId={product.id}
        />
      </div>

      {/* RELATED PRODUCTS SECTION    */}

      <OfferSection style={{ backgroundColor: "#F3F3F3" }}>
        <div style={{ margin: "0 -10px", direction: "rtl" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              onClick={() =>
                router.push(`/shop/category/${product.category.id}`)
              }
              style={{
                backgroundColor: "transparent",
                color: "black",
                marginBottom: "2rem",
                fontSize: "23px",
              }}
            >
              محصولات مشابه
            </Button>
            <Link
              href={{
                pathname: `/shop/category/${product.category.id}`,
              }}
            >
              <a className="text-decoration-none">
                <div className="d-flex align-items-center">
                  <Button variant="text" style={{ color: "#000000" }}>
                    مشاهده همه
                  </Button>
                  <img src="/next.svg" style={{ height: 13, width: 13 }} />
                </div>
              </a>
            </Link>
          </div>

          <MultiCarousel
            data={similiarProducts && similiarProducts}
            deviceType={deviceType}
          />
        </div>
      </OfferSection>
    </>
  );
};

export default ProductDetails;
