import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authHandler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                try {
                    return null
                } catch (error) {
                    throw new Error("error");

                }
            }
        })
    ],
    pages: {
        signIn: "/login",
    }
})

export { authHandler as GET, authHandler as POST }