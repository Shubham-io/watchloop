import { Button } from "@watchloop/components/ui/button";
import { useRemoveVideoFromPlaylist } from "../hooks/useRemoveVideoFromPlaylist";
import type { RootState } from "@watchloop/store/store";
import { useAppSelector } from "@watchloop/store/hooks";

type RemoveFromPlaylistButtonProps = {
  playlistId: string;
  videoId: string;
};

const RemoveFromPlaylistButton = ({
  playlistId,
  videoId,
}: RemoveFromPlaylistButtonProps) => {
  const user = useAppSelector((state: RootState) => state.auth.user);

  const removeMutation = useRemoveVideoFromPlaylist(user?._id ?? "");

  const handleRemove = () => {
    removeMutation.mutate({
      playlistId,
      videoId,
    });
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      disabled={removeMutation.isPending}
      onClick={handleRemove}
    >
      Remove
    </Button>
  );
};

export default RemoveFromPlaylistButton;
