// import NextAuth, { DefaultSession } from "next-auth";
// import { JWT } from "next-auth/jwt";
// import Credentials from "next-auth/providers/credentials";

// declare module "next-auth" {
//   interface User {
//     username?: string;
//     role?: string;
//   }

//   interface Session {
//     user: {
//       id?: string;
//       email?: string;
//       username?: string;
//       role?: string;
//     } & DefaultSession["user"];
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT  {
//     id?: string;
//     username?: string;
//     role?: string;
//   }
// }

// // export const { handlers, signIn, signOut, auth } = NextAuth({
// //   secret: process.env.AUTH_SECRET,
// //     providers: [
// //     Credentials({
// //       name: "Credentials",
// //       credentials: {
// //         email: {
// //           label: "Email",
// //           type: "text",
// //           placeholder: "Enter your email",
// //         },
// //         password: {
// //           label: "Password",
// //           type: "password",
// //           placeholder: "Enter your password",
// //         },
// //       },

// //       async authorize(credentials) {
// //         if (!credentials?.email || !credentials?.password) {
// //           return null;
// //         }

// //         const email = credentials.email as string;
// //         const password = credentials.password as string;

// //         //! chiamata /user tramite mail
// //         const resp = await userByEmail(email);

// //         const user = resp.data;
// //         const error = resp.error;

// //         if (error || !user || !user.password) {
// //           return null;
// //         }

// //         const isValid = await bcrypt.compare(password, user.password);

// //         if (!isValid) {
// //           return null;
// //         }

// //         return {
// //           id: user.id,
// //           email: user.email,
// //           username: user.username,
// //           role: user.role,
// //         };
// //       },
// //     }),
// //   ],
// //   session: {
// //     strategy: "jwt",
// //     maxAge: 30 * 24 * 60 * 60, // 30 days
// //   },

// //   callbacks: {
// //     async jwt({ token, user }) {
// //       if (user) {
// //         token.id = user.id;
// //         token.email = user.email;
// //         token.username = user.username;
// //         token.role = user.role;
// //       }
// //       return token;
// //     },
// //     async session({ session, token }) {
// //       if (token) {
// //         session.user.id = token.id ?? "";
// //         session.user.email = token.email ?? "";
// //         session.user.username = token.username;
// //         session.user.role = token.role;
// //       }
// //       return session;
// //     },
// //   },
// //   pages: {
// //     signIn: "/login",
// //     signOut: "/login",
// //     error: "/login",
// //   },
// // });





// export const { handlers, signIn, signOut, auth } = NextAuth({
//   secret: process.env.AUTH_SECRET,
//   providers: [
//     Credentials({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },

//       async authorize(credentials) {
//         if (!credentials?.email) {
//           return null;
//         }

//         const email = credentials.email as string;

//         const resp = await fetch(
//           `${process.env.NEXT_PUBLIC_URL_RENDER}/user/email`,
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ email }),
//           }
//         );

//         const data = await resp.json();

//         if (!resp.ok || !data) {
//           return null;
//         }

//         return {
//           id: data.user.id,
//           email: data.user.email,
//           username: data.user.username,
//           role: data.user.role,
//         };
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//     maxAge: 30 * 24 * 60 * 60, // 30 giorni
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.email = user.email;
//         token.username = user.username;
//         token.role = user.role;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user.id = token.id ?? "";
//         session.user.email = token.email ?? "";
//         session.user.username = token.username;
//         session.user.role = token.role;
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/login",
//     signOut: "/login",
//     error: "/login",
//   },
// });


import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";


import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";

declare module "next-auth" {
  interface User {
    username?: string;
    role?: string;
  }

  interface Session {
    user: {
      id?: string;
      email?: string;
      username?: string;
      role?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    username?: string;
    role?: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [

    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email) {
          return null;
        }

        const email = credentials.email as string;

        const resp = await fetch(
          `${process.env.NEXT_PUBLIC_URL_RENDER}/user/email`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          }
        );

        const data = await resp.json();

        if (!resp.ok || !data) {
          return null;
        }

        return {
          id: data.user.id,
          email: data.user.email,
          username: data.user.username,
          role: data.user.role,
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
   
    // Viene scatenato subito dopo la conferma da Google/GitHub
    async signIn({ user, account }) {
      // Se l'accesso avviene via OAuth (Google o GitHub)
      if (account?.provider === "google" || account?.provider === "github") {
        try {
          // Chiamata al backend per trovare o creare l'utente nel DB Supabase via Prisma
          const resp = await fetch(
            `${process.env.NEXT_PUBLIC_URL_RENDER}/users/oauth-sync`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: user.email,
                name: user.name,
                provider: account.provider,
              }),
            }
          );

          const data = await resp.json();

          if (!resp.ok || !data) {
            return false; // Blocca il login se il backend restituisce errore
          }

          // Arricchiamo l'oggetto user temporaneo con i dati restituiti dal DB
          user.id = data.user.id;
          user.username = data.user.username;
          user.role = data.user.role;

          return true;
        } catch (error) {
          console.error("Errore durante oauth-sync con il backend:", error);
          return false;
        }
      }

      return true; // Per le Credentials il flusso prosegue normalmente
    },

    // ==========================================

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id ?? "";
        session.user.email = token.email ?? "";
        session.user.username = token.username;
        session.user.role = token.role;
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