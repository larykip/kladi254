import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(req) {
    try{
        //create a connection to the database
        await connectMongoDB();

        //fetch all users from the database
        const users = await User.find({})
        console.log('Fetched users:', users);
        return NextResponse.json(users);
    }catch(error){
    return NextResponse.json(
        { error: 'Error fetching users' },
        { status: 500 }
    );
    }
}