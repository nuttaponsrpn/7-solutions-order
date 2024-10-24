"use client";

import { NavigationMenu } from "@/types/NavigationMenu.type";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import CottageRoundedIcon from "@mui/icons-material/CottageRounded";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ListAltIcon from "@mui/icons-material/ListAlt";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import TerminalIcon from "@mui/icons-material/Terminal";
import { Collapse, styled, SxProps, Theme } from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";

const menuList: NavigationMenu[] = [
  { name: "Home", link: "/", icon: <CottageRoundedIcon /> },
  {
    name: "Assignment",
    link: "/Assignment",
    icon: <AssignmentRoundedIcon />,
    subMenu: [
      {
        name: "Auto Delete Todo",
        icon: <ListAltIcon />,
        subMenu: [
          {
            name: "Demo",
            link: "/Assignment/AutoDeleteTodoList",
            icon: <ListAltIcon />,
          },
          { name: "Components", link: "/Assignment/AutoDeleteTodoList/Components", icon: <TerminalIcon /> },
          { name: "Technical", link: "/Assignment/AutoDeleteTodoList/Technical", icon: <MenuBookIcon /> },
        ],
      },
      {
        name: "Convert Data",
        icon: <DisplaySettingsIcon />,
        subMenu: [
          {
            name: "Demo",
            link: "/Assignment/ConvertData",
            icon: <DisplaySettingsIcon />,
          },
          { name: "Technical", link: "/Assignment/ConvertData/Technical", icon: <MenuBookIcon /> },
        ],
      },
    ],
  },
];

export default function LeftNavigation() {
  const pathname = usePathname();

  const MenuList = ({ item, style }: { item: NavigationMenu; style?: SxProps<Theme> }) => {
    const [open, setOpen] = useState(true);
    const hasSubMenu = !!item.subMenu && item.subMenu.length;

    function handleClick() {
      setOpen(!open);
    }

    const StyledListItemText = useCallback(
      ({ name }: { name: string }) => (
        <ListItemText primary={name} primaryTypographyProps={{ sx: { fontSize: "14px", textWrap: "nowrap" } }} />
      ),
      [],
    );

    return (
      <>
        <Link href={!!item.link && item.link !== "#" ? item.link : "#"}>
          <StyledListItemButton
            key={item.name + item.link}
            selected={item.link === pathname}
            sx={{ ...style }}
            onClick={handleClick}
          >
            <StyledListItemIcon>{item.icon}</StyledListItemIcon>
            <StyledListItemText name={item.name} />

            <StyledListItemIcon className="text-[#9e9e9e] justify-end">
              {hasSubMenu ? open ? <ExpandLess /> : <ExpandMore /> : <></>}
            </StyledListItemIcon>
          </StyledListItemButton>
        </Link>

        {!!hasSubMenu &&
          item!.subMenu!.map((subMenu) => (
            <Collapse unmountOnExit component="div" in={open} key={subMenu.name + subMenu.link} timeout="auto">
              {!!subMenu.subMenu?.length ? (
                <MenuList item={subMenu} style={{ pl: 4 }} />
              ) : (
                <Link href={!subMenu?.subMenu?.length && !!subMenu.link ? subMenu.link : "#"}>
                  <StyledListItemButton selected={subMenu.link === pathname} sx={{ pl: !!style ? 6 : 4 }}>
                    <StyledListItemIcon>{subMenu.icon}</StyledListItemIcon>
                    <StyledListItemText name={subMenu.name} />
                  </StyledListItemButton>
                </Link>
              )}
            </Collapse>
          ))}
      </>
    );
  };

  return (
    <List
      className="w-full max-w-80"
      component="nav"
      subheader={
        <ListSubheader className="!bg-transparent border-b-[1px] boder-solid border-[#DEDEDE]" component="div">
          7 Solutions
        </ListSubheader>
      }
    >
      {menuList.map((item) => (
        <MenuList item={item} key={item.name + item.link} />
      ))}
    </List>
  );
}

const StyledListItemButton = styled(ListItemButton)`
  padding-top: 4px;
  padding-bottom: 4px;
  padding-right: 8px;
`;

const StyledListItemIcon = styled(ListItemIcon)`
  min-width: 36px;
`;
