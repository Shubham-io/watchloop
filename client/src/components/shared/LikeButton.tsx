import { Button } from "@watchloop/components/ui/button";
import { ThumbsUp } from "lucide-react";
import { cn } from "@watchloop/lib/utils";

interface LikeButtonProps {
  isLiked: boolean;
  likesCount: number;
  isPending?: boolean;
  onClick: () => void;
  className?: string;
}

export const LikeButton = ({
  isLiked,
  likesCount,
  isPending = false,
  onClick,
  className,
}: LikeButtonProps) => {
  return (
    <Button
      variant={isLiked ? "default" : "outline"}
      size="sm"
      onClick={onClick}
      disabled={isPending}
      className={cn("gap-2 p-[14px]", className)}
    >
      <ThumbsUp
        className={cn(
          "transition-all duration-200",
          isLiked && "fill-current",
        )}
      />

      <span>{likesCount}</span>
    </Button>
  );
};
