
export type User = {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  bio?: string;
  createdAt: Date;
};

export type Post = {
  id: string;
  content: string;
  author: User;
  createdAt: Date;
  likes: number;
  hasLiked: boolean;
  comments?: Comment[];
};

export type Comment = {
  id: string;
  content: string;
  author: User;
  createdAt: Date;
};
