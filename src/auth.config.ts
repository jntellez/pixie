import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Al iniciar sesión por primera vez, guarda los datos iniciales
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }

      // Cuando llamas a update({ name: "nuevo" }) desde el client
      if (trigger === "update" && session.name) {
        token.name = session.name;
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.name = token.name as string;
      session.user.email = token.email as string;
      return session;
    },
  },
} satisfies NextAuthConfig;
