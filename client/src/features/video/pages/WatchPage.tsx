import { useParams } from "react-router-dom";

import { useVideo } from "../hooks/useVideo";

import VideoPlayer from "../components/VideoPlayer";
import VideoMeta from "../components/VideoMeta";
import ChannelInfo from "../components/ChannelInfo";
// import RecommendedVideos from "../components/RecommendedVideos";
import {
  AddCommentForm,
  CommentsSkeleton,
  useComments,
  CommentList,
} from "@watchloop/features/comment";

import WatchPageSkeleton from "../skeletons/WatchPageSkeleton";

const WatchPage = () => {
  const { videoId } = useParams();

  const { data: video, isLoading } = useVideo(videoId!);
  const { data: comments, isLoading: isCommentsLoading } = useComments(videoId!);

  

  if (isLoading) {
    return <WatchPageSkeleton />;
  }

  //   if (isError || !data?.data) {
  //     return <div className="p-4 text-red-500">Failed to load video</div>;
  //   }

  if (!video) {
    return <div>Video not found</div>;
  }

  if (!videoId) {
    return <h1>Video not found</h1>;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <div className="space-y-6">
        <VideoPlayer videoUrl={video.videoFile.url} />

        <VideoMeta video={video} />

        <ChannelInfo owner={video.owner} />

        <AddCommentForm videoId={videoId as string} />

        {isCommentsLoading ? (
          <CommentsSkeleton />
        ) : (
          <CommentList comments={comments?.docs || []} videoId={videoId} />
        )}
      </div>

      {/* <RecommendedVideos />  */}
    </div>
  );
};

export default WatchPage;
