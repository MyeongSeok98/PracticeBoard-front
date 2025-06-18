// src/app/signup/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      const res = await fetch("http://localhost:8081/api/members/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          memberName: name,
          memberEmail: email,
          memberPassword: password,
        }),
      });

      if (res.ok) {
        // 201 Created
        router.push("/login");
      } else {
        const text = await res.text();
        setErrorMsg(text);
      }
    } catch (err) {
      setErrorMsg("네트워크 오류가 발생했습니다.");
    }
  };
  return (
    <main className="flex items-center justify-center min-h-screen">
      <Card className="overflow-hidden m-30">
        <div className="w-full max-w-md space-y-6 p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold">회원가입</h1>
            <p className="text-gray-500 dark:text-gray-400">
              몇 가지 정보만 입력하고 시작해보세요.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">이름</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="홍길동"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">비밀번호</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {/* <div className="space-y-2">
            <Label htmlFor="confirm-password">비밀번호 확인</Label>
            <Input id="confirm-password" type="password" required />
          </div> */}
              <Button type="submit" className="w-full">
                가입하기
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            이미 계정이 있으신가요?{" "}
            <Link href="/login" className="underline hover:text-primary">
              로그인
            </Link>
          </div>
        </div>
      </Card>
    </main>
  );
}
