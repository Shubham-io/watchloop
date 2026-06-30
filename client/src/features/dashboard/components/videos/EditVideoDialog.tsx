import { useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@watchloop/components/ui/dialog";
import { Button } from "@watchloop/components/ui/button";
import { Input } from "@watchloop/components/ui/input";
import { Label } from "@watchloop/components/ui/label";
import { Textarea } from "@watchloop/components/ui/textarea";

import ThumbnailUploader from "@watchloop/features/video/components/ThumbnailUploader";

import type { ChannelVideo } from "../../types/dashboard.types";
import {
  editVideoSchema,
  type EditVideoFormValues,
} from "../../schemas/edit-video.schema";
import { buildUpdateVideoFormData } from "../../utils/buildUpdateVideoFormData";
import { useUpdateVideo } from "../../hooks/useUpdateVideo";

interface EditVideoDialogProps {
  video: ChannelVideo | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EditVideoDialog = ({
  video,
  open,
  onOpenChange,
}: EditVideoDialogProps) => {
  const { mutateAsync, isPending } = useUpdateVideo();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<EditVideoFormValues>({
    resolver: zodResolver(editVideoSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const thumbnail = watch("thumbnail");

  useEffect(() => {
    if (!video) return;

    reset({
      title: video.title,
      description: video.description,
      thumbnail: undefined,
    });
  }, [video, reset]);

  if (!video) return null;

  const onSubmit = async (values: EditVideoFormValues) => {
    try {
      const formData = buildUpdateVideoFormData(values);

      await mutateAsync({
        videoId: video._id,
        formData,
      });

      toast.success(`"${video.title}" updated successfully.`);

      reset();

      onOpenChange(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Failed to update video.");

        return;
      }

      toast.error("Something went wrong.");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (isPending) return;
        onOpenChange(nextOpen);
      }}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Video</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>

            <Input id="title" disabled={isPending} {...register("title")} />

            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>

            <Textarea
              id="description"
              rows={6}
              disabled={isPending}
              {...register("description")}
            />

            {errors.description && (
              <p className="text-sm text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Thumbnail</Label>

            <ThumbnailUploader
              value={thumbnail}
              initialPreview={video.thumbnail.url}
              disabled={isPending}
              onChange={(file) =>
                setValue("thumbnail", file, {
                  shouldValidate: true,
                })
              }
            />

            {errors.thumbnail && (
              <p className="text-sm text-destructive">
                {errors.thumbnail.message}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
