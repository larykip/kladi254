import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
const bcrypt = require("bcryptjs");


export async function POST(req) {
    try{
        //get the username, email, password and confirmPassword from the request body/form
        const { username, email, password, confirmPassword } = await req.json();

        //check if the password and confirmPassword match
        if (password !== confirmPassword) {
            return NextResponse.json(
                { message: 'Passwords do not match' },
                { status: 400 }
            );
        }

        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //connect to the database and create a new user
        await connectMongoDB();
        await User.create({ username, email, password: hashedPassword, isAdmin: false});

        return NextResponse.json(
            { message: 'User created successfully' },
            { status: 201 }
        );

    }catch(error){
        console.error('Error in registration:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}