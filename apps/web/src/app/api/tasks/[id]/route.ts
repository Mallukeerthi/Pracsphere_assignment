import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/authOptions'; // adjust if your authOptions lives elsewhere
import { connectMongo } from '../../../../lib/mongodb';
import Task from '../../../../models/Task';

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectMongo();

  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const { id } = await params;

  try {
    const body = await request.json();
    const update: Record<string, any> = {};
    if (body.status) update.status = body.status;
    if (body.title) update.title = body.title;
    if (body.description) update.description = body.description;
    if (body.dueDate) update.dueDate = body.dueDate;

    const updated = await Task.findOneAndUpdate(
      { _id: id, userEmail: email },
      { $set: update },
      { new: true }
    );

    if (!updated) return NextResponse.json({ message: 'Not found' }, { status: 404 });
    return NextResponse.json(updated);
  } catch (e) {
    console.error('PATCH /api/tasks/[id] error', e);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectMongo();

  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const { id } = await params;

  try {
    const deleted = await Task.findOneAndDelete({ _id: id, userEmail: email });
    if (!deleted) return NextResponse.json({ message: 'Not found' }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('DELETE /api/tasks/[id] error', e);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}