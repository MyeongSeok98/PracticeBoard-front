// src/app/posts/[id]/page.tsx

// 상호작용 필요
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePosts } from "@/context/PostContext";
import { notFound, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
// import { getCurrentUser } from "@/lib/auth"; // 백엔드와 합칠 때 서버에서 현재 사용자 정보를 가져오는 함수 (직접 만들어야 함)

// export default async function PostDetailPage({ params }) 이것도 나중에
export default function PostDetailPage({ params }: { params: { id: string } }) {
  // const resolvedParams = use(params);
  const { posts, addComment, deletePost } = usePosts();
  const router = useRouter(); // 페이지 이동을 위한 router훅

  const [newComment, setNewComment] = useState("");

  const postData = posts.find((p) => p.post_id === parseInt(params.id));

  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newComment.trim() || !postData) return;

    // 중앙 관리소에 있는 addComment 함수를 호출합니다!
    addComment(postData.post_id, newComment);

    setNewComment("");
  };

  const handleDelete = () => {
    if (!postData) return;
    deletePost(postData.post_id);
    alert("삭제 됬다.");
    router.push("/"); //삭제 후 메인 홈페이지 이동
  };

  // postData가 없을 경우 notFound()를 렌더링합니다.
  if (!postData) {
    return notFound();
  }

  // 로그인한 사용자와 작성자 비교
  //const loggedInUser = await getCurrentUser();
  const loggedInUser = { name: "룰루랄라 조로" }; // 진짜 로그인 시스템으로 교체될 부분
  const isAuthor = loggedInUser.name === postData.postWriter; //이 비교 로직은 진짜 시스템에서 사용될 진짜 로직 부분

  return (
    <main className="container mx-auto max-w-4xl p-4 md:p-8">
      {/* ... (게시물 상세 내용 부분은 동일) ... */}
      <article className="space-y-6">
        <h1 className="text-4xl font-extrabold">{postData.postName}</h1>
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <div>
            <span>작성자: {postData.postWriter}</span>
            <span className="mx-2">|</span>
          </div>

          {/* 이 조건부 렌더링도 그대로 사용될 진짜 로직 */}
          {isAuthor && (
            <div className="flex gap-4">
              {/* 수정: Link 컴포넌트로 감싸줍니다. */}
              <Link href={`/posts/${postData.post_id}/edit`}>
                <span className="cursor-pointer hover:text-primary">수정</span>
              </Link>

              {/* 삭제: AlertDialog로 감싸줍니다. */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <span className="cursor-pointer text-red-500 hover:text-red-400">
                    삭제
                  </span>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>진짜?</AlertDialogTitle>
                    <AlertDialogDescription>
                      이 작업은 되돌릴 수 없다. 이 게시물은 서버에서 영구적으로
                      삭제된다.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>취소</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>
                      삭제
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
        <hr />
        <div className="prose dark:prose-invert max-w-none">
          {postData.postContent}
        </div>
      </article>

      {/* 댓글 작성 폼 */}
      <form className="mt-6 flex gap-2" onSubmit={handleCommentSubmit}>
        <Input
          type="text"
          placeholder="댓글을 입력하세요..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button type="submit">등록</Button>
      </form>
    </main>
  );
}
