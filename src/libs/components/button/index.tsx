import { MouseEventHandler } from "react";

interface ButtonProp {
  name: string;
  type?: "button" | "submit";
  size?: string;
  variant?: string;
  subName?: string;
  link?: string;
  icon?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

import "./button.style.scss";

const Button = (prop: ButtonProp) => {
  return (
    <button
      type={prop.type || "button"}
      onClick={prop.onClick}
      className={`${prop.variant} ${prop.size}`}
    >
      {prop.name} {prop?.icon && <i className={`ti ti-${prop.icon}`}></i>}
    </button>
  );
};

export default Button;
