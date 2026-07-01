import { useRef, type ChangeEvent } from "react";
import { Camera } from "lucide-react";
import { toast } from "react-hot-toast";

import type { User } from "@watchloop/types";

import { useUpdateCover } from "../hooks/useUpdateCover";
import { MAX_COVER_SIZE } from "@watchloop/constants/limits";

interface CoverUploaderProps {
  user: User;
}

export const CoverUploader = ({ user }: CoverUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate, isPending } = useUpdateCover();

  const handleCoverChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }

    if (file.size > MAX_COVER_SIZE) {
      toast.error("Image must be smaller than 5 MB.");
      return;
    }

    mutate(file);

    event.target.value = "";
  };

  return (
    <div className="relative h-40 sm:h-56 w-full overflow-hidden bg-muted">
      {user.coverImage ? (
        <img
          src={user.coverImage}
          alt={`${user.fullname} cover`}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full items-center justify-center">
          <span className="text-sm text-muted-foreground">No cover image</span>
        </div>
      )}

      <button
        type="button"
        disabled={isPending}
        onClick={() => inputRef.current?.click()}
        className="absolute bottom-4 right-4 flex items-center gap-2 rounded-md bg-black/60 px-3 py-2 text-sm text-white transition-colors hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-70"
      >
        <Camera className="h-4 w-4" />
        <span className="hidden sm:inline">
          {isPending ? "Uploading..." : "Change Cover"}
        </span>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleCoverChange}
      />
    </div>
  );
};
