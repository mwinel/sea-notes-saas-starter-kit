import { getFileNameFromUrl } from '@/helpers/file-name';
import { createDatabaseService } from 'services/database/databaseFactory';
import { createStorageService } from 'services/storage/storageFactory';
import { v4 as uuidv4 } from 'uuid';
import { NextRequest, NextResponse } from 'next/server';
import { HTTP_STATUS } from 'lib/api/http';

/**
 * Updates the user's profile information, including name and profile image.
 *
 * @param user - The user object containing id and role.
 */
export const updateUserProfile = async (
  request: NextRequest,
  user: { id: string; role: string }
): Promise<Response> => {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const newName = formData.get('name') as string | null;
    const removeAvatar = formData.get('removeAvatar') as string | null;

    if (newName === '') {
      return NextResponse.json({ error: 'Name invalid' }, { status: HTTP_STATUS.BAD_REQUEST });
    }

    const db = await createDatabaseService();
    const dbUser = await db.user.findById(user.id);

    if (!dbUser) {
      return NextResponse.json({ error: "User doesn't exist" }, { status: HTTP_STATUS.NOT_FOUND });
    }

    // Handle avatar removal
    if (removeAvatar === 'true' || (file && file.size === 0)) {
      const oldImageName = getFileNameFromUrl(dbUser.image);
      if (oldImageName) {
        const storageService = await createStorageService();
        await storageService.deleteFile(user.id, oldImageName);
      }
      dbUser.image = null;
    } else if (file && file.size > 0) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
          { error: 'Only JPG, PNG, or WebP files are allowed' },
          { status: HTTP_STATUS.BAD_REQUEST }
        );
      }

      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        return NextResponse.json(
          { error: 'File size must be 5MB or less' },
          { status: HTTP_STATUS.BAD_REQUEST }
        );
      }

      const extension = file.name.includes('.')
        ? file.name.substring(file.name.lastIndexOf('.'))
        : '';
      const fileName = `${uuidv4()}${extension}`;

      const storageService = await createStorageService();
      const uploadedFileName = await storageService.uploadFile(user.id, fileName, file, {
        ACL: 'public-read',
      });

      const fileUrl = (await storageService.getFileUrl(user.id, uploadedFileName)).split('?')[0];
      const oldImageName = getFileNameFromUrl(dbUser.image);

      if (oldImageName) {
        await storageService.deleteFile(user.id, oldImageName);
      }

      dbUser.image = fileUrl;
    }

    if (newName !== null) {
      // Parse the name into firstName and lastName
      const nameParts = newName.trim().split(' ');
      dbUser.firstName = nameParts[0] || '';
      dbUser.lastName = nameParts.slice(1).join(' ') || '';
    }

    await db.user.update(dbUser.id, dbUser);

    return NextResponse.json(
      {
        firstName: dbUser.firstName,
        lastName: dbUser.lastName,
        image: dbUser.image,
      },
      { status: HTTP_STATUS.OK }
    );
  } catch (error) {
    const errorText =
      'Profile update error. Check your DigitalOcean Spaces and DB settings on the system status page. ';

    console.error(errorText, error instanceof Error ? `${error.name}: ${error.message}` : error);

    // Return the actual error message to the user
    let errorMessage =
      error instanceof Error ? `${error.name}: ${error.message}` : 'Internal server error';
    errorMessage = errorText + '[' + errorMessage + ']';

    return NextResponse.json(
      { error: errorMessage },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
};
