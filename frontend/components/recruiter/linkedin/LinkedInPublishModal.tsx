"use client";

import { useState } from "react";
import { X, ImagePlus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface LinkedInPublishModalProps {
  isOpen: boolean;
  isPosting: boolean;
  onClose: () => void;
  onConfirm: (images: File[]) => void;
}

export default function LinkedInPublishModal({
  isOpen,
  isPosting,
  onClose,
  onConfirm,
}: LinkedInPublishModalProps) {
  const [images, setImages] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setImages((prev) => [...prev, ...Array.from(files)]);
    e.target.value = "";
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClose = () => {
    if (isPosting) return;
    setImages([]);
    onClose();
  };

  const handleConfirm = () => {
    onConfirm(images);
    setImages([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-md border border-white/10 bg-[#0a0a0a] text-white shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Post to LinkedIn?
          </DialogTitle>

          <p className="mt-2 text-sm leading-6 text-white/60">
            Optionally attach images. This will publish the draft directly to
            your connected LinkedIn account.
          </p>
        </DialogHeader>

        <div className="space-y-4">
          <label className="flex items-center justify-center gap-2 border border-dashed border-white/15 rounded-lg py-6 cursor-pointer hover:border-white/30 transition-colors text-sm text-on-surface-variant">
            <ImagePlus className="h-4 w-4" />
            Add images
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
              disabled={isPosting}
            />
          </label>

          {images.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {images.map((image, index) => (
                <div
                  key={`${image.name}-${index}`}
                  className="relative aspect-square rounded-lg overflow-hidden border border-white/10"
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt={image.name}
                    className="w-full h-full object-cover"
                  />

                  <button
                    onClick={() => removeImage(index)}
                    disabled={isPosting}
                    className="absolute top-1 right-1 bg-black/70 rounded-full p-1 hover:bg-black transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <p className="text-xs leading-5 text-amber-500/80 bg-amber-500/5 border border-amber-500/10 rounded-lg px-3 py-2">
            Once published, this post will go live on your connected LinkedIn
            account and the draft will be permanently deleted.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6">
          <button
            onClick={handleClose}
            disabled={isPosting}
            className="text-sm border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors px-4 py-2 rounded-lg disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirm}
            disabled={isPosting}
            className="text-sm font-semibold bg-primary text-on-primary hover:bg-primary/90 disabled:opacity-50 transition-colors px-4 py-2 rounded-lg"
          >
            {isPosting
              ? "Posting..."
              : images.length > 0
              ? `Post with ${images.length} image${images.length > 1 ? "s" : ""}`
              : "Post"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}