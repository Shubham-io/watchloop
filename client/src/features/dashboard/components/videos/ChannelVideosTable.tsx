import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@watchloop/components/ui/table";

import type { ChannelVideo } from "../../types/dashboard.types";

import { VideoRow } from "./VideoRow";
import { useState } from "react";

import { EditVideoDialog } from "./EditVideoDialog";
import { DeleteVideoDialog } from "./DeleteVideoDialog";

interface ChannelVideosTableProps {
  videos: ChannelVideo[];
}

export const ChannelVideosTable = ({ videos }: ChannelVideosTableProps) => {
  const [selectedVideo, setSelectedVideo] = useState<ChannelVideo | null>(null);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  if (videos.length === 0) {
    return (
      <div className="rounded-lg border p-10 text-center text-muted-foreground">
        No videos uploaded yet.
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Video</TableHead>

              <TableHead>Views</TableHead>

              <TableHead>Likes</TableHead>

              <TableHead>Status</TableHead>

              <TableHead>Created</TableHead>

              <TableHead className="w-16" />
            </TableRow>
          </TableHeader>

          <TableBody>
            <>
              {videos.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-40 text-center">
                    No videos uploaded yet.
                  </TableCell>
                </TableRow>
              ) : (
                videos.map((video) => (
                  <VideoRow
                    video={video}
                    onEdit={(video) => {
                      setSelectedVideo(video);
                      setIsEditDialogOpen(true);
                    }}
                    onDelete={(video) => {
                      setSelectedVideo(video);
                      setIsDeleteDialogOpen(true);
                    }}
                  />
                ))
              )}

              <EditVideoDialog
                video={selectedVideo}
                open={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
              />

              <DeleteVideoDialog
                video={selectedVideo}
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
              />
            </>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
