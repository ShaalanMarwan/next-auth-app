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
                    const response = await
                        fetch(`${process.env.NEXTAUTH_URL}/api/login`, {
                            method: "POST",
                            headers: {
                                "Accept": "application/json",

                            },
                            body: JSON.stringify(credentials),

                        })
                    const json: any = response.json();
                    if (response.status == 200) {
                        return json.result;
                    }else{
                        throw (JSON.stringify(json))
                    }
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