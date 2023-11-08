import NextAuth from "next-auth";
import { authOptions } from "@/server/auth";
secret: process.env.NEXTAUTH_SECRET

export default NextAuth(authOptions);