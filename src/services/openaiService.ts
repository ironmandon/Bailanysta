
export interface GeneratePostParams {
  topic?: string;
  mood?: 'casual' | 'professional' | 'funny' | 'inspirational';
  length?: 'short' | 'medium' | 'long';
}

export interface GeneratedPostResponse {
  content: string;
}

export class OpenAIService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generatePost(params: GeneratePostParams = {}): Promise<GeneratedPostResponse> {
    const { topic = 'что-то интересное', mood = 'casual', length = 'medium' } = params;

    const lengthPrompts = {
      short: 'в 1-2 предложениях',
      medium: 'в 2-3 предложениях',
      long: 'в 3-4 предложениях'
    };

    const moodPrompts = {
      casual: 'в неформальном, дружеском тоне',
      professional: 'в профессиональном тоне',
      funny: 'с юмором и позитивом',
      inspirational: 'вдохновляющим и мотивирующим тоном'
    };

    const prompt = `Напиши пост для социальной сети на тему "${topic}" ${moodPrompts[mood]} ${lengthPrompts[length]}. Пост должен быть на русском языке, естественным и интересным для аудитории. Не используй хештеги в конце.`;

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'Ты помощник для создания постов в социальных сетях. Создавай естественные, интересные и релевантные посты на русском языке.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 200,
          temperature: 0.8,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Ошибка API');
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content?.trim();

      if (!content) {
        throw new Error('Не удалось сгенерировать контент');
      }

      return { content };
    } catch (error) {
      console.error('OpenAI API error:', error);
      throw error;
    }
  }
}
