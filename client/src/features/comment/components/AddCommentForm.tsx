import { useState } from "react";

import { Button } from "@watchloop/components/ui/button";
import { Textarea } from "@watchloop/components/ui/textarea";

import { useCreateComment } from "../hooks/useCreateComment";

interface AddCommentFormProps {
  videoId: string;
}

export default function AddCommentForm({
  videoId,
}: AddCommentFormProps) {
  const [content, setContent] = useState("");

  const createCommentMutation =
    useCreateComment(videoId);

  const handleSubmit = () => {
    if (!content.trim()) return;

    createCommentMutation.mutate(content, {
      onSuccess: () => {
        setContent("");
      },
    });
  };

  return (
    <div className="space-y-3">
      <Textarea
        placeholder="Add a comment..."
        value={content}
        onChange={(e) =>
          setContent(e.target.value)
        }
      />

      <Button
        onClick={handleSubmit}
        disabled={createCommentMutation.isPending}
      >
        Comment
      </Button>
    </div>
  );
}