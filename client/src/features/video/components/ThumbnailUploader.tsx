import { useEffect, useState, useRef } from "react";
import { Button } from "@watchloop/components/ui/button";
import { Input } from "@watchloop/components/ui/input";
import { Upload } from "lucide-react";

type ThumbnailUploaderProps = {
  value?: File;
  onChange: (file: File | undefined) => void;
  disabled?: boolean;
};

const ThumbnailUploader = ({
  value,
  onChange,
  disabled,
}: ThumbnailUploaderProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!value) {
      setPreviewUrl("");
      return;
    }

    const url = URL.createObjectURL(value);
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [value]);

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

      {!value && (
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
      )}

      {value && (
        <>
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Thumbnail Preview"
              className="aspect-video w-full rounded-lg border object-cover"
            />
          )}

          <div className="flex items-center justify-between rounded-md bg-muted p-3">
            <div>
              <p className="font-medium">{value.name}</p>

              <p className="text-sm text-muted-foreground">
                {(value.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>

            <Button
              type="button"
              variant="outline"
              disabled={disabled}
              onClick={() => onChange(undefined)}
            >
              Remove
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ThumbnailUploader;
