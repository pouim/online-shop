import { MainContentArea, OfferSection } from "@assets/styles/pages.style";
import { SEO } from "@components/seo";
import React, { useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import PopularCategory from "@components/Pages/Home/Partials/PopularCategory/PopularCategory";
import mockData from "../../../mock_data/data.json";
import ProductsSliderSection from "./Sections/ProductsSliderSection";
import DiscountSection from "./Sections/DiscountSection";
import PriceListsSection from "./Sections/PriceListsSection";
import ImageCategorySection from "./Sections/ImageCategorySection";
import LetmeDescribeYouSection from "./Sections/LetmeDescribeYouSection";
import MostSelledSection from "./Sections/MostSelledSection";
import FAQSection from "./Sections/FAQSection";


const HomePage: React.FC<any> = ({
  deviceType,
  brands,
  products,
  categories,
}) => {
  const faqItems = mockData.Questions;

  return (
    <>
      <SEO title="Online Shop" description="thats a simple online shop" />

      <ProductsSliderSection />

      <OfferSection className="py-3" style={{ backgroundColor: "#F3F3F3" }}>
        <PopularCategory data={categories?.filter((item: any) => item.in_langding)} />
      </OfferSection>

      {/* تخفیف های شگفت انگیز */}
      <DiscountSection deviceType={deviceType} products={products} />
      {/* PRICE LIST SECTION  */}
      <PriceListsSection deviceType={deviceType} brands={brands} />

      {/* IMAGE CATEGORY SECTION */}

      <ImageCategorySection />
      {/* LET ME DESCRIBE FOR YOU SECTION */}

      <LetmeDescribeYouSection deviceType={deviceType} products={products} />

      {/* MOST SELLED SECTION */}

      <MostSelledSection deviceType={deviceType} products={products} />

      {/* FAQ SECTION  */}
      <FAQSection deviceType={deviceType} faqItems={faqItems} />
    </>
  );
};

export default HomePage;
