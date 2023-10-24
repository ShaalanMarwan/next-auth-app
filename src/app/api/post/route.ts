import { verifyJwt } from "@/helpers/jwt";
import prisma from "@/helpers/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * Retrieves all posts from the database if the user is authorized.
 *
 * @param request The HTTP request object.
 * @returns The response object containing the posts or an error message.
 */
export async function GET(request: NextRequest) {
    try {
        const accessToken = request.headers.get("Authorization");
        const decoded = verifyJwt(accessToken);

        // Check if the user is authorized
        if (!accessToken || !decoded) {
            // Return an error response if the user is not authorized
            return NextResponse.json({ message: "You are not authorized to get this data" }, { status: 401 });
        }

        // Retrieve all posts from the database
        const posts = await prisma.post.findMany();

        // Return the posts in the response
        return NextResponse.json({ posts }, { status: 200 });
    } catch (error: Error | any) {
        // Log the error to the console
        console.error(error);

        // Return an error response with the error message
        return NextResponse.json(
            {
                message: "Something went wrong while trying to load the posts",
                result: error,
            },
            { status: 500 }
        );
    }
}