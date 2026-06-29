type VideoPlayerProps = {
  videoUrl: string;
};

const VideoPlayer = ({
  videoUrl,
}: VideoPlayerProps) => {
  return (
    <video
      controls
      className="aspect-video w-full rounded-xl bg-black"
    >
      <source src={videoUrl} />
    </video>
  );
};

export default VideoPlayer;