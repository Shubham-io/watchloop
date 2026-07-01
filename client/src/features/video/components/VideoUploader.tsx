import { useEffect, useRef, useMemo } from "react";
import { Upload } from "lucide-react";

import { Button } from "@watchloop/components/ui/button";

type VideoUploaderProps = {
  value?: File;
  onChange: (file: File | undefined) => void;
  disabled?: boolean;
};

const VideoUploader = ({ value, onChange, disabled }: VideoUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const previewUrl = useMemo(() => {
    if (!value) return null;

    return URL.createObjectURL(value);
  }, [value]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleRemove = () => {
    onChange(undefined);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      <input
        ref={inputRef}
        type="file"
        hidden
        accept="video/*"
        disabled={disabled}
        onChange={(e) => onChange(e.target.files?.[0])}
      />

      {!value && (
        <div
          onClick={() => !disabled && inputRef.current?.click()}
          className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 text-center transition-colors hover:bg-muted"
        >
          <Upload className="mb-4 h-10 w-10 text-muted-foreground" />

          <p className="text-lg font-semibold">Upload Video</p>

          <p className="mt-2 text-sm text-muted-foreground">
            Click to browse your computer
          </p>

          <p className="mt-1 text-xs text-muted-foreground">MP4 • WEBM • MOV</p>
        </div>
      )}

      {value && (
        <>
          {previewUrl && (
            <video
              src={previewUrl}
              controls
              className="aspect-video w-full rounded-xl border bg-black"
            />
          )}

          <div className="rounded-lg border bg-muted/40 p-4">
            <p className="truncate font-medium">{value.name}</p>

            <p className="mt-1 text-sm text-muted-foreground">
              {(value.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={handleRemove}
            disabled={disabled}
          >
            Remove Video
          </Button>
        </>
      )}
    </div>
  );
};

export default VideoUploader;
