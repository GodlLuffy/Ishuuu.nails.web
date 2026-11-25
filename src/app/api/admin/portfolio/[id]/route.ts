import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface Props {
  params: Promise<{ id: string }>;
}

export async function DELETE(req: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    await prisma.portfolioItem.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete portfolio item' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    const body = await req.json();

    const updated = await prisma.portfolioItem.update({
      where: { id },
      data: body,
    });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update portfolio item' }, { status: 500 });
  }
}
