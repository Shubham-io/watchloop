import axios from "axios";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@watchloop/components/ui/alert-dialog";

import type { ChannelVideo } from "../../types/dashboard.types";
import { useDeleteVideo } from "../../hooks/useDeleteVideo";

interface DeleteVideoDialogProps {
  video: ChannelVideo | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DeleteVideoDialog = ({
  video,
  open,
  onOpenChange,
}: DeleteVideoDialogProps) => {
  const { mutate, isPending } = useDeleteVideo();

  if (!video) return null;

  const handleDelete = () => {
    mutate(video._id, {
      onSuccess: () => {
        toast.success(`"${video.title}" deleted successfully.`);

        onOpenChange(false);
      },

      onError: (error) => {
        if (axios.isAxiosError(error)) {
          toast.error(
            error.response?.data?.message ?? "Failed to delete video.",
          );

          return;
        }

        toast.error("Something went wrong.");
      },
    });
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (isPending) return;

        onOpenChange(nextOpen);
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Video</AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-semibold text-foreground">
              "{video.title}"
            </span>
            ?
            <br />
            <br />
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>

          <AlertDialogAction
            disabled={isPending}
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
