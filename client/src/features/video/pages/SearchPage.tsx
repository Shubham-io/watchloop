import { useSearchParams } from "react-router-dom";
import { useSearch } from "../hooks/useSearch";
import SearchPageSkeleton from "../skeletons/SearchPageSkeleton";
import VideoGrid from "../components/VideoGrid";

const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q") || "";

  const { data, isLoading } = useSearch({ query });

  if (isLoading) {
    return <SearchPageSkeleton />;
  }

  if (!data?.docs.length) {
    return <div className="text-center py-10">No videos found.</div>;
  }

  return (
    <>
      <h1 className="mb-6 text-2xl font-semibold">
        Search Results for "{query}"
      </h1>

      {/* <VideoGrid>
        {data.docs.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </VideoGrid> */}
      <VideoGrid videos={data.docs} />
    </>
  );
};

export default SearchPage;
