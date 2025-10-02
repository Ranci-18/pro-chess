import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getAuthCollection } from "@/app/lib/mongodb";

export async function POST(req: Request) {
    const { username, email, password } = await req.json();
    const users = await getAuthCollection();

    const existingUser = await users.findOne({ $or: [{ email }, { username }]});
    if (existingUser) return NextResponse.json({ error: "user already exists"}, { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await users.insertOne({
        username,
        email,
        password: hashedPassword,
    });

    return NextResponse.json({
        user: { id: result.insertedId, username, email },
    })
}