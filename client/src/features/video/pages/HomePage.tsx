import VideoGrid from "../components/VideoGrid";
import { useVideos } from "../hooks/useVideos";
import HomePageSkeleton from "../skeletons/HomePageSkeleton";

const HomePage = () => {
  const {
    data,
    isPending,
    isError,
    error,
  } = useVideos();

  if (isPending) {
    return <HomePageSkeleton />;
  }

  if (isError) {
    return (
      <div className="text-red-500">
        {(error as Error).message}
      </div>
    );
  }

  return (
    <VideoGrid
      videos={data?.docs ?? []}
    />
  );
};

export default HomePage;