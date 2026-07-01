import type { User } from "@watchloop/types";
import { Camera } from "lucide-react";
import { useRef } from "react";
import { toast } from "react-hot-toast";
import { MAX_AVATAR_SIZE } from "@watchloop/constants/limits";

import { useUpdateAvatar } from "../hooks/useUpdateAvatar";

interface AvatarUploaderProps {
  user: User;
}

export const AvatarUploader = ({ user }: AvatarUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate, isPending } = useUpdateAvatar();

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }

    if (file.size > MAX_AVATAR_SIZE) {
      toast.error("Image must be smaller than 5 MB.");
      return;
    }

    mutate(file);
    event.target.value = "";
  };
  return (
    <div className="relative h-24 w-24 sm:h-32 sm:w-32">
      <img
        src={user.avatar}
        alt={user.fullname}
        className="h-full w-full rounded-full border-4 border-background object-cover"
      />

      <button
        type="button"
        disabled={isPending}
        onClick={() => inputRef.current?.click()}
        className="
    absolute inset-0
    flex flex-col items-center justify-center
    rounded-full
    bg-black/50
    text-white
    opacity-0
    transition-opacity
    hover:opacity-100
    disabled:cursor-not-allowed
    disabled:opacity-100
  "
      >
        <Camera className="sm:mb-1 h-5 w-5" />

        <span className="hidden text-xs font-medium sm:block">
          {isPending ? "Uploading..." : "Change"}
        </span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleAvatarChange}
      />
    </div>
  );
};
