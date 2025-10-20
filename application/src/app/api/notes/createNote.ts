import { HTTP_STATUS } from 'lib/api/http';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from 'lib/prisma';
import { generateTimestampTitle } from '../../../services/ai/digitalOceanInferenceService';
import { triggerBackgroundTitleGeneration } from '../../../services/ai/backgroundTitleService';
import { hasAIConfiguredServer } from '../../../settings';

/**
 * Create a new note
 * @param request - The request object
 * @param user - The user object
 * @returns The created note
 */
export const createNote = async (
  request: NextRequest,
  user: { id: string; role: string }
): Promise<NextResponse> => {
  try {
    const userId = user.id;
    const { title, content, category, status } = await request.json();

    if (!content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }

    // Use provided title or generate timestamp title for fast save
    const finalTitle = title || generateTimestampTitle();

    // Create note at position 0 and shift all existing notes down
    const note = await prisma.$transaction(async (tx) => {
      // Increment all existing notes' positions by 1
      await tx.note.updateMany({
        where: { userId },
        data: { position: { increment: 1 } },
      });

      // Create new note at position 0 (top of the list)
      return tx.note.create({
        data: {
          userId,
          title: finalTitle,
          content,
          category,
          status,
          position: 0,
          isFavorite: false,
        },
      });
    });

    // Trigger background title generation if no title provided and AI configured
    if (!title && hasAIConfiguredServer) {
      triggerBackgroundTitleGeneration(note.id, content, userId);
    }

    return NextResponse.json(note, { status: HTTP_STATUS.CREATED });
  } catch (error) {
    console.error('Error creating note:', error);
    return NextResponse.json(
      { error: 'Failed to create note' },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
};
