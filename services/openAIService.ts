import axios from "axios";

const OPENAI_API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY;

const openAIRequest = async (prompt: string) => {
  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-3.5-turbo-0125",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
      max_tokens: 100,
    },
    {
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
    },
  );
  return response.data.choices[0].message.content.trim();
};

export const generateSentence = async (word: string): Promise<string> => {
  const prompt = `Generate a simple sentence using the word "${word}" with a length of 10-15 words.`;
  const result = await openAIRequest(prompt);
  return result;
};

export const translateText = async (
  text: string,
  targetLanguage: string = "ru",
): Promise<string> => {
  const prompt = `Translate the following text to ${targetLanguage}: "${text}"`;
  return await openAIRequest(prompt);
};
