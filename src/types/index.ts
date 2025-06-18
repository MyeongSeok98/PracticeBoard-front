export interface Comment {
  id: number;
  author: string;
  content: string;
}

export interface Post {
  post_id: number;
  postName: string;
  postContent: string;
  postWriter: string;
  likes: number;
  comments: Comment[];
}
