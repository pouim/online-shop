import Accordion from "@components/accordion/accordion";
import AccordionWrapper from "@components/accordion/accordion.style";
import { toggleBrandsCategory } from "@store/actions";
import { AppState } from "@store/store";
import classNames from "classnames";
import { Panel } from "rc-collapse";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const BrandsCategoryWidget = ({ brands, className }: any) => {
  const { selectedBrands } = useSelector((state: AppState) => state.common);
  const dispatch = useDispatch();

  const onchangeHandler = (id: any) => {
    dispatch(toggleBrandsCategory(id));
  };

  const headerElements = (
    <div style={{ borderBottomColor: "red" }}>
      <h2 style={{ fontSize: "1.7rem" }}>برند</h2>
    </div>
  );

  return (
    <Accordion headerElements={headerElements} active>
      <div className="mt-2" style={{ borderTop: "1px solid #516EFF" }}>
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
                  onChange={() => onchangeHandler(brand.id)}
                  type="checkbox"
                  id={`cat-${index + 1}`}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
          ))}
      </div>
    </Accordion>
  );
};

export default BrandsCategoryWidget;
