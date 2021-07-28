import React, { useCallback, useContext, useEffect, useState } from "react";
import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Modal, openModal, closeModal } from "@redq/reuse-modal";
import Drawer from "react-bottom-drawer";
import {
  MainContentArea,
  SidebarSection,
  ContentSection,
  OfferSection,
  MobileCarouselDropdown,
} from "@assets/styles/pages.style";
// Static Data Import Here

import { useRefScroll } from "@utils/use-ref-scroll";
import { Button } from "@components/button/button";
import MobileSidebar from "@components/Pages/Shop/Partials/MobileSidebar";
import SortByWidget from "@components/Pages/Shop/Partials/Sidebar/SidebarWidgets/SortByWidget";
import Sticky from "react-stickynode";

import Spinner from "@components/spinner";
import jwtAxios from "src/axios-config/jwtAxios";
import { SEO } from "@components/seo";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@store/store";
import {
  Accordion,
  AccordionContext,
  Card,
  Dropdown,
  useAccordionToggle,
} from "react-bootstrap";
import classNames from "classnames";
import ColorSwitchWidget from "@components/Pages/Shop/Partials/Sidebar/SidebarWidgets/ColorFilterWidget";
import SwitchWidget from "@components/Pages/Shop/Partials/Sidebar/SidebarWidgets/SwitchWidget";
import { ShopArrowDownIcon } from "@assets/icons/SidebarArrowDown";
import { ShopArrowUpIcon } from "@assets/icons/SidebarArrowUp";
import { createGlobalStyle } from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { setBrands } from "@store/actions/Brands";
import { setColors } from "@store/actions/Colors";
import { fetchProducts, setProducts } from "@store/actions/Products";
import { fetchError } from "@store/actions";
import NoResultFound from "@components/no-result/no-result";
import CartPopUp from "@features/carts/cart-popup";
import { fetchSSGProducts } from "src/helpers";
const Products = dynamic(
  () =>
    import(
      "@components/Pages/Shop/Partials/product-grid/product-list/product-list"
    )
);

const Sidebar = dynamic(
  () => import("@components/Pages/Shop/Partials/Sidebar")
);

