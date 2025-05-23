
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import { Post } from "@/types";
import { usePosts } from "@/context/PostContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const { toggleLike } = usePosts();
  const [isExpanded, setIsExpanded] = useState(false);
  
  const formattedDate = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
  });

  const handleLike = () => {
    toggleLike(post.id);
  };

  return (
    <div className="post-card animate-fade-in">
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-3">
          <Link to={`/profile/${post.author.username}`} className="relative h-10 w-10 overflow-hidden rounded-full">
            {post.author.avatar ? (
              <img 
                src={post.author.avatar} 
                alt={post.author.name} 
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="user-avatar flex h-full w-full items-center justify-center text-base font-medium">
                {post.author.name.charAt(0)}
              </div>
            )}
          </Link>
          <div>
            <Link to={`/profile/${post.author.username}`} className="font-medium hover:underline">
              {post.author.name}
            </Link>
            <p className="text-xs text-muted-foreground">{formattedDate}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Save post</DropdownMenuItem>
            <DropdownMenuItem>Copy link</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              Report post
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="post-content">
        {post.content.length > 250 && !isExpanded ? (
          <>
            <p>{post.content.slice(0, 250)}...</p>
            <Button
              variant="link"
              className="p-0 h-auto text-sm text-bailanysta-600 dark:text-bailanysta-400"
              onClick={() => setIsExpanded(true)}
            >
              Show more
            </Button>
          </>
        ) : (
          <p>{post.content}</p>
        )}
      </div>
      
      <div className="mt-4 flex items-center gap-6">
        <Button
          variant="ghost"
          size="sm"
          className={`flex items-center gap-1 ${
            post.hasLiked ? "text-red-500" : "text-muted-foreground"
          }`}
          onClick={handleLike}
        >
          <Heart className={`h-4 w-4 ${post.hasLiked ? "fill-current" : ""}`} />
          <span>{post.likes}</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-muted-foreground">
          <MessageCircle className="h-4 w-4" />
          <span>{post.comments?.length || 0}</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-muted-foreground">
          <Share2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
