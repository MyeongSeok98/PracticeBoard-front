// src/app/posts/[id]/edit/page.tsx
"use client";

import { useState, useEffect } from "react";
import { usePosts } from "@/context/PostContext";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function EditPostPage() {
  const { posts, editPost } = usePosts();
  const router = useRouter(); // 페이지 이동을 위한 router
  const params = useParams(); // URL의 파라미터(id)를 가져옴
  const id = Number(params.id);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 페이지가 처음 로드될 때, 수정할 게시물의 데이터를 찾아서 state에 설정
  useEffect(() => {
    const postToEdit = posts.find((p) => p.post_id === id);
    if (postToEdit) {
      setTitle(postToEdit.postName);
      setContent(postToEdit.postContent);
    }
  }, [id, posts]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    editPost(id, title, content);
    alert("수정이 완료되었습니다.");
    router.push(`/posts/${id}`); // 수정 후 상세 페이지로 이동
  };

  return (
    <main className="container mx-auto max-w-4xl p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">글 수정하기</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">제목</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">내용</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[300px]"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                type="button"
                onClick={() => router.back()}
              >
                취소
              </Button>
              <Button type="submit">수정 완료</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
