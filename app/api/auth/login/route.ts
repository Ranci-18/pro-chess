import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getAuthCollection } from "@/app/lib/mongodb";

const SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
    const { identifier, password } = await req.json();
    const users = await getAuthCollection();

    const user = await users.findOne({ $or: [{ email: identifier }, { username: identifier }] });
    if (!user) return NextResponse.json({ error: "invalid credentials" }, { status: 401 });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return NextResponse.json({ error: "invalid credentials" }, { status: 401 });

    const token = jwt.sign(
        { id: user._id, email: user.email},
        SECRET,
        { expiresIn: "1d" }
    );

    const response = NextResponse.json({
        user: { id: user._id, email: user.email, username: user.username },
    });

    response.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24,
        path: "/",
    })

    return response;
}