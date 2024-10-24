"use client";

import { Breadcrumbs, Link, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";

export default function PathBreadcrumbs() {
  const pathname = usePathname();
  const pathList = useMemo(() => pathname.split("/").filter((i, index) => index > 0), [pathname]);

  const getPath = useCallback(
    (indexIn: number) => "/" + pathList.filter((_i, index) => index < indexIn).join("/"),
    [pathList],
  );

  return (
    <Breadcrumbs aria-label="breadcrumb" className="p-3 pb-0 border-b-2 border-solid border-slate-100">
      {!pathList.filter((i) => i !== "").length && (
        <div>
          <Typography sx={{ color: "text.primary" }}>Welcome</Typography>
        </div>
      )}
      {pathList.map((path, i) =>
        pathList.length - 1 === i ? (
          <Typography key={`path-${path}`} sx={{ color: "text.primary" }}>
            {path}
          </Typography>
        ) : (
          <Link color="inherit" href={`${getPath(i + 1)}`} key={`path-${path}`} underline="hover">
            {path}
          </Link>
        ),
      )}
    </Breadcrumbs>
  );
}
