
import { useState } from "react";
import { usePosts } from "@/context/PostContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image, Smile, Sparkles, Settings } from "lucide-react";
import { PostGenerator } from "./PostGenerator";
import { ApiKeySettings } from "@/components/settings/ApiKeySettings";

export function CreatePostForm() {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { addPost, currentUser } = usePosts();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    // Simulate network delay
    setTimeout(() => {
      addPost(content);
      setContent("");
      setIsSubmitting(false);
    }, 500);
  };

  const handleGeneratedContent = (generatedContent: string) => {
    setContent(generatedContent);
    setIsDialogOpen(false);
  };

  return (
    <form onSubmit={handleSubmit} className="post-card mb-6">
      <div className="flex items-start gap-3">
        <div className="relative h-10 w-10 overflow-hidden rounded-full">
          {currentUser.avatar ? (
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="user-avatar flex h-full w-full items-center justify-center text-base font-medium">
              {currentUser.name.charAt(0)}
            </div>
          )}
        </div>
        <div className="flex-1">
          <Textarea
            placeholder="О чем думаете?"
            className="min-h-[120px] resize-none border-none bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
        <div className="flex gap-2">
          <Button type="button" variant="ghost" size="sm">
            <Image className="h-5 w-5 mr-1" />
            <span className="sr-only sm:not-sr-only sm:text-xs">Фото</span>
          </Button>
          <Button type="button" variant="ghost" size="sm">
            <Smile className="h-5 w-5 mr-1" />
            <span className="sr-only sm:not-sr-only sm:text-xs">Эмодзи</span>
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button type="button" variant="ghost" size="sm">
                <Sparkles className="h-5 w-5 mr-1 text-bailanysta-500" />
                <span className="sr-only sm:not-sr-only sm:text-xs">ИИ</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <Tabs defaultValue="generator" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="generator">Генератор</TabsTrigger>
                  <TabsTrigger value="settings">Настройки</TabsTrigger>
                </TabsList>
                <TabsContent value="generator" className="mt-4">
                  <PostGenerator onGenerated={handleGeneratedContent} />
                </TabsContent>
                <TabsContent value="settings" className="mt-4 flex justify-center">
                  <ApiKeySettings />
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        </div>
        <Button
          type="submit"
          disabled={isSubmitting || !content.trim()}
          className="bg-bailanysta-500 hover:bg-bailanysta-600 text-white"
        >
          {isSubmitting ? "Публикую..." : "Опубликовать"}
        </Button>
      </div>
    </form>
  );
}
