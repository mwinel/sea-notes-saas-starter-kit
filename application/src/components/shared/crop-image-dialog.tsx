'use client';

import 'cropperjs/dist/cropper.css';

import { useMemo, useRef } from 'react';
import type { ReactCropperElement } from 'react-cropper';
import Cropper from 'react-cropper';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export function CropImageDialog({
  image,
  open,
  onOpenChange,
  onCrop,
}: {
  image: File | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCrop: (croppedImage: Blob | null) => void;
}) {
  const cropperRef = useRef<ReactCropperElement>(null);

  const getCroppedImage = async () => {
    const cropper = cropperRef.current?.cropper;

    const imageBlob = await new Promise<Blob | null>((resolve) => {
      cropper?.getCroppedCanvas().toBlob(resolve);
    });

    return imageBlob;
  };

  const imageSrc = useMemo(() => image && URL.createObjectURL(image), [image]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Crop Image</DialogTitle>
          <DialogDescription className="sr-only">
            Crop the image to the desired size.
          </DialogDescription>
        </DialogHeader>
        <div className="min-h-[400px]">
          {imageSrc && (
            <Cropper
              ref={cropperRef}
              style={{ width: '100%', height: 400 }}
              initialAspectRatio={1}
              preview=".img-preview"
              src={imageSrc}
              viewMode={1}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false}
              guides={false}
            />
          )}
        </div>
        <DialogFooter>
          <Button
            onClick={async () => {
              onCrop(await getCroppedImage());
              onOpenChange(false);
            }}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
