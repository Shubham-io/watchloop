import { useState } from "react";

import EditCommentForm from "./EditCommentForm";

import { Button } from "@watchloop/components/ui/button";

import type { Comment } from "../types/comment.types";
import { useDeleteComment } from "../hooks/useDeleteComment";
import { LikeButton } from "@watchloop/components/shared/LikeButton";
import { useToggleCommentLike } from "@watchloop/features/likes/hooks/useToggleCommentLike";

interface CommentCardProps {
  comment: Comment;
  videoId: string;
  page: number;
}

export default function CommentCard({
  comment,
  videoId,
  page,
}: CommentCardProps) {
  const toggleCommentLike = useToggleCommentLike();
  const [isEditing, setIsEditing] = useState(false);

  const deleteCommentMutation = useDeleteComment(videoId);

  if (isEditing) {
    return (
      <EditCommentForm
        commentId={comment._id}
        initialContent={comment.content}
        videoId={videoId}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="flex item-center justify-between space-y-2 border-b pb-4">
      {/* <div className="font-semibold">{comment.owner.fullname}</div> */}

      <div className="space-y-1">
        <div className="flex gap-2">
          <span>
            <img
              src={comment.owner.avatar}
              alt="avatar"
              className="w-6 h-6 rounded-full"
            />
          </span>
          <div className="text-sm text-muted-foreground">
            @{comment.owner.username}
          </div>
        </div>
        <p>{comment.content}</p>

        <LikeButton
          isLiked={comment.isLiked}
          likesCount={comment.likesCount}
          isPending={toggleCommentLike.isPending}
          className="p-2"
          onClick={() =>
            toggleCommentLike.mutate({
              commentId: comment._id,
              videoId,
              page,
            })
          }
        />
      </div>

      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
          Edit
        </Button>

        <Button
          size="sm"
          variant="destructive"
          onClick={() => deleteCommentMutation.mutate(comment._id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
