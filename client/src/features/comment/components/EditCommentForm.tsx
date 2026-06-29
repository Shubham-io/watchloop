import { useState } from "react";

import { Button } from "@watchloop/components/ui/button";
import { Textarea } from "@watchloop/components/ui/textarea";

import { useUpdateComment } from "../hooks/useUpdateComment";

interface EditCommentFormProps {
  commentId: string;
  initialContent: string;
  videoId: string;
  onCancel: () => void;
}

export default function EditCommentForm({
  commentId,
  initialContent,
  videoId,
  onCancel,
}: EditCommentFormProps) {
  const [content, setContent] = useState(initialContent);

  const updateCommentMutation = useUpdateComment(videoId);

  const handleSubmit = () => {
    if (!content.trim()) return;

    updateCommentMutation.mutate(
      {
        commentId,
        comment: content,
      },
      {
        onSuccess: () => {
          onCancel();
        },
      },
    );
  };

  return (
    <div className="space-y-3">
      <Textarea value={content} onChange={(e) => setContent(e.target.value)} />

      <div className="flex gap-2">
        <Button
          size="sm"
          onClick={handleSubmit}
          disabled={updateCommentMutation.isPending}
        >
          Save
        </Button>

        <Button size="sm" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
