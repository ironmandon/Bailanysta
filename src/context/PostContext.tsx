
import { createContext, useContext, useState, useEffect } from "react";
import { Post, User } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface PostContextType {
  posts: Post[];
  loading: boolean;
  currentUser: User;
  addPost: (content: string) => void;
  toggleLike: (id: string) => void;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

// Dummy current user
const dummyCurrentUser: User = {
  id: "user-1",
  name: "Aida Martinez",
  username: "@aidamartinez",
  avatar: "https://i.pravatar.cc/150?img=48",
  bio: "Digital enthusiast | Photographer | Travel lover",
  createdAt: new Date("2023-01-15"),
};

// Dummy users for demo purposes
const dummyUsers: User[] = [
  dummyCurrentUser,
  {
    id: "user-2",
    name: "Elena Johnson",
    username: "@elenaj",
    avatar: "https://i.pravatar.cc/150?img=23",
    createdAt: new Date("2023-02-20"),
  },
  {
    id: "user-3",
    name: "Marcus Lee",
    username: "@marcuslee",
    avatar: "https://i.pravatar.cc/150?img=12",
    createdAt: new Date("2023-01-10"),
  },
];

// Initial dummy posts
const initialPosts: Post[] = [
  {
    id: "post-1",
    content: "Just launched my new photography website! Check it out and let me know what you think 📸",
    author: dummyUsers[1],
    createdAt: new Date("2023-05-20T14:30:00"),
    likes: 24,
    hasLiked: false,
  },
  {
    id: "post-2",
    content: "Exploring the hidden gems of Barcelona this weekend. Any recommendations for places off the beaten path?",
    author: dummyUsers[2],
    createdAt: new Date("2023-05-19T09:45:00"),
    likes: 42,
    hasLiked: true,
  },
  {
    id: "post-3",
    content: "Just finished reading 'The Psychology of Money'. Highly recommend for anyone interested in personal finance and behavioral economics!",
    author: dummyUsers[0],
    createdAt: new Date("2023-05-18T20:15:00"),
    likes: 18,
    hasLiked: false,
  },
  {
    id: "post-4",
    content: "Working on a new AI project that helps connect people with similar interests. Can't wait to share more details soon!",
    author: dummyUsers[1],
    createdAt: new Date("2023-05-17T12:35:00"),
    likes: 31,
    hasLiked: false,
  },
];

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Simulate loading posts
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Add a new post
  const addPost = (content: string) => {
    const newPost: Post = {
      id: `post-${Date.now()}`,
      content,
      author: dummyCurrentUser,
      createdAt: new Date(),
      likes: 0,
      hasLiked: false,
    };
    
    setPosts((prevPosts) => [newPost, ...prevPosts]);
    
    toast({
      title: "Post created",
      description: "Your post has been published successfully.",
    });
  };

  // Toggle like on a post
  const toggleLike = (id: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === id) {
          const hasLiked = !post.hasLiked;
          return {
            ...post,
            likes: hasLiked ? post.likes + 1 : post.likes - 1,
            hasLiked,
          };
        }
        return post;
      })
    );
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        loading,
        currentUser: dummyCurrentUser,
        addPost,
        toggleLike,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error("usePosts must be used within a PostProvider");
  }
  return context;
};
