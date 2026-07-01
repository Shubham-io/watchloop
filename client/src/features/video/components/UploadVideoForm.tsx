import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@watchloop/components/ui/button";
import { Input } from "@watchloop/components/ui/input";
import { Label } from "@watchloop/components/ui/label";
import { Textarea } from "@watchloop/components/ui/textarea";

import {
  uploadVideoSchema,
  type UploadVideoFormValues,
} from "../schemas/upload-video.schema";
import { useUploadVideo } from "../hooks/useUploadVideo";
import ThumbnailUploader from "./ThumbnailUploader";
import VideoUploader from "./VideoUploader";
import UploadProgress from "./UploadProgress";

import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UploadVideoForm = () => {
  const navigate = useNavigate();
  const { mutateAsync, isPending, upload } = useUploadVideo();

  const progress = {
    percentage: upload?.percentage ?? 0,
    loaded: upload?.uploadedMB ?? 0,
    total: upload?.totalMB ?? 0,
  };

  const isUploading = upload?.isUploading ?? false;
  const isFinalizing = upload?.isFinalizing ?? false;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<UploadVideoFormValues>({
    resolver: zodResolver(uploadVideoSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const videoFile = watch("videoFile");
  const thumbnail = watch("thumbnail");

  const onSubmit = async (values: UploadVideoFormValues) => {
    try {
      await mutateAsync({
        values,
      });

      toast.success("Video uploaded successfully!");

      reset();
      navigate(`/`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Failed to upload video.");
      } else {
        toast.error("Something went wrong.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Video Title</Label>

        <Input
          id="title"
          placeholder="Enter video title"
          disabled={isPending}
          {...register("title")}
        />

        {errors.title && (
          <p className="text-sm text-destructive">{errors.title.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>

        <Textarea
          id="description"
          rows={6}
          disabled={isPending}
          placeholder="Tell viewers about your video"
          {...register("description")}
        />

        {errors.description && (
          <p className="text-sm text-destructive">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Video */}
      <div className="space-y-2">
        <Label>Video File</Label>

        <VideoUploader
          value={videoFile}
          disabled={isPending}
          onChange={(file) =>
            setValue("videoFile", file as File, {
              shouldValidate: true,
            })
          }
        />

        {errors.videoFile && (
          <p className="text-sm text-destructive">{errors.videoFile.message}</p>
        )}
      </div>

      {/* Thumbnail */}
      <div className="space-y-2">
        <Label>Thumbnail</Label>

        <ThumbnailUploader
          value={thumbnail}
          disabled={isPending}
          onChange={(file) =>
            setValue("thumbnail", file as File, {
              shouldValidate: true,
            })
          }
        />

        {errors.thumbnail && (
          <p className="text-sm text-destructive">{errors.thumbnail.message}</p>
        )}
      </div>

      <UploadProgress
        percentage={progress.percentage}
        loaded={progress.loaded}
        total={progress.total}
        isUploading={isUploading}
        isFinalizing={isFinalizing}
      />

      <Button type="submit" className="w-full" disabled={isPending}>
        {isUploading
          ? "Uploading..."
          : isFinalizing
            ? "Publishing..."
            : "Upload Video"}
      </Button>
    </form>
  );
};

export default UploadVideoForm;
