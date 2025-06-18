// src/app/page.tsx
"use client";

import Link from "next/link";
// import { MOCK_POSTS } from "@/data/mockData";
// import { Post } from "@/types";
import { PostItem } from "@/components/PostItem";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePosts } from "@/context/PostContext";

export default function HomePage() {
  const { posts } = usePosts();

  return (
    <main className="container mx-auto max-w-screen-xl p-4 md:p-8 flex gap-8">
      <aside className="w-80 shrink-0 hidden md:block">
        <Card>
          <CardContent className="p-4">
            <Link href="/write" className="w-full">
              <Button className="w-full" variant="link">
                글쓰기
              </Button>
            </Link>
          </CardContent>
        </Card>
      </aside>

      <div className="flex-grow">
        <div className="space-y-4">
          {posts.map((post) => (
            <PostItem key={post.post_id} post={post} />
          ))}
        </div>
      </div>
    </main>
  );
}