const index: NextPage<any> = ({
  deviceType,
  initialProducts,
  colors,
  brands,
  // searchQuery,
}) => {
  const [selectedBrandValues, setselectedBrandValues] = useState<any>([]);
  const selectedBrandsForDataFetching =
    selectedBrandValues && selectedBrandValues.join("&company=");
  const [selectedColor, setSelectedColor] = useState<any>(null);
  const [orderby, setOrderby] = useState<any>(null);
  const [available, setAvailable] = useState(false);
  const [draverVisible, setDraverVisible] = useState(false);

  const dispatch = useDispatch();
  const commonState = useSelector((state: AppState) => state.common);
  const { products } = useSelector((state) => state.products);
  const { loading } = commonState;
  const [fetchQuery, setFetchQuery] = useState<any>();
  const { query } = useRouter();
  const router = useRouter();
  const { elRef: targetRef, scroll } = useRefScroll({
    percentOfElement: 0,
    percentOfContainer: 0,
    offsetPX: -110,
  });

  const CartPopupStyle = createGlobalStyle`
  .cartPopup{
    top: auto !important;
    left: auto !important;
    bottom: 0 !important;
    right: 0 !important;
    width: 300px!impoertant;
    max-width: 300px!important;
    box-shadow: ${themeGet("shadows.big", "0 21px 36px rgba(0, 0, 0, 0.16)")};
    transform-origin: right;

    @media (max-width: 580px) {
      max-width: none!important;
      width: 100% !important;
      bottom: 0px !important;
      top: auto !important;
      left: 0!important;
      background: ${themeGet("colors.white", "#ffffff")};
      overflow: initial !important;
      transform-origin: bottom center;
    }
  }
`;

  //method//
  const onCheckHandler = (id: any) =>
    selectedBrandValues.includes(id) ? true : false;

  const onchangeBrandHandler = (id: any) => {
    if (selectedBrandValues.includes(id)) {
      setselectedBrandValues((prevState: any[]) => {
        return prevState.filter((item): any => item !== id);
      });
    } else {
      setselectedBrandValues([...selectedBrandValues, id]);
    }
  };

  const onColorFilterHandler = async (color: any, e: any) => {
    setSelectedColor(color.color_code);
  };

  console.log("query", query.QUERY);

  const fetchProductsBySearch = async () => {
    const serach = query.QUERY ? query.QUERY.toString(): "";
    try {
      const res = await jwtAxios.get(
        `products/?limit=50&offset=0&search=${encodeURI(serach)}`
      );

      dispatch(setProducts(res.data));
      
      return res;
    } catch (error) {
      console.log("fetching initil products fialed", error);
    }
  };

  //end of methods//

  useEffect(() => {
    // dispatch(setProducts(initialProducts));
    dispatch(setColors(colors));
    dispatch(setBrands(brands));
  }, [dispatch]);

  useEffect(() => {
    if (selectedBrandValues.length > 0) {
      setFetchQuery("&company=" + selectedBrandsForDataFetching);
      if (selectedColor) {
        setFetchQuery(
          "&company=" +
            selectedBrandsForDataFetching +
            "&colors__color_code=" +
            selectedColor.substring(1)
        );
      }
      if (available) {
        setFetchQuery(
          "&company=" + selectedBrandsForDataFetching + "&only_available=true"
        );
      }
      if (orderby) {
        setFetchQuery(
          "&company=" + selectedBrandsForDataFetching + "&ordering=" + orderby
        );
      }
    } else if (selectedColor) {
      setFetchQuery(
        "&colors__color_code=" + "%23" + selectedColor.substring(1)
      );
    } else if (available) {
      setFetchQuery("&only_available=true");
    } else if (orderby) {
      setFetchQuery("&ordering=" + orderby);
    } else {
      setFetchQuery("");
    }
  }, [selectedBrandValues, selectedColor, available, orderby]);

  useEffect(() => {
    if (fetchQuery) {
      dispatch(fetchProducts(fetchQuery));
    }
  }, [dispatch, fetchQuery]);


  useEffect(() => {
    fetchProductsBySearch();
  }, [query.QUERY])



  const CustomSidebarToggle = ({ children, eventKey, callback }: any) => {
    const currentEventKey = useContext(AccordionContext);

    const decoratedOnClick = useAccordionToggle(
      eventKey,
      () => callback && callback(eventKey)
    );

    const isCurrentEventKey = currentEventKey === eventKey;

    return (
      <div
        className="d-flex justify-content-between align-items-center"
        onClick={decoratedOnClick}
        style={{ cursor: "pointer" }}
      >
        <h4>برند</h4>
        {isCurrentEventKey ? (
          <ShopArrowUpIcon height={19} width={19} />
        ) : (
          <ShopArrowDownIcon height={19} width={19} />
        )}
      </div>
    );
  };

  const CustomDropDownToggle = React.forwardRef(
    ({ children, onClick }: any, ref: any) => (
      <div
        className="my-4 p-3"
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
        style={{
          backgroundColor: "#FFF",
          width: "100%",
          borderRadius: "15px",
          cursor: "pointer",
        }}
      >
        <div className="d-flex align-items-center justify-content-between">
          {children}
          <ShopArrowDownIcon hegiht={19} width={19} />
        </div>
      </div>
    )
  );

  const MobileFilterWidget = () => {
    return (
      <MobileSidebar>
        <Accordion
          defaultActiveKey="0"
          style={{ direction: "rtl" }}
          className=" mr-3"
        >
          <Card style={{ borderRadius: "20px" }}>
            <Card.Header
              style={{
                backgroundColor: "#fff",
                borderBottom: ".001rem solid #647CFF",
              }}
            >
              <CustomSidebarToggle eventKey="0">Click me!</CustomSidebarToggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                {brands &&
                  brands.map((brand: any, index: number) => (
                    <div className="d-flex flex-column mt-3">
                      <div
                        className={classNames(
                          "d-flex align-items-center justify-content-between"
                        )}
                      >
                        <label
                          htmlFor={`cat-${index + 1}`}
                          style={{ cursor: "pointer" }}
                        >
                          {brand.name}
                        </label>
                        <input
                          onChange={() => onchangeBrandHandler(brand.id)}
                          type="checkbox"
                          id={`cat-${index + 1}`}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                    </div>
                  ))}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>

        {/* <SwitchWidget label="فقط کالاهای موجود" /> */}

        <div
          className="d-flex mr-3 mt-4  justify-content-between"
          style={{
            backgroundColor: "#FFFFFF",
            padding: "12px 30px",
            paddingRight: "25px",
            borderRadius: "1rem",
          }}
        >
          <input id="s2" type="checkbox" className="switch" />
          <label htmlFor="s2">فقط کالاهای موجود</label>
        </div>

        <ColorSwitchWidget />
      </MobileSidebar>
    );
  };

  const onFilterHandler = () => {
    openModal({
      show: true,
      config: {
        className: "cartPopup",
        width: "100%",
        height: "auto",
        enableResizing: false,
        disableDragging: true,
        transition: {
          tension: 360,
          friction: 40,
        },
      },
      closeOnClickOutside: true,
      component: MobileFilterWidget,
      closeComponent: () => <div />,
      componentProps: { onCloseBtnClick: closeModal, scrollbarHeight: 330 },
    });
  };

  let ProductsContent = <NoResultFound />;
  if (products && products.length > 0) {
    ProductsContent = (
      <div ref={targetRef}>
        <Products
          deviceType={deviceType}
          fetchLimit={20}
          products={products && products}
        />
      </div>
    );
  }

  let content = (
    <div style={{ height: "50vw" }}>
      <Spinner />
    </div>
  );
  if (!loading || !router.isFallback) {
    content = (
      <Modal>
        <MobileCarouselDropdown>
          <CartPopupStyle />
          <div
            className="d-flex align-items-center justify-content-between mx-1"
            style={{ direction: "rtl" }}
          >
            <Button onClick={() => setDraverVisible(true)} variant="text">
              فیلتر
            </Button>
            <Dropdown style={{ direction: "rtl" }} className="mr-3">
              <Dropdown.Toggle
                as={CustomDropDownToggle}
                id="dropdown-custom-components"
              >
                <h5 className="text-right"> مرتب سازی بر اساس</h5>
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ textAlign: "center" }}>
                <Dropdown.Item onClick={() => setOrderby("-price")}>
                  بیشترین قیمت
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setOrderby("price")}>
                  کمترین قیمت
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setOrderby("sale_count")}>
                   پر فروش ترین
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </MobileCarouselDropdown>

        <MainContentArea>
          <ContentSection>{ProductsContent}</ContentSection>

          <SidebarSection>
            {/* <Sticky enabled={true}  top={10}> */}

            {/* <SortByWidget /> */}
            <Dropdown style={{ direction: "rtl" }} className="mr-3">
              <Dropdown.Toggle
                as={CustomDropDownToggle}
                id="dropdown-custom-components"
              >
                <h5 className="text-right"> مرتب سازی بر اساس</h5>
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ textAlign: "center" }}>
                <Dropdown.Item onClick={() => setOrderby("-price")}>
                  بیشترین قیمت
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setOrderby("price")}>
                  کمترین قیمت
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setOrderby("sale_count")}>
                پر فروش ترین
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Accordion
              defaultActiveKey="0"
              style={{ direction: "rtl" }}
              className=" mr-3"
            >
              <Card style={{ borderRadius: "20px" }}>
                <Card.Header
                  style={{
                    backgroundColor: "#fff",
                    borderBottom: ".001rem solid #647CFF",
                  }}
                >
                  <CustomSidebarToggle eventKey="0">
                    Click me!
                  </CustomSidebarToggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    {brands &&
                      brands.map((brand: any, index: number) => (
                        <div className="d-flex flex-column mt-3">
                          <div
                            className={classNames(
                              "d-flex align-items-center justify-content-between"
                            )}
                          >
                            <label
                              htmlFor={`cat-${index + 1}`}
                              style={{ cursor: "pointer" }}
                            >
                              {brand.name}
                            </label>
                            <input
                              onChange={() => onchangeBrandHandler(brand.id)}
                              checked={selectedBrandValues.includes(brand.id)}
                              type="checkbox"
                              id={`cat-${index + 1}`}
                              style={{ cursor: "pointer" }}
                            />
                          </div>
                        </div>
                      ))}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>

            {/* <SwitchWidget label="فقط کالاهای موجود" /> */}
            <div
              className="d-flex mr-3 mt-4  justify-content-between"
              style={{
                backgroundColor: "#FFFFFF",
                padding: "12px 30px",
                paddingRight: "25px",
                borderRadius: "1rem",
              }}
            >
              <input
                id="s2"
                type="checkbox"
                className="switch"
                checked={available}
                onChange={() => setAvailable(!available)}
              />
              <label htmlFor="s2">فقط کالاهای موجود</label>
            </div>

            <ColorSwitchWidget
              colors={colors}
              onClick={(color: any, e: any) => onColorFilterHandler(color, e)}
            />
            {/* </Sticky> */}
          </SidebarSection>
        </MainContentArea>
      </Modal>
    );
  }

  return (
    <div style={{ marginTop: "4rem" }}>
      <SEO title="Online Shop" description="simple online shop" />
      {content}
      <Drawer
        duration={250}
        hideScrollbars={false}
        onClose={() => setDraverVisible(false)}
        isVisible={draverVisible}
      >
        <Accordion
          defaultActiveKey="0"
          style={{ direction: "rtl" }}
        >
          <Card style={{ borderRadius: "20px" }}>
            <Card.Header
              style={{
                backgroundColor: "#fff",
                borderBottom: ".001rem solid #647CFF",
              }}
            >
              <CustomSidebarToggle eventKey="0">Click me!</CustomSidebarToggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                {brands &&
                  brands.map((brand: any, index: number) => (
                    <div className="d-flex flex-column mt-3">
                      <div
                        className={classNames(
                          "d-flex align-items-center justify-content-between"
                        )}
                      >
                        <label
                          htmlFor={`cat-${index + 1}`}
                          style={{ cursor: "pointer" }}
                        >
                          {brand.name}
                        </label>
                        <input
                          onChange={() => onchangeBrandHandler(brand.id)}
                          checked={selectedBrandValues.includes(brand.id)}
                          type="checkbox"
                          id={`cat-${index + 1}`}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                    </div>
                  ))}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>

        <div
          className="d-flex  mt-4  justify-content-between"
          style={{
            backgroundColor: "#FFFFFF",
            padding: "12px 30px",
            paddingRight: "25px",
            borderRadius: "1rem",
          }}
        >
          <input
            id="s2"
            type="checkbox"
            className="switch"
            checked={available}
            onChange={() => setAvailable(!available)}
          />
          <label htmlFor="s2">فقط کالاهای موجود</label>
        </div>
        <ColorSwitchWidget
          colors={colors}
          onClick={(color: any, e: any) => onColorFilterHandler(color, e)}
        />
      </Drawer>
        {draverVisible === false ? <CartPopUp deviceType={deviceType} />: null}
    </div>
  );
};

index.getInitialProps = async (ctx) => {
  const fetchInitialBrands = async () => {
    try {
      const res = await jwtAxios.get("companies/");
      return res;
    } catch (error) {
      console.log("fetching initil products fialed", error);
    }
  };

  const fetchInitialColors = async () => {
    try {
      const res = await jwtAxios.get("colors/");
      return res;
    } catch (error) {
      console.log("fetching initil Colors fialed", error);
    }
  };

  // let res = await fetchProductsBySearch();
  let brandsRes = await fetchInitialBrands();
  let resColors = await fetchInitialColors();

  return {
    brands: brandsRes && brandsRes.data,
    colors: resColors && resColors.data,
  };
};


export default index;
