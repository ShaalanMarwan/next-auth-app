import prisma from "@/helpers/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const posts = await prisma.post.findMany();
    return NextResponse.json({ posts }, { status: 200 });
  } catch (error: Error | any) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Something went wrong while trying to load the posts",
        result: error,
      },
      { status: 500 }
    );
  }
}
