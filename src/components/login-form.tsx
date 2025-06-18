"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    console.log("응애 로그인됨");
    try {
      const res = await fetch("http://localhost:8081/api/members/login", {
        method: "POST",
        credentials: "include", // 세션 쿠키를 포함하려면
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          memberEmail: email,
          memberPassword: password,
        }),
      });

      if (res.ok) {
        const data = await res.json(); // { message, memberName }
        // 로그인 성공 → 원하는 페이지로 이동
        router.push("/");
      } else {
        const text = await res.text();
        setErrorMsg(text);
      }
    } catch (err) {
      setErrorMsg("네트워크 오류가 발생했습니다.");
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden m-30">
        <CardContent className="grid p-3 md:grid-cols-1">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">로그인.</h1>
                <p className="text-balance text-muted-foreground">
                  우리를 위해 실제 사용중인 계정과 비밀번호를 입력해주세요.
                </p>
              </div>

              {/* 이메일과 비밀번호 입력란 */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {/* <a href="#" className="ml-auto text-sm underline-offset-2 hover:underline">
                    비밀번호를 잊었나요?ㅋ
                  </a> */}
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {/* 이메일과 비밀번호 입력란 */}

              {/* 로그인 버튼 */}
              <Button type="submit" className="w-full">
                Login
              </Button>
              {/* 로그인 버튼 */}

              <div className="text-center text-sm">
                당신의 개인정보를 주세요{" "}
                <Link href="/signup" className="underline underline-offset-4">
                  회원가입
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* 회원약관 */}
      <div className="text-balance text-center text-xs text-muted-foreground">
        저희는 개인정보 보안이 없습니다.{" "}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="link"
              className="p-0 h-auto text-xs text-muted-foreground font-normal"
            >
              회원약관
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>회원약관</DialogTitle>
              <DialogDescription>
                꼼꼼히 읽어보시고 동의해주세요. (동의 안하면 못씀)
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-6">
              <h3 className="font-bold">제1조 (목적)</h3>
              <p>
                이 약관은 당신의 모든 개인정보를 저희가 합법적으로 사용하기 위해
                존재합니다.
              </p>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button">무조건 동의합니다.</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
