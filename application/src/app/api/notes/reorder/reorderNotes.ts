import { HTTP_STATUS } from 'lib/api/http';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from 'lib/prisma';

interface ReorderItem {
  id: string;
  position: number;
}

/**
 * Handles the reordering of notes.
 * @param request - The Next.js request object containing the reorder data.
 * @param user - The user object containing the user's ID and role.
 * @returns A NextResponse object confirming the reorder or an error message.
 */
export const reorderNotes = async (
  request: NextRequest,
  user: { id: string; role: string }
): Promise<NextResponse> => {
  try {
    const userId = user.id;
    const { items } = (await request.json()) as { items: ReorderItem[] };

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Items array is required and must not be empty' },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }

    // Validate that all items have id and position
    const invalidItems = items.filter(
      (item) => typeof item.id !== 'string' || typeof item.position !== 'number'
    );
    if (invalidItems.length > 0) {
      return NextResponse.json(
        { error: 'All items must have valid id (string) and position (number)' },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }

    const noteIds = items.map((item) => item.id);

    // Batch verify ownership in a single query
    const notes = await prisma.note.findMany({
      where: {
        id: { in: noteIds },
        userId,
      },
      select: { id: true },
    });

    // Ensure all notes exist and belong to the user
    if (notes.length !== noteIds.length) {
      return NextResponse.json(
        { error: 'One or more notes not found or unauthorized' },
        { status: HTTP_STATUS.FORBIDDEN }
      );
    }

    // Batch update all note positions in a transaction
    await prisma.$transaction(
      items.map((item) =>
        prisma.note.update({
          where: { id: item.id },
          data: { position: item.position },
        })
      )
    );

    return NextResponse.json(
      { success: true, updatedCount: items.length },
      { status: HTTP_STATUS.OK }
    );
  } catch (error) {
    console.error('Error reordering notes:', error);
    return NextResponse.json(
      { error: 'Failed to reorder notes' },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
};
