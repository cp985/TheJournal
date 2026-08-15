import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";


import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username?: string;
      role?: string;
      provider?: string;
      avatar?: string;
      originalImage?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id?: string;
    username?: string;
    role?: string;
    provider?: string;
    avatar?: string;
    originalImage?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    username?: string;
    role?: string;
    provider?: string;
    avatar?: string;
    originalImage?: string;
  }
}export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [

    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) {  
    return null;
  }

        const email = credentials.email as string;
        const password = credentials.password as string;

        const resp = await fetch(
          `${process.env.NEXT_PUBLIC_URL_RENDER}/users/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email,password }),
          }
        );

        const data = await resp.json();
        console.log("AUTHORIZE RESPONSE:", JSON.stringify(data));

        if (!resp.ok || !data?.data) {
          return null;
        }

        return {
          id: data.data.id,
          email: data.data.email,
          username: data.data.username,
          role: data.data.role,
          avatar: data.data.avatar,
        };


      },
    }),

    // ==========================================
    // [NUOVO] PROVIDER OAUTH (GOOGLE & GITHUB)
    // ==========================================
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 giorni
  },
   

  callbacks: {
    // ==========================================
    // CALLBACK SIGNIN PER OAUTH SYNC
    // ==========================================
    async signIn({ user, account }) {
      if (account?.provider === "google" || account?.provider === "github") {
        try {
          const resp = await fetch(
            `${process.env.NEXT_PUBLIC_URL_RENDER}/users/oauth-sync`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: user.email,
                name: user.name,
                image: user.image, 
                provider: account.provider,
                avatar: user.avatar,
              }),
            }
          );

          const data = await resp.json();

          if (!resp.ok || !data) {
            return false; 
          }

          user.id = data.user.id;
          user.username = data.user.username;
          user.role = data.user.role;
          user.avatar = data.user.avatar; // L'avatar personalizzato nel DB
          user.originalImage = data.user.originalImage || user.image; // Foto Google/GitHub

          return true;
        } catch (error) {
          console.error("Errore durante oauth-sync con il backend:", error);
          return false;
        }
      }

      return true; 
    },

    // ==========================================
    // CALLBACK JWT & SESSION
    // ==========================================
    async jwt({ token, user, account, trigger, session: triggerSession }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
        token.role = user.role;
        token.avatar = user.avatar;
        token.originalImage = user.originalImage;
      }

      if (account) {
        token.provider = account.provider; 
      } else if (user && (user as any).provider) {
        token.provider = (user as any).provider;
      }

      if (trigger === "update" && triggerSession?.user) {
        if (triggerSession.user.username !== undefined) {
          token.username = triggerSession.user.username;
        }
        if (triggerSession.user.avatar !== undefined) {
          token.avatar = triggerSession.user.avatar;
        }
        if (triggerSession.user.image !== undefined) {
          token.avatar = triggerSession.user.image;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id ?? "";
        session.user.email = token.email ?? "";
        session.user.username = token.username;
        session.user.role = token.role;
        session.user.provider = token.provider;
        
        session.user.avatar = token.avatar;
        session.user.originalImage = token.originalImage;
        session.user.image = token.avatar || token.originalImage || null;
      }
      return session;
    },
  },
pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/login",
  },
});