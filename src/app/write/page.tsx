// src/app/write/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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

export default function WritePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const res = await fetch("http://localhost:8081/api/posts/write", {
        method: "POST",
        credentials: "include", // 세션 쿠키 포함
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postName: title, // DTO 필드명에 맞춰서
          postContent: content,
        }),
      });

      if (res.ok) {
        // 201 Created
        window.location.href = "/";
      } else {
        const text = await res.text();
        setErrorMsg(text);
      }
    } catch {
      setErrorMsg("네트워크 오류가 발생했습니다.");
    }
  };

  return (
    <main className="container mx-auto max-w-4xl p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">새 글 작성하기</CardTitle>
          <CardDescription>적당히 씁시다.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="title">제목</Label>
              <Input
                id="title"
                placeholder="글의 제목을 입력하세요."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">내용</Label>
              <Textarea
                id="content"
                placeholder="글의 내용을 입력하세요."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[300px]" // 내용 입력란의 최소 높이를 지정
                required
              />
            </div>

            <div className="flex justify-end gap-1">
              <Link href="/">
                <Button variant="outline" type="button">
                  취소
                </Button>
              </Link>
              <Button type="submit">작성 완료</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
