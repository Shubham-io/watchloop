import { Progress } from "@watchloop/components/ui/progress";

type UploadProgressProps = {
  percentage: number;
  loaded: number;
  total: number;
  isUploading: boolean;
  isFinalizing: boolean;
};

const formatMB = (bytes: number) => {
  return (bytes / (1024 * 1024)).toFixed(2);
};

const UploadProgress = ({
  percentage,
  loaded,
  total,
  isUploading,
  isFinalizing,
}: UploadProgressProps) => {
  if (!isUploading && !isFinalizing) {
    return null;
  }
  return (
    <div className="space-y-3 rounded-xl border bg-card p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">
          {isFinalizing ? "Finalizing upload..." : "Uploading video..."}
        </h3>

        {isUploading && (
          <span className="text-sm font-medium">{percentage}%</span>
        )}
      </div>

      {isUploading && (
        <>
          <Progress value={percentage} />

          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{formatMB(loaded)} MB</span>

            <span>{formatMB(total)} MB</span>
          </div>
        </>
      )}

      {isFinalizing && (
        <div className="flex items-center gap-3">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />

          <div>
            <p className="text-sm text-muted-foreground">
              Please wait while we prepare your video.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadProgress;
