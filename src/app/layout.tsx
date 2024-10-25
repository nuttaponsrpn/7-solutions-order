"use client";

import LeftNavigation from "@/components/LeftNavigation";
import PathBreadcrumbs from "@/components/PathBreadcrumbs";
import PathHeader from "@/components/Pathheader";
import { Typography } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import "./globals.css";
import { useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [openNav, setOpenNav] = useState(false);

  return (
    <html lang="en">
      <body className={`antialiased overflow-hidden`}>
        <AppRouterCacheProvider>
          <div className="flex h-screen overflow-hidden ">
            {/* Left Navigation */}
            <aside
              className={`${
                openNav
                  ? "flex flex-col flex-1"
                  : `z-20 w-full ease-in-out opacity-0 max-w-0 min-w-0 md:max-w-72 md:min-w-56
                    md:opacity-100 border-r-[1px] boder-solid border-[#DEDEDE] bg-[#f5f6fa] flex flex-col`
              }
              `}
            >
              <LeftNavigation onClickNav={() => setOpenNav(false)} />
              <div className="p-3 border-t-2 border-solid">
                <Typography color="text.secondary" variant="body2">
                  &#169; Made by: nuttapon.srpn@gmail.com
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  Git hub: <br />
                  <a
                    className="text-blue-600"
                    href="https://github.com/nuttaponsrpn"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    https://github.com/nuttaponsrpn
                  </a>
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  Phone no: 0820826342
                </Typography>
              </div>
            </aside>

            <main className={`w-full ${openNav ? "w-0 hidden" : "w-full flex-1"}`}>
              <PathHeader onClick={() => setOpenNav(true)} />
              <PathBreadcrumbs />

              <section
                className={`
                  p-4 h-[calc(100vh-112px)] md:h-[calc(100vh-115px)] overflow-auto w-screen md:w-[calc(100vw-225px)]
                `}
              >
                {children}
              </section>
            </main>
          </div>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
