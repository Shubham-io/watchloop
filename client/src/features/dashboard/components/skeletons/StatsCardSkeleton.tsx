import React from "react";

import { Card, CardContent, CardHeader } from "@watchloop/components/ui/card";
import { Skeleton } from "@watchloop/components/ui/skeleton";

const StatsCardSkeleton = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <Skeleton className="h-4 w-24" />
        </CardHeader>

        <CardContent>
          <Skeleton className="h-8 w-20" />
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCardSkeleton;
