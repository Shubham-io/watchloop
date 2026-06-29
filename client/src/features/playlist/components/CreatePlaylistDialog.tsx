import { useState } from "react";
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
import { useCreatePlaylist } from "../hooks/useCreatePlaylist";

import { useAppSelector } from "@watchloop/store/hooks";
import type { RootState } from "@watchloop/store/store";

const CreatePlaylistDialog = () => {
  //   const { user } = useAuthStore();
  const { user } = useAppSelector((state: RootState) => state.auth);

  const { mutate, isPending } = useCreatePlaylist(user!._id);

  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    mutate(
      {
        name,
        description,
      },
      {
        onSuccess: () => {
          setName("");
          setDescription("");
          setOpen(false);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Playlist</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Playlist</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Playlist name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={isPending}
          >
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePlaylistDialog;
