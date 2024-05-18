import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";

const handler = NextAuth({
  pages: {
    signIn: "/",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const res = await fetch("http://127.0.0.1:3333/api/v1/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        if (res.status !== 200) return null;
        const user = await res.json();
        if (!user.token) return null;
        cookies().set("access_token", user.token);          
        if (res.ok && user) {
          return user
        }
        return null;
      },
    }),
  ]
});

export { handler as GET, handler as POST };
