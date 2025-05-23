
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Loader2 } from "lucide-react";
import { OpenAIService, GeneratePostParams } from "@/services/openaiService";
import { useToast } from "@/hooks/use-toast";

interface PostGeneratorProps {
  onGenerated: (content: string) => void;
}

export function PostGenerator({ onGenerated }: PostGeneratorProps) {
  const [topic, setTopic] = useState("");
  const [mood, setMood] = useState<GeneratePostParams['mood']>('casual');
  const [length, setLength] = useState<GeneratePostParams['length']>('medium');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    const apiKey = localStorage.getItem("openai_api_key");
    
    if (!apiKey) {
      toast({
        title: "API ключ не найден",
        description: "Пожалуйста, добавьте OpenAI API ключ в настройках",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      const openaiService = new OpenAIService(apiKey);
      const result = await openaiService.generatePost({
        topic: topic || undefined,
        mood,
        length,
      });

      onGenerated(result.content);
      toast({
        title: "Пост сгенерирован!",
        description: "Контент готов к публикации",
      });
    } catch (error) {
      console.error('Generation error:', error);
      toast({
        title: "Ошибка генерации",
        description: error instanceof Error ? error.message : "Не удалось сгенерировать пост",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-bailanysta-500" />
          Генератор постов
        </CardTitle>
        <CardDescription>
          Создайте интересный пост с помощью ИИ
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="topic">Тема поста (необязательно)</Label>
          <Input
            id="topic"
            placeholder="О чем написать пост?"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Настроение</Label>
            <Select value={mood} onValueChange={(value: GeneratePostParams['mood']) => setMood(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="casual">Неформально</SelectItem>
                <SelectItem value="professional">Профессионально</SelectItem>
                <SelectItem value="funny">С юмором</SelectItem>
                <SelectItem value="inspirational">Вдохновляюще</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Длина</Label>
            <Select value={length} onValueChange={(value: GeneratePostParams['length']) => setLength(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="short">Короткий</SelectItem>
                <SelectItem value="medium">Средний</SelectItem>
                <SelectItem value="long">Длинный</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          onClick={handleGenerate} 
          disabled={isGenerating}
          className="w-full bg-bailanysta-500 hover:bg-bailanysta-600"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Генерирую...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              Сгенерировать пост
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
