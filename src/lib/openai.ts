import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export const openai = new OpenAIApi(configuration);

// Example utility function
type OpenAICompletionParams = {
  prompt: string;
  model?: string;
  max_tokens?: number;
  temperature?: number;
};

export async function getCompletion({ prompt, model = "gpt-3.5-turbo-instruct", max_tokens = 256, temperature = 0.7 }: OpenAICompletionParams) {
  const response = await openai.createCompletion({
    model,
    prompt,
    max_tokens,
    temperature,
  });
  return response.data.choices[0]?.text || "";
}
