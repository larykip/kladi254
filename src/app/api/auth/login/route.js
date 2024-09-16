import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import { serialize } from "cookie";
import { NextResponse } from "next/server";

const bcrypt = require("bcryptjs");

export async function POST(req) {
    try{
        const { username, password } = await req.json();

        await connectMongoDB();

        const user = await User.findOne({ username });

        if (!user || !await bcrypt.compare(password, user.password)) {
            return NextResponse.json(
                { message: 'Invalid credentials!' },
                { status: 401 }
            );
        }

        const cookie = serialize('sessionId', user._id.toString(), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/'
        });

        const response = NextResponse.json(
            { 
                message: 'Login successful',
                isAdmin: user.isAdmin
            },
            { status: 200 }
        );

        response.headers.set('Set-Cookie', cookie);
        return response

    } catch(error){
        console.error('Error logging in:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}