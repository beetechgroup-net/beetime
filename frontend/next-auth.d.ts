// src/types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken: string | unknown;
  }

  interface JWT {
    accessToken: string | unknown;
  }
}
