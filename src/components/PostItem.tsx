// src/components/PostItem.tsx

"use client";

import Link from "next/link";
import { Post } from "@/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Heart, MessageCircle } from "lucide-react";
import { usePosts } from "@/context/PostContext";

export function PostItem({ post }: { post: Post }) {
  // 중앙 관리소에서 toggleLike 함수를 가져옵니다.
  const { toggleLike } = usePosts();

  // 좋아요 버튼 클릭 이벤트 핸들러
  const handleLikeClick = (e: React.MouseEvent) => {
    // 중요: 이 버튼을 클릭했을 때 부모인 Link의 페이지 이동이 실행되지 않도록 막습니다.
    e.preventDefault();
    e.stopPropagation();

    toggleLike(post.post_id);
  };

  return (
    <Link href={`/posts/${post.post_id}`}>
      <Card className="hover:border-primary transition-all mb-5">
        <CardHeader>
          <CardTitle>{post.postName}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-2 text-muted-foreground">
            {post.postContent}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between text-sm text-muted-foreground">
          <div>
            <span>작성자: {post.postWriter}</span>
          </div>

          <div className="flex items-center gap-4">
            {/* 좋아요 버튼 */}
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1"
              onClick={handleLikeClick}
            >
              <Heart className="size-4" />
              <span>{post.likes}</span>
            </Button>
            {/* 댓글 수 */}
            <div className="flex items-center gap-1">
              <MessageCircle className="size-4" />
              <span>{post.comments.length}</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
