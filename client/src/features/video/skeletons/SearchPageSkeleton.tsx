import GridLayout from "@watchloop/layouts/GridLayout";
import VideoCardSkeleton from "@watchloop/components/shared/VideoCardSkeleton";

const SearchPageSkeleton = () => {
  return (
    <GridLayout>
      {Array.from({ length: 8 }).map((_, index) => (
        <VideoCardSkeleton key={index} />
      ))}
    </GridLayout>
  );
};

export default SearchPageSkeleton;