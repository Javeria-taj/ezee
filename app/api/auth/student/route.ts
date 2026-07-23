import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set('ezee_student_session', 'true', {
    path: '/',
    httpOnly: false,
    sameSite: 'lax',
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set('ezee_student_session', '', {
    path: '/',
    expires: new Date(0),
  });
  return response;
}
