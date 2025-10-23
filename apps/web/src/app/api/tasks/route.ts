import { NextResponse, NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { connectMongo } from '@/lib/mongodb';
import Task from '@/models/Task';

// If you export authOptions from your NextAuth route or a lib file:
import { authOptions } from '@/lib/authOptions'; // <-- adjust path to where you export it
// Or: import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(req: NextRequest) {
  await connectMongo();

  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const tasks = await Task.find({ userEmail: email }).sort({ createdAt: -1 });
  return NextResponse.json(tasks);
}

export async function POST(req: NextRequest) {
  await connectMongo();

  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { title, description, dueDate } = await req.json();

    if (!title || !description || !dueDate) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const task = await Task.create({
      title,
      description,
      dueDate,
      userEmail: email, // tie the task to the logged-in user
    });

    return NextResponse.json(task, { status: 201 });
  } catch (e) {
    console.error('Error creating task:', e);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}