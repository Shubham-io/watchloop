import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@watchloop/components/ui/button";

import { Input } from "@watchloop/components/ui/input";
import { Search, X } from "lucide-react";

const SEARCH_QUERY_PARAM = "q";

export default function SearchBar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const currentQuery = searchParams.get(SEARCH_QUERY_PARAM) ?? "";

  const [inputValue, setInputValue] = useState(currentQuery);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    setInputValue(currentQuery);
  }, [currentQuery]);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const trimmedQuery = inputValue.trim();

      if (!trimmedQuery) {
        return;
      }

      navigate(
        `/search?${SEARCH_QUERY_PARAM}=${encodeURIComponent(trimmedQuery)}`,
      );
    },
    [inputValue, navigate],
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-1 max-w-xl items-center gap-2"
    >
      <div className="relative flex-1">
        {/* Search icon */}
        <Search
          className="
          pointer-events-none
          absolute
          left-3
          top-1/2
          h-4
          w-4
          -translate-y-1/2
          text-muted-foreground
        "
        />

        <Input
          type="text"
          value={inputValue}
          placeholder="Search videos..."
          onChange={(event) => setInputValue(event.target.value)}
          className="
          h-10
          rounded-full
          pl-10
          pr-12
          focus-visible:ring-1
        "
        />

        {/* Clear button */}
        {inputValue && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="
            absolute
            right-2
            top-1/2
            h-7
            w-7
            -translate-y-1/2
            rounded-full
          "
            onClick={() => setInputValue("")}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Submit button */}
      <Button
        type="submit"
        className="bg-white text-black hover:bg-gray-200 rounded-full px-5 py-4.5 hover:cursor-pointer "
        disabled={!inputValue.trim()}
      >
        Search
      </Button>
    </form>
  );
}
