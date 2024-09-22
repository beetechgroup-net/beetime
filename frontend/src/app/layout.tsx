'use client';

import {SessionProvider, signIn, useSession} from 'next-auth/react';
import {ReactNode} from 'react';
import {CssBaseline, Paper, Stack, ThemeProvider} from "@mui/material";
import defaultTheme from "@/app/themes/DefaultTheme";
import TopBar from "@/app/layout/TopBar";
import SideBar from "@/app/layout/side-bar/SideBar";
import {SnackbarProvider} from 'notistack';


export function Content({children}: { children: ReactNode }) {
  const {status} = useSession()

  if (status === "unauthenticated") {
    void signIn("keycloak");
  } else {
    return (
        <ThemeProvider theme={defaultTheme}>
          <CssBaseline/>
          <SnackbarProvider maxSnack={5} autoHideDuration={3000}>
            <Stack direction="row" height={"100vh"} maxHeight={"100vh"} width={"100vw"}
                   maxWidth={"100vw"}>
              <SideBar/>
              <Stack width={"100%"} height={"100%"} maxHeight={"100%"} maxWidth={"100%"}>
                <TopBar/>
                <Stack
                    padding={10}
                    alignItems={"center"}
                    height={"100%"}
                >
                  <Paper
                      elevation={5}
                      variant="outlined"
                  >
                    <Stack
                        padding={2}
                        justifyContent={"center"}
                        alignItems={"center"}
                        spacing={5}
                    >
                      {children}
                    </Stack>
                  </Paper>
                </Stack>
              </Stack>
            </Stack>
          </SnackbarProvider>
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
