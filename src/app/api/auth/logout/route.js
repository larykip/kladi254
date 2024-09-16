// /api/auth/logout.js
import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST() {
  try {
    const cookie = serialize('sessionId', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: -1,
      path: '/',
    });

    const response = NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });
    response.headers.set('Set-Cookie', cookie);
    return response;
  } catch (error) {
    console.error('Error logging out:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}