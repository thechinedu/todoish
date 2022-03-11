import styles from "./index.module.css";

import cn from "classnames";
import { FC } from "react";

type ContainerProps = {
  className?: string;
};

const Container: FC<ContainerProps> = ({ className = "", children }) => {
  return <div className={cn(styles.container, className)}>{children}</div>;
};

export default Container;
