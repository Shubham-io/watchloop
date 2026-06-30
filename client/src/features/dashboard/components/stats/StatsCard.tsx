import type { ReactNode } from "react";

import { Card, CardContent } from "@watchloop/components/ui/card";

interface StatsCardProps {
  title: string;
  value: number;
  icon: ReactNode;
}

export const StatsCard = ({
  title,
  value,
  icon,
}: StatsCardProps) => {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-6">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">
            {title}
          </p>

          <h2 className="text-3xl font-bold">
            {value.toLocaleString()}
          </h2>
        </div>

        <div className="text-muted-foreground">
          {icon}
        </div>
      </CardContent>
    </Card>
  );
};