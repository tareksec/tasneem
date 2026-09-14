import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth/password";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      name: "Staff Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@tasneem.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter both email and password.");
        }

        const email = credentials.email.trim().toLowerCase();
        const fallbackEmails = [
          (process.env.ADMIN_EMAIL || "").toLowerCase(),
          "admin@admin.com",
          "admin@tasneem.com",
        ].filter(Boolean);
        const fallbackPassword = process.env.ADMIN_PASSWORD || "TasneemAdmin2026!Secure";

        // 1. Try querying the Admin table in MySQL
        try {
          const admin = await prisma.admin.findUnique({
            where: { email },
          });

          if (admin) {
            const isValid = await verifyPassword(credentials.password, admin.password);
            if (!isValid) {
              throw new Error("Invalid staff email or password.");
            }

            return {
              id: admin.id,
              email: admin.email,
              name: admin.name || "Tasneem Staff",
              role: admin.role || "Admin",
              image: admin.avatar || "/images/staff-avatar.jpg",
            };
          }
        } catch (dbError: any) {
          console.error("NextAuth authorize DB error:", dbError);
        }

        // 2. Fallback check for initial setup or default admin credentials
        if (fallbackEmails.includes(email) && credentials.password === fallbackPassword) {
          return {
            id: "admin-fallback-1",
            email: email,
            name: process.env.ADMIN_NAME || "Tasneem Super Admin",
            role: "Super Admin",
            image: "/images/staff-avatar.jpg",
          };
        }

        throw new Error("Invalid staff email or password.");
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || "Admin";
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).role = (token.role as string) || "Admin";
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "tasneem-default-local-dev-jwt-secret-key-32chars",
};
