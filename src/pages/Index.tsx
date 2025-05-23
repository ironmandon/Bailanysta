
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { PostCard } from "@/components/post/PostCard";
import { CreatePostForm } from "@/components/post/CreatePostForm";
import { usePosts } from "@/context/PostContext";
import { Skeleton } from "@/components/ui/skeleton";

export default function Index() {
  const { posts, loading } = usePosts();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col">
          <h1 className="mb-6 text-3xl font-bold">Home</h1>
          {mounted && <CreatePostForm />}
          
          {loading ? (
            <div className="space-y-6">
              {Array(3).fill(0).map((_, i) => (
                <div key={i} className="post-card">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[100px]" />
                      <Skeleton className="h-3 w-[70px]" />
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                  <div className="mt-4 flex gap-4">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            posts.length > 0 ? (
              <div className="space-y-6">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <h3 className="text-lg font-semibold">No posts yet</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Create your first post or follow other users to see their posts here.
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </Layout>
  );
}
