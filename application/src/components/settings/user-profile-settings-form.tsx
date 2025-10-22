'use client';

import { useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import {
  FieldGroup,
  FieldSet,
  FieldLegend,
  FieldDescription,
  Field,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { IconX } from '@tabler/icons-react';
import { CropImageDialog } from '@/components/shared/crop-image-dialog';

export function UserProfileSettingsForm() {
  const { data: session, update } = useSession();
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showCropDialog, setShowCropDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const user = session?.user;
  const currentImage = previewUrl || user?.image;
  const displayName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.email || 'User';

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please select a JPG, PNG, or WebP image file');
      return;
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error('File size must be 5MB or less');
      return;
    }

    // Store the selected file and show crop dialog
    setSelectedFile(file);
    setShowCropDialog(true);
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleCropComplete = async (croppedImageBlob: Blob | null) => {
    if (!croppedImageBlob) {
      setShowCropDialog(false);
      setSelectedFile(null);
      return;
    }

    // Create a new File from the cropped blob
    const croppedFile = new File([croppedImageBlob], selectedFile?.name || 'cropped-image.jpg', {
      type: croppedImageBlob.type,
    });

    // Create preview URL from cropped image
    const url = URL.createObjectURL(croppedImageBlob);
    setPreviewUrl(url);

    // Store the cropped file for upload
    setSelectedFile(croppedFile);
    setShowCropDialog(false);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file to upload');
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('/api/profile', {
        method: 'PATCH',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Upload failed');
      }

      const result = await response.json();

      // Update the session with the new image
      await update({
        user: {
          ...user,
          image: result.image,
          firstName: result.firstName,
          lastName: result.lastName,
        },
      });

      // Clear preview URL and selected file since we now have the real URL
      setPreviewUrl(null);
      setSelectedFile(null);

      toast.success('Profile picture updated successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to upload image');
      setPreviewUrl(null); // Clear preview on error
      setSelectedFile(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveAvatar = async () => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('removeAvatar', 'true');

      const response = await fetch('/api/profile', {
        method: 'PATCH',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Removal failed');
      }

      const result = await response.json();

      // Update the session
      await update({
        user: {
          ...user,
          image: result.image,
          firstName: result.firstName,
          lastName: result.lastName,
        },
      });

      setPreviewUrl(null);
      setSelectedFile(null);
      toast.success('Profile picture removed successfully!');
    } catch (error) {
      console.error('Remove error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to remove image');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <FieldSet>
      <FieldLegend>Profile</FieldLegend>
      <FieldDescription>
        Manage your personal information and account details. Update your first name, last name,
        email address, and profile picture to personalize your experience.
      </FieldDescription>
      <form data-testid="">
        <FieldGroup>
          {/* Avatar Upload Section */}
          <Field>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-18 w-18 cursor-pointer" onClick={handleAvatarClick}>
                  <AvatarImage
                    src={currentImage || undefined}
                    alt={displayName}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-2xl">
                    {displayName
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {currentImage && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute -top-1 -right-1 h-6 w-6 rounded-full p-0 shadow-md hover:shadow-lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveAvatar();
                    }}
                    disabled={isUploading}
                  >
                    <IconX className="h-3 w-3" />
                  </Button>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAvatarClick}
                    disabled={isUploading}
                  >
                    {currentImage ? 'Change Picture' : 'Upload Picture'}
                  </Button>
                </div>
                {previewUrl && (
                  <div className="mt-2 flex gap-2">
                    <Button type="button" size="sm" onClick={handleUpload} disabled={isUploading}>
                      {isUploading ? 'Uploading...' : 'Save Picture'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setPreviewUrl(null);
                        setSelectedFile(null);
                      }}
                      disabled={isUploading}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
                <p className="text-xs text-muted-foreground">Webp, JPG or PNG, max 5MB</p>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/jpg,image/webp"
              onChange={handleFileSelect}
              className="hidden"
            />
          </Field>

          <div className="grid grid-cols-2 gap-2">
            <Field>
              <FieldLabel htmlFor="firstName">First name</FieldLabel>
              <Input
                id="firstName"
                placeholder="John"
                defaultValue={user?.firstName || ''}
                // {...register('firstName')}
                data-testid="firstname-input"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="lastName">Last name</FieldLabel>
              <Input
                id="lastName"
                placeholder="Doe"
                defaultValue={user?.lastName || ''}
                // {...register('lastName')}
                data-testid="lastname-input"
              />
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor="email">Email address</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              defaultValue={user?.email || ''}
              disabled
              data-testid="user-profile-email-input"
            />
          </Field>
          <div className="flex justify-start">
            <Button type="submit">Update Profile</Button>
          </div>
        </FieldGroup>
      </form>

      {/* Crop Image Dialog */}
      <CropImageDialog
        image={selectedFile}
        open={showCropDialog}
        onOpenChange={setShowCropDialog}
        onCrop={handleCropComplete}
      />
    </FieldSet>
  );
}
