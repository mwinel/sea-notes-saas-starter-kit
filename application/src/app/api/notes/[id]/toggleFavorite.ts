import { HTTP_STATUS } from 'lib/api/http';
import { NextRequest, NextResponse } from 'next/server';
import { createDatabaseService } from 'services/database/databaseFactory';

/**
 * Toggles the favorite status of a note.
 * @param request - The request object with the note ID in params
 * @param user - The user object
 * @returns A NextResponse with the updated note
 */
export const toggleFavorite = async (
  request: NextRequest,
  user: { id: string; role: string },
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse> => {
  try {
    const { id } = await context.params;
    const userId = user.id;
    const dbClient = await createDatabaseService();

    // Parse request body
    const body = await request.json();
    const { isFavorite } = body;

    if (typeof isFavorite !== 'boolean') {
      return NextResponse.json(
        { error: 'isFavorite must be a boolean' },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }

    // Check if note exists and belongs to user
    const existingNote = await dbClient.note.findById(id);
    if (!existingNote) {
      return NextResponse.json({ error: 'Note not found' }, { status: HTTP_STATUS.NOT_FOUND });
    }

    if (existingNote.userId !== userId) {
      return NextResponse.json(
        { error: 'You do not have permission to modify this note' },
        { status: HTTP_STATUS.FORBIDDEN }
      );
    }

    // Update the note's favorite status
    const updatedNote = await dbClient.note.update(id, { isFavorite });

    return NextResponse.json(updatedNote, { status: HTTP_STATUS.OK });
  } catch (error) {
    console.error('Error toggling favorite:', error);
    return NextResponse.json(
      { error: 'Failed to toggle favorite' },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
};

