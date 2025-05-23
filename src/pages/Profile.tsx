
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { PostCard } from "@/components/post/PostCard";
import { CreatePostForm } from "@/components/post/CreatePostForm";
import { usePosts } from "@/context/PostContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Edit, Calendar } from "lucide-react";
import { format } from "date-fns";

export default function Profile() {
  const { posts, currentUser } = usePosts();
  const [activeTab, setActiveTab] = useState("posts");
  
  // Filter for posts by current user only
  const userPosts = posts.filter(post => post.author.id === currentUser.id);
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="relative">
          {/* Profile header background */}
          <div className="h-32 sm:h-48 w-full rounded-xl bg-gradient-to-r from-bailanysta-300 to-bailanysta-500"></div>
          
          {/* Profile info */}
          <div className="px-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-16 sm:-mt-20">
              {/* Avatar */}
              <div className="relative h-24 w-24 sm:h-32 sm:w-32 overflow-hidden rounded-full border-4 border-background shadow-md">
                {currentUser.avatar ? (
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name} 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="user-avatar flex h-full w-full items-center justify-center text-3xl font-medium">
                    {currentUser.name.charAt(0)}
                  </div>
                )}
              </div>
              
              <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 gap-4">
                <div>
                  <h1 className="text-2xl font-bold">{currentUser.name}</h1>
                  <p className="text-muted-foreground">{currentUser.username}</p>
                  <div className="flex items-center text-sm text-muted-foreground mt-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Joined {format(new Date(currentUser.createdAt), "MMMM yyyy")}</span>
                  </div>
                </div>
                
                <Button variant="outline" className="sm:self-start">
                  <Edit className="h-4 w-4 mr-2" /> Edit Profile
                </Button>
              </div>
            </div>
            
            {currentUser.bio && (
              <p className="mt-4 text-foreground">{currentUser.bio}</p>
            )}
            
            <div className="flex gap-6 mt-6 border-b">
              <div className="text-center pb-4 border-b-2 border-bailanysta-500">
                <span className="text-lg font-semibold">{userPosts.length}</span>
                <p className="text-xs text-muted-foreground">Posts</p>
              </div>
              <div className="text-center pb-4">
                <span className="text-lg font-semibold">124</span>
                <p className="text-xs text-muted-foreground">Following</p>
              </div>
              <div className="text-center pb-4">
                <span className="text-lg font-semibold">348</span>
                <p className="text-xs text-muted-foreground">Followers</p>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="posts" onValueChange={setActiveTab}>
          <TabsList className="w-full border-b rounded-none bg-transparent h-auto p-0">
            <div className="flex w-full">
              <TabsTrigger 
                value="posts" 
                className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-bailanysta-500 data-[state=active]:shadow-none bg-transparent"
              >
                Posts
              </TabsTrigger>
              <TabsTrigger 
                value="media" 
                className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-bailanysta-500 data-[state=active]:shadow-none bg-transparent"
              >
                Media
              </TabsTrigger>
              <TabsTrigger 
                value="likes" 
                className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-bailanysta-500 data-[state=active]:shadow-none bg-transparent"
              >
                Likes
              </TabsTrigger>
            </div>
          </TabsList>
          
          <TabsContent value="posts" className="mt-6 focus-visible:outline-none focus-visible:ring-0">
            <CreatePostForm />
            
            {userPosts.length > 0 ? (
              <div className="space-y-6">
                {userPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center mt-6">
                <h3 className="text-lg font-semibold">No posts yet</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  When you create posts, they will be shown here.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="media" className="focus-visible:outline-none focus-visible:ring-0">
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-16 text-center mt-6">
              <h3 className="text-lg font-semibold">No media yet</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                When you share photos or videos, they will appear here.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="likes" className="focus-visible:outline-none focus-visible:ring-0">
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-16 text-center mt-6">
              <h3 className="text-lg font-semibold">No liked posts</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Posts you like will be saved here.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
