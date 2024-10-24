import LeftNavigation from "@/components/LeftNavigation";
import PathBreadcrumbs from "@/components/PathBreadcrumbs";
import PathHeader from "@/components/Pathheader";
import { Typography } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased overflow-hidden`}>
        <AppRouterCacheProvider>
          <div className="flex min-h-screen ">
            {/* Left Navigation */}
            <aside
              className={`
                z-20 w-full transition duration-700 ease-in-out opacity-0 max-w-0 min-w-0 md:max-w-72 md:min-w-56
                md:opacity-100 border-r-[1px] boder-solid border-[#DEDEDE] bg-[#f5f6fa] flex flex-col
              `}
            >
              <LeftNavigation />
              <div className="p-3 mt-auto border-t-2 border-solid">
                <Typography color="text.secondary" variant="body2">
                  &#169; Made by: nuttapon.srpn@gmail.com
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  Git hub:
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

            <main className="w-full">
              <PathHeader />
              <PathBreadcrumbs />

              <section className="p-4 h-[calc(100vh-100px)] overflow-auto">{children}</section>
            </main>
          </div>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
