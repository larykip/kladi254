// /api/auth/session.js
import { NextResponse } from 'next/server';
import connectMongoDB from "@/lib/mongodb";
import User from '@/models/user';
import { parse } from 'cookie';

export async function GET(req) {
  try {
    const cookies = parse(req.headers.get('Cookie') || '');
    const sessionId = cookies.sessionId;

    if (!sessionId) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    await connectMongoDB();
    const user = await User.findById(sessionId);

    if (!user) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    return NextResponse.json({ authenticated: true, user: { username: user.username } }, { status: 200 });

  } catch (error) {
    console.error('Error verifying session:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}