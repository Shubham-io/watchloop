import { useEffect, useRef, useMemo } from "react";
import { Upload } from "lucide-react";

import { Button } from "@watchloop/components/ui/button";
import { Input } from "@watchloop/components/ui/input";

type ThumbnailUploaderProps = {
  value?: File;
  initialPreview?: string;
  onChange: (file: File | undefined) => void;
  disabled?: boolean;
};

const ThumbnailUploader = ({
  value,
  initialPreview,
  onChange,
  disabled,
}: ThumbnailUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const localPreviewUrl = useMemo(() => {
    if (!value) return null;

    return URL.createObjectURL(value);
  }, [value]);

  useEffect(() => {
    return () => {
      if (localPreviewUrl) {
        URL.revokeObjectURL(localPreviewUrl);
      }
    };
  }, [localPreviewUrl]);

  const displayPreview = localPreviewUrl ?? initialPreview;

  const handleRemove = () => {
    onChange(undefined);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4 rounded-xl p-4">
      <Input
        ref={inputRef}
        hidden
        type="file"
        accept="image/*"
        disabled={disabled}
        onChange={(e) => onChange(e.target.files?.[0])}
      />

      {!displayPreview ? (
        <div
          onClick={() => !disabled && inputRef.current?.click()}
          className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 text-center transition-colors hover:bg-muted"
        >
          <Upload className="mb-4 h-10 w-10 text-muted-foreground" />

          <p className="text-lg font-semibold">Upload Thumbnail</p>

          <p className="mt-2 text-sm text-muted-foreground">
            Click to browse your computer
          </p>

          <p className="mt-1 text-xs text-muted-foreground">PNG • JPG • WEBP</p>
        </div>
      ) : (
        <>
          <img
            src={displayPreview}
            alt="Thumbnail Preview"
            className="aspect-video w-full rounded-lg border object-cover"
          />

          <div className="flex items-center justify-between rounded-md bg-muted p-3">
            <div>
              {value ? (
                <>
                  <p className="font-medium">{value.name}</p>

                  <p className="text-sm text-muted-foreground">
                    {(value.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </>
              ) : (
                <>
                  <p className="font-medium">Current Thumbnail</p>

                  <p className="text-sm text-muted-foreground">
                    Upload a new image to replace it
                  </p>
                </>
              )}
            </div>

            <Button
              type="button"
              variant="outline"
              disabled={disabled}
              onClick={handleRemove}
            >
              {value ? "Clear Selection" : "Choose New"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ThumbnailUploader;
