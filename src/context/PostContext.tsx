// src/context/PostContext.tsx

"use client";

import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { Post, Comment } from "@/types";

interface PostContextType {
  posts: Post[];
  addComment: (postId: number, commentContent: string) => Promise<void>;
  toggleLike: (postId: number) => Promise<void>;
  editPost: (
    postId: number,
    newTitle: string,
    newContent: string
  ) => Promise<void>;
  deletePost: (postId: number) => Promise<void>;
}

const PostContext = createContext<PostContextType>({} as PostContextType);

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") ||
  "http://localhost:8081/api";

export function PostProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);

  // 1) 초기 데이터 로딩
  useEffect(() => {
    fetch(`http://localhost:8081/api/posts`, {
      credentials: "include", // 세션·쿠키가 필요하면 반드시 포함
    })
      .then((res) => {
        if (!res.ok) throw new Error("게시글 로드 실패");
        return res.json() as Promise<Post[]>;
      })
      .then((data: Post[]) => setPosts(data))
      .catch(console.error);
  }, []);

  // 2) 댓글 추가
  const addComment = async (postId: number, commentContent: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}/comments`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: commentContent }),
      }
    );
    if (!res.ok) throw new Error("댓글 추가 실패");
    const updatedPost = (await res.json()) as Post;

    setPosts((prev) =>
      prev.map((p) => (p.post_id === postId ? updatedPost : p))
    );
  };

  // 3) 좋아요 토글 (여기서는 단순 increment)
  const toggleLike = async (postId: number) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}/like`,
      { method: "PUT" }
    );
    if (!res.ok) throw new Error("좋아요 처리 실패");
    const updatedPost = (await res.json()) as Post;

    setPosts((prev) =>
      prev.map((p) => (p.post_id === postId ? updatedPost : p))
    );
  };

  // 4) 게시물 수정
  const editPost = async (
    postId: number,
    newTitle: string,
    newContent: string
  ) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post_name: newTitle, post_content: newContent }),
      }
    );
    if (!res.ok) throw new Error("게시물 수정 실패");
    const updatedPost = (await res.json()) as Post;

    setPosts((prev) =>
      prev.map((p) => (p.post_id === postId ? updatedPost : p))
    );
  };

  // 5) 게시물 삭제
  const deletePost = async (postId: number) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`,
      { method: "DELETE" }
    );
    if (!res.ok) throw new Error("게시물 삭제 실패");

    setPosts((prev) => prev.filter((p) => p.post_id !== postId));
  };

  return (
    <PostContext.Provider
      value={{ posts, addComment, toggleLike, editPost, deletePost }}
    >
      {children}
    </PostContext.Provider>
  );
}

export function usePosts() {
  return useContext(PostContext);
}
