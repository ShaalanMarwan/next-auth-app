import prisma from "@/helpers/prisma";


import { NextRequest, NextResponse } from "next/server"

import * as bcrypt from "bcrypt"

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json()

        if (!email || !password) return NextResponse.json({
            message: "Email and password are required"
        }, {
            status: 400,
        })
        const user = await prisma.user.create({
            data: {
                email: email.toLowerCase(),
                password: bcrypt.hashSync(password, 10)
            }
        })
        const { password: hashedPassword, ...result } = user;
        return NextResponse.json({ result, }, { status: 201 })
    }

    catch (e) {
        console.error(e)
        return NextResponse.json({
            message: "Something went wrong"
        }, {
            status: 500,
        })

    }
}