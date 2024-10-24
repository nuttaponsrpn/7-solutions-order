import { ReactElement } from "react";

export type NavigationMenu = {
  name: string;
  link?: string;
  icon?: ReactElement;

  subMenu?: NavigationMenu[];
};
