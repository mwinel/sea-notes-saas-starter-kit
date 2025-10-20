import { HTTP_STATUS } from 'lib/api/http';
import { NextRequest, NextResponse } from 'next/server';
import { createDatabaseService } from 'services/database/databaseFactory';

/**
 * Fetches all notes for the authenticated user.
 * @param request - The request object with pagination
 * @param user - The user object
 * @returns A NextResponse with properly typed note data
 */
export const getAllNotes = async (
  request: NextRequest,
  user: { id: string; role: string }
): Promise<NextResponse> => {
  try {
    const userId = user.id;
    const dbClient = await createDatabaseService(); // Parse pagination params
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);
    const searchParam = searchParams.get('search')?.trim();
    const search = searchParam && searchParam.length > 0 ? searchParam : undefined;
    const sortBy = searchParams.get('sortBy') || 'position:asc';
    const categoriesParam = searchParams.get('categories');
    const categories = categoriesParam ? categoriesParam.split(',').filter(Boolean) : undefined;
    const statusesParam = searchParams.get('statuses');
    const statuses = statusesParam ? statusesParam.split(',').filter(Boolean) : undefined;
    const isFavoriteParam = searchParams.get('isFavorite');
    const isFavorite = isFavoriteParam === 'true' ? true : undefined;

    // Parse sortBy parameter (format: "column:direction")
    const [sortField, sortDirection] = sortBy.split(':');
    const direction = sortDirection === 'asc' ? 'asc' : 'desc';

    // Build findMany parameters conditionally
    const skip = page === 1 ? 0 : (page - 1) * pageSize;

    // Define valid sort fields
    const validSortFields = [
      'title',
      'category',
      'status',
      'createdAt',
      'updatedAt',
      'position',
    ] as const;
    const field = validSortFields.includes(sortField as any) ? sortField : 'position';

    const findManyParams: {
      userId: string;
      skip: number;
      take: number;
      search?: string;
      categories?: string[];
      statuses?: string[];
      isFavorite?: boolean;
      orderBy: {
        createdAt?: 'desc' | 'asc';
        updatedAt?: 'desc' | 'asc';
        title?: 'desc' | 'asc';
        category?: 'desc' | 'asc';
        status?: 'desc' | 'asc';
        position?: 'desc' | 'asc';
      };
    } = {
      userId,
      skip,
      take: pageSize,
      orderBy: { [field]: direction } as any,
    };

    // Only include search if it's defined
    if (search !== undefined) {
      findManyParams.search = search;
    }

    // Only include categories if it's defined
    if (categories !== undefined) {
      findManyParams.categories = categories;
    }

    // Only include statuses if it's defined
    if (statuses !== undefined) {
      findManyParams.statuses = statuses;
    }

    // Only include isFavorite if it's defined
    if (isFavorite !== undefined) {
      findManyParams.isFavorite = isFavorite;
    }

    // Get all notes for the user
    const [notes, total] = await Promise.all([
      dbClient.note.findMany(findManyParams),
      dbClient.note.count(userId, search, categories, statuses, isFavorite),
    ]);

    // Return both notes and total count
    return NextResponse.json({ notes, total }, { status: HTTP_STATUS.OK });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch notes' },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
};
