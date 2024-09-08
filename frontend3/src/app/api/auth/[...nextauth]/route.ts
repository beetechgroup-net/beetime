import NextAuth from 'next-auth';
import KeycloakProvider from "next-auth/providers/keycloak";
import * as https from "https";

const handler = NextAuth({
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
      issuer: process.env.KEYCLOAK_ISSUER!,
      httpOptions: {
        agent: new https.Agent({
          rejectUnauthorized: false, // Disables SSL verification
        }),
      },
    }),
  ],
  callbacks: {

    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },

    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      return session;
    },

    async redirect({ url, baseUrl }) {
      return `${baseUrl}/`;
    },
  },
});

export { handler as GET, handler as POST };
