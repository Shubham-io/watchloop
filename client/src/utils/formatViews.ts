export const formatViews = (
  views: number
) => {
  return Intl.NumberFormat("en", {
    notation: "compact",
  }).format(views);
};