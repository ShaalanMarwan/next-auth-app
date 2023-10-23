import prisma from "@/helpers/prisma";
import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from 'bcrypt';

/**
 * Handler for the POST request.
 * @param {NextRequest} request - The incoming request object.
 * @returns {NextResponse} - The response object.
 */
export async function POST(request: NextRequest) {
    try {
        // Retrieve the email and password from the request body
        const { email, password } = await request.json();

        // Check if both email and password are provided
        if (!email || !password) {
            // Return a 400 Bad Request response with an error message
            return NextResponse.json({ message: "Both fields are required" }, { status: 400 });
        }

        // Create a new user with the provided email and hashed password
        const user = await prisma.user.create({
            data: {
                email: email.toLowerCase(),
                password: await bcrypt.hash(password, 10)
            }
        });
        
        const { password: hashedPassword, ...result } = user;
        
        // Return a 201 Created response with the result
        return NextResponse.json({ result }, { status: 201 });

    }
    catch (e) {
        // Log the error
        console.error(e);
        
        // Return a 500 Internal Server Error response with an error message and the error object
        return NextResponse.json({ message: "Something went wrong while trying to register", result: e }, { status: 500 });
    }
}