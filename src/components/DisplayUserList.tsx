"use client";

import { User } from "@/types/UserResponse.type";
import { ClickAwayListener, ListItem, ListItemButton, ListItemIcon, ListItemText, Popover } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { MouseEvent, useState } from "react";

export default function DisplayUserList({ user, onClick }: { user: User; onClick: (name: string) => void }) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  return (
    <>
      <ClickAwayListener onClickAway={handlePopoverClose}>
        <ListItemButton className="w-full text-nowrap !px-3" onClick={handlePopoverOpen}>
          <ListItem className="!p-0">
            <ListItemText>{`${user.firstName} ${user.lastName}`}</ListItemText>
          </ListItem>

          <ListItemIcon
            aria-label="search-icon"
            className="z-30"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClick(`${user.firstName} ${user.lastName}`);
            }}
          >
            <SearchIcon className="ml-auto" />
          </ListItemIcon>
        </ListItemButton>
      </ClickAwayListener>

      <Popover
        anchorEl={anchorEl}
        className="w-full h-full"
        key={user.id}
        open={open}
        sx={{ pointerEvents: "visible" }}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        onClose={handlePopoverClose}
      >
        <div className="p-2">
          <div>
            <pre className="user-detail">{JSON.stringify(user, null, 2)}</pre>
          </div>
        </div>
      </Popover>
    </>
  );
}
