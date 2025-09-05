import { CSSProperties, ReactNode } from "react";

import { classnames } from "../../helpers/classnames";
import styles from "./Typography.module.css";

interface Tags {
  h1: "h1";
  h2: "h2";
  h3: "h3";
  h4: "h4";
  h5: "h5";
  h6: "h6";
  p: "p";
  div: "div";
}
//для каждого варианта прописать стили
//вообще прописать свои варианты
interface Variants {
  text_12_m: "text_12_m";
  text_14_m: "text_14_m";
  text_16_r: "text_16_r";
  text_16_m: "text_16_m";
  text_16_b: "text_16_b";
  text_20_r: "text_20_r";
  text_20_m: "text_20_m";
  text_20_b: "text_20_b";
  text_24_r: "text_24_r";
  text_24_m: "text_24_m";
  text_24_b: "text_24_b";
  text_32_b: "text_32_b";
  text_36_b: "text_26_b";
}

type Tag = keyof Tags;
type Variant = keyof Variants;

interface TypographyProps {
  tag?: Tag;
  variant?: Variant;
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  onClick?: () => void;
}

export const Typography = ({
  tag = "div",
  variant = "text_16_m",
  children,
  onClick,
  style,
  className,
}: TypographyProps) => {
  const Component = tag;

  return (
    <Component
      style={style}
      onClick={onClick}
      className={classnames(className, styles[variant])}
    >
      {children}
    </Component>
  );
};
