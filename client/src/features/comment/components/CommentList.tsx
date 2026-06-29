import CommentCard from "./CommentCard";

import type { Comment } from "../types/comment.types";

interface CommentListProps {
  comments: Comment[];
  videoId: string;
}

export default function CommentList({ comments, videoId }: CommentListProps) {
  
  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <CommentCard key={comment._id} comment={comment} videoId={videoId} />
      ))}
    </div>
  );
}
