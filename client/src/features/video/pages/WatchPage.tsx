import { useParams } from "react-router-dom";

import { useVideo } from "../hooks/useVideo";

import VideoPlayer from "../components/VideoPlayer";
import VideoMeta from "../components/VideoMeta";
import ChannelInfo from "../components/ChannelInfo";
// import RecommendedVideos from "../components/RecommendedVideos";
import { recordVideoView } from "../api/video.api";
import {
  AddCommentForm,
  CommentsSkeleton,
  useComments,
  CommentList,
} from "@watchloop/features/comment";

import WatchPageSkeleton from "../skeletons/WatchPageSkeleton";
import { useEffect } from "react";

const WatchPage = () => {
  const { videoId } = useParams();
  const currentPage = 1;

  const { data: video, isLoading } = useVideo(videoId!);
  const { data: comments, isLoading: isCommentsLoading } = useComments(
    videoId!, currentPage
  );

  useEffect(() => {
    if (!videoId) return;

    recordVideoView(videoId);
  }, [videoId]);

  if (isLoading) {
    return <WatchPageSkeleton />;
  }

  if (!video) {
    return <div>Video not found</div>;
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
          <CommentList
            comments={comments?.docs || []}
            videoId={videoId as string}
            page={currentPage}
          />
        )}
      </div>

      {/* <RecommendedVideos />  */}
    </div>
  );
};

export default WatchPage;
