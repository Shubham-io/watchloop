import { History } from "lucide-react";

const EmptyHistory = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <History className="mb-4 h-12 w-12 text-muted-foreground" />

      <h2 className="text-xl font-semibold">
        No watch history yet
      </h2>

      <p className="mt-2 text-muted-foreground">
        Videos you watch will appear here.
      </p>
    </div>
  );
};

export default EmptyHistory;