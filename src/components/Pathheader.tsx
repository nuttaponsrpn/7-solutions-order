"use client";

import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { IconButton } from "@mui/material";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function PathHeader({ onClick }: { onClick: () => void }) {
  const pathname = usePathname();
  const pathList = useMemo(
    () =>
      pathname.split("/").filter((i, index) => {
        const startPoint = pathname.split("/").length === 2 ? 0 : 1;
        return index > startPoint;
      }),
    [pathname],
  );

  return (
    <header className={`p-4 text-xl bg-[#f5f6fa] boder-solid border-b-[1px] border-[#DEDEDE] flex items-center`}>
      <div>
        {pathList.join(" - ")}
        {!pathList.filter((i) => i !== "").length && "HOME"}
      </div>

      <IconButton className="!ml-auto block md:!hidden" onClick={() => onClick()}>
        <MenuRoundedIcon />
      </IconButton>
    </header>
  );
}
