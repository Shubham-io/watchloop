import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { publishVideo } from "../api/video.api";
import type { PublishVideoOptions, UploadProgress } from "../types/video.types";

const INITIAL_PROGRESS: UploadProgress = {
  percentage: 0,
  loaded: 0,
  total: 0,
  progress: 0,
  isUploading: false,
  isFinalizing: false,
};

export const useUploadVideo = () => {
  const queryClient = useQueryClient();

  const [progress, setProgress] = useState<UploadProgress>(INITIAL_PROGRESS);

  const mutation = useMutation({
    mutationFn: (variables: {
      values: Parameters<typeof publishVideo>[0];
      options?: PublishVideoOptions;
    }) =>
      publishVideo(variables.values, {
        ...variables.options,
        onProgress: (progress) => {
          setProgress(progress);

          variables.options?.onProgress?.(progress);
        },
      }),

    onMutate: () => {
      setProgress(INITIAL_PROGRESS);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["videos"],
      });

      setProgress(INITIAL_PROGRESS);
    },

    onError: () => {
      setProgress(INITIAL_PROGRESS);
    },
  });

  const isUploading =
    mutation.isPending && progress.percentage > 0 && progress.percentage < 100;

  const isFinalizing = mutation.isPending && progress.percentage === 100;

  return {
    ...mutation,

    upload: {
      percentage: progress.percentage,
      uploadedMB: progress.loaded / (1024 * 1024),
      totalMB: progress.total / (1024 * 1024),
      isUploading,
      isFinalizing,
    },
  };
};
