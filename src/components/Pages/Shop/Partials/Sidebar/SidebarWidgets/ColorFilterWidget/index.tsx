import { FC } from "react";

const ColorSwitchWidget: FC<any> = ({ colors, onClick }) => {
  return (
    <div className="d-flex mt-3 align-items-center justify-content-center">
      {colors && colors.map((color: any)=> (
        <button
          className="btn btn-primary rounded-circle mr-2"
          style={{ padding: ".7rem", backgroundColor: `${color.color_code}` }}
          onClick={(e) => onClick(color, e)}
        />
      ))}
    </div>
  );
};

export default ColorSwitchWidget;
