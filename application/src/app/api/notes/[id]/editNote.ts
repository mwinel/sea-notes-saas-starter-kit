import { HTTP_STATUS } from 'lib/api/http';
import { NextRequest, NextResponse } from 'next/server';
import { createDatabaseService } from 'services/database/databaseFactory';

/**
 * Handles the editing of a note.
 * @param request - The Next.js request object containing the note data.
 * @param user - The user object containing the user's ID and role.
 * @param params - A promise that resolves to an object containing the note ID.
 * @returns A NextResponse object containing the updated note or an error message.
 */
export const editNote = async (
  request: NextRequest,
  user: { id: string; role: string },
  params: Promise<{ id: string }>
): Promise<NextResponse> => {
  try {
    const { id: noteId } = await params;
    const userId = user.id;
    const { title, content, category, status, isFavorite } = await request.json();
    const dbClient = await createDatabaseService();

    if (!title && !content && !category && !status && isFavorite === undefined) {
      return NextResponse.json(
        {
          error: 'At least one field (title, content, category, status, or isFavorite) is required',
        },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }

    const existingNote = await dbClient.note.findById(noteId);

    if (!existingNote) {
      return NextResponse.json({ error: 'Note not found' }, { status: HTTP_STATUS.NOT_FOUND });
    }

    if (existingNote.userId !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: HTTP_STATUS.FORBIDDEN });
    }

    // Build update object with only provided fields
    const updateData: {
      title?: string;
      content?: string;
      category?: string;
      status?: string;
      isFavorite?: boolean;
    } = {};

    if (title !== undefined) updateData.title = title;
    if (content !== undefined) updateData.content = content;
    if (category !== undefined) updateData.category = category;
    if (status !== undefined) updateData.status = status;
    if (isFavorite !== undefined) updateData.isFavorite = isFavorite;

    const updatedNote = await dbClient.note.update(noteId, updateData);

    return NextResponse.json(updatedNote, { status: HTTP_STATUS.OK });
  } catch (error) {
    console.error('Error updating note:', error);
    return NextResponse.json(
      { error: 'Failed to update note' },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
};
