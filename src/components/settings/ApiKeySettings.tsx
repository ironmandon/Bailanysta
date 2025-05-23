
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Key } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ApiKeySettings() {
  const [apiKey, setApiKey] = useState(localStorage.getItem("openai_api_key") || "");
  const [showKey, setShowKey] = useState(false);
  const { toast } = useToast();

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, введите API ключ",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem("openai_api_key", apiKey);
    toast({
      title: "Успешно",
      description: "API ключ сохранен",
    });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          Настройки API
        </CardTitle>
        <CardDescription>
          Добавьте ваш OpenAI API ключ для генерации постов
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="api-key">OpenAI API Key</Label>
          <div className="relative">
            <Input
              id="api-key"
              type={showKey ? "text" : "password"}
              placeholder="sk-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full w-10"
              onClick={() => setShowKey(!showKey)}
            >
              {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        <Button onClick={handleSaveApiKey} className="w-full">
          Сохранить ключ
        </Button>
      </CardContent>
    </Card>
  );
}
