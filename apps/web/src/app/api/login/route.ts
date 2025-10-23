import { NextRequest, NextResponse } from 'next/server';
import { connectMongo } from '../../../lib/mongodb'; // relative: src/app/api/login -> src/lib
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    await connectMongo();

    const user: any = await User.findOne({ email }).lean();
    if (!user?.password) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    return NextResponse.json({
      ok: true,
      user: { id: String(user._id), name: user.name, email: user.email },
    });
  } catch (err) {
    console.error('POST /api/login error:', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true });
}