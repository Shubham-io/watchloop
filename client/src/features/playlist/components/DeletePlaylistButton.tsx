import { useNavigate } from "react-router-dom";

import { Button } from "@watchloop/components/ui/button";

import { useDeletePlaylist } from "../hooks/useDeletePlaylist";
import type { RootState } from "@watchloop/store/store";
import { useAppSelector } from "@watchloop/store/hooks";

type DeletePlaylistButtonProps = {
  playlistId: string;
};

const DeletePlaylistButton = ({ playlistId }: DeletePlaylistButtonProps) => {
  const { user } = useAppSelector((state: RootState) => state.auth);

  const navigate = useNavigate();

  const { mutate, isPending } = useDeletePlaylist(user?._id ?? "");

  const handleDelete = () => {
    const confirmed = window.confirm("Delete this playlist?");

    if (!confirmed) return;

    mutate(playlistId, {
      onSuccess: () => {
        navigate("/playlists");
      },
    });
  };

  return (
    <Button variant="destructive" disabled={isPending} onClick={handleDelete}>
      Delete
    </Button>
  );
};

export default DeletePlaylistButton;
