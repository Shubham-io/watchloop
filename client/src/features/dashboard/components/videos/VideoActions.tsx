import { MoreHorizontal } from "lucide-react";

import { Button } from "@watchloop/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@watchloop/components/ui/dropdown-menu";

import type { ChannelVideo } from "../../types/dashboard.types";

interface VideoActionsProps {
  video: ChannelVideo;
  onEdit: () => void;
  onDelete: () => void;
}

export const VideoActions = ({
  onEdit,
  onDelete,
}: VideoActionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" aria-label="Video actions" variant="ghost">
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete} className="text-destructive">
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
