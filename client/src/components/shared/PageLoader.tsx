// import { Skeleton } from "../ui/skeleton";

// export default function PageLoader() {
//   return (
//     <div className="space-y-3">
//       <Skeleton className="h-8 w-48" />
//       <Skeleton className="h-48 w-full" />
//     </div>
//   );
// }


import { Loader2 } from "lucide-react";

export default function PageLoader() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  );
}
