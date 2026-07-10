import VideoGrid from "@watchloop/features/video/components/VideoGrid";
import type { Video } from "@watchloop/features/video/types/video.types";

const mockVideos: Video[] = Array.from({ length: 8 }).map((_, index) => ({
  _id: String(index),
  title: `Video ${index + 1}`,
  description: "",
  thumbnail: {
    url: "https://picsum.photos/600/400",
    public_id: "",
    resource_type: "image"
  },
  videoFile: {
    url: "",
    public_id: "",
    resource_type: "video",
    duration: 100
  },
  views: 2500,
  likesCount: 0,
  isLiked: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  isPublished: true,
  owner: {
    _id: "1",
    username: "shubham",
    fullname: "Shubham Kumar",
    avatar: "https://i.pravatar.cc/150"
  }
}));

const TestVideoGrid = () => {
  return (
    <div className="p-5">
      <VideoGrid videos={mockVideos} />
    </div>
  );
};

export default TestVideoGrid;