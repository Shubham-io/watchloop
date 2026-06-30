import { toast } from "sonner";
import axios from "axios";

import { Switch } from "@watchloop/components/ui/switch";

import { useTogglePublishStatus } from "../../hooks/useTogglePublishStatus";

interface PublishSwitchProps {
  videoId: string;
  isPublished: boolean;
}

export const PublishSwitch = ({ videoId, isPublished }: PublishSwitchProps) => {
  const { mutate, isPending } = useTogglePublishStatus();

  const handleCheckedChange = (checked: boolean) => {
    mutate(
      {
        videoId,
        isPublished: checked,
      },
      {
        onSuccess: () => {
          toast.success(
            checked ? "Video published." : "Video moved to private.",
          );
        },

        onError: (error) => {
          if (axios.isAxiosError(error)) {
            toast.error(
              error.response?.data?.message ?? "Failed to update video status.",
            );

            return;
          }

          toast.error("Something went wrong.");
        },
      },
    );
  };

  return (
    <Switch
      checked={isPublished}
      disabled={isPending}
      onCheckedChange={handleCheckedChange}
    />
  );
};
