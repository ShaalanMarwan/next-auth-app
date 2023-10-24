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
            /**
             * Authorizes the user with the given credentials.
             * @param {Object} credentials - The user's login credentials.
             * @param {string} credentials.email - The user's email address.
             * @param {string} credentials.password - The user's password.
             * @returns {Promise<any>} - A promise that resolves to the result of the authorization.
             * @throws {Error} - If there is an error during the authorization process.
             */
            async authorize(credentials) {
                try {
                    const response = await
                        fetch(`${process.env.NEXTAUTH_URL}/api/login`, {
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                email: credentials?.email,
                                password: credentials?.password
                            })
                        })

                    const json = await response.json();

                    if (response.status === 200) {
                        return json.result;
                    }
                    else {
                        throw (JSON.stringify(json));
                    }
                }
                catch (e: Error | any) {
                    throw new Error(e);
                }
            }
        })
    ],
    pages: {
        signIn: "/login",

    },
    callbacks: {

        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.accessToken
                token.email = user.email
            }
            return token
        },
        async session({ session, token, user }) {
            if (token && session.user) {

                session.user.accessToken = token.accessToken
            }
            return session;

        }
    }
})

export { authHandler as GET, authHandler as POST };