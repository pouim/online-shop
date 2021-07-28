import { FC } from "react";

interface SwitchWidgetProps {
  label: string;
}
const SwitchWidget: FC<SwitchWidgetProps> = ({ label }) => {
  return (
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
      <label htmlFor="s2">{label}</label>
    </div>
  );
};

export default SwitchWidget;
