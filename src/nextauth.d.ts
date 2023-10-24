import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface User {
        accessToken?: JWT
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
    }
    interface Session extends DefaultSession {
        user?: User;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: string;
    }
}