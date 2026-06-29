import { Button } from "@watchloop/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@watchloop/components/ui/dialog";

import { Checkbox } from "@watchloop/components/ui/checkbox";

import { usePlaylists } from "../hooks/usePlaylists";
import { useAddVideoToPlaylist } from "../hooks/useAddVideoToPlaylist";
import { useRemoveVideoFromPlaylist } from "../hooks/useRemoveVideoFromPlaylist";
import type { RootState } from "@watchloop/store/store";
import { useAppSelector } from "@watchloop/store/hooks";

type Props = {
  videoId: string;
};

const AddToPlaylistDialog = ({ videoId }: Props) => {
  const user = useAppSelector((state: RootState) => state.auth.user);

  const { data: playlists = [] } = usePlaylists(user!._id);

  const addMutation = useAddVideoToPlaylist(user?._id ?? "");

  const removeMutation = useRemoveVideoFromPlaylist(user?._id ?? "");

  const handleCheckedChange = (checked: boolean, playlistId: string) => {
    console.log("checked:", checked);
    if (checked) {
      addMutation.mutate({
        playlistId,
        videoId,
      });
    } else {
      removeMutation.mutate({
        playlistId,
        videoId,
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Save</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save to Playlist</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {playlists.map((playlist) => {
            const exists = playlist.videos.includes(videoId);

            return (
              <div key={playlist._id} className="flex items-center gap-3">
                <Checkbox
                  //  className="data-[state=checked]:text-white"
                  checked={exists}
                  onCheckedChange={(checked) =>
                    handleCheckedChange(checked as boolean, playlist._id)
                  }
                />

                <span>{playlist.name}</span>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddToPlaylistDialog;
