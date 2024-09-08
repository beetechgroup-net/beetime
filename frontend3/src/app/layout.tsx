'use client';

import {SessionProvider, signIn, useSession} from 'next-auth/react';
import {ReactNode} from 'react';
import {Container, CssBaseline, Stack, ThemeProvider} from "@mui/material";
import defaultTheme from "@/app/themes/DefaultTheme";
import TopBar from "@/app/layout/TopBar";
import SideBar from "@/app/layout/side-bar/SideBar";


export function Content({children}: { children: ReactNode }) {
  const {status} = useSession()

  if (status === "unauthenticated") {
    void signIn("keycloak");
  } else {
    return (
        <ThemeProvider theme={defaultTheme}>
          <CssBaseline/>
          <Stack direction="row" height={"100vh"} maxHeight={"100vh"} width={"100vw"}
                 maxWidth={"100vw"}>
            <SideBar/>
            <Stack width={"100%"} height={"100%"} maxHeight={"100%"} maxWidth={"100%"}>
              <TopBar/>
              <Stack padding={6} width={"100%"} height={"100%"} maxHeight={"100%"}
                     maxWidth={"100%"}>
                {children}
              </Stack>
            </Stack>
          </Stack>
        </ThemeProvider>
    )
  }
}

export default function RootLayout({children}: { children: ReactNode }) {
  return (
      <html lang="en">
      <body>
      <SessionProvider>
        <Content>
          {children}
        </Content>
      </SessionProvider>

      </body>
      </html>
  );
}
