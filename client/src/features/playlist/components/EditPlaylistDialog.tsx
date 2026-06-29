import { useState } from "react";
import type { Playlist } from "../types/playlist.types";
import { useUpdatePlaylist } from "../hooks/useUpdatePlaylist";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@watchloop/components/ui/dialog";

import { Button } from "@watchloop/components/ui/button";
import { Input } from "@watchloop/components/ui/input";
import { Textarea } from "@watchloop/components/ui/textarea";
import type { RootState } from "@watchloop/store/store";
import { useAppSelector } from "@watchloop/store/hooks";

type EditPlaylistDialogProps = {
  playlist: Playlist;
};

const EditPlaylistDialog = ({ playlist }: EditPlaylistDialogProps) => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const [open, setOpen] = useState(false);

  const [name, setName] = useState(playlist.name);
  const [description, setDescription] = useState(playlist.description);

  const { mutate, isPending } = useUpdatePlaylist(
    user?._id ?? "",
    playlist._id,
  );

  if (!user) return null;

  const handleSubmit = () => {
    mutate(
      {
        playlistId: playlist._id,
        payload: {
          name,
          description,
        },
      },
      {
        onSuccess: () => setOpen(false),
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Playlist</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input value={name} onChange={(e) => setName(e.target.value)} />

          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button
            onClick={handleSubmit}
            disabled={isPending}
            className="w-full"
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditPlaylistDialog;
