import React from "react";
import PopItems from "./PopularItems/PopularItems";

type Item = {
  icon: string;
  name: string;
  id: number;
};

interface PopCategory {
  data: any[];
}

const PopCategory: React.FC<PopCategory> = ({ data }) => {
  return (
    <div className="container">
      <div className="container">
        <div className="row">
          {data && data.map((item: Item, index: number) => (
            <PopItems key={index} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopCategory;
