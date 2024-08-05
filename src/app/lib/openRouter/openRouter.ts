import { OpenAIData } from "../interface";

const example_schema = {
  recipes: [
    {
      recipeName: "",
      serving: 0,
      instruction: [],
      ingredients: [
        { item: "", amount: 0, },
        { item: "", amount: 0, },
        { item: "", amount: 0, },
        { item: "", amount: 0, },
        { item: "", amount: 0, },
        { item: "", amount: 0, },
      ],
    },
  ],
};

interface AIDataWithSuccess {
  message: string
  statusCode: 200
}

interface AIDataWithRateLimit {
  message: string
  statusCode: 429
}


interface AIDataWithInternalError {
  message: null
  statusCode: 500
}

export type AIResponse = AIDataWithSuccess | AIDataWithRateLimit | AIDataWithInternalError

export async function openRouter(input: string): Promise<AIResponse> {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content: `Provide output in valid JSON. The data should structure like this: ${JSON.stringify(example_schema)}. Just return ONLY JSON structure no sentence nothing raw json`,
          },
          {
            role: "user",
            content: `Provide valid JSON output. As a culinary expert, you are given an order in JSON format ${input} making dishes. if there no data is empty string. come up with whatever dishes you want. The output JSON format should be like: ${JSON.stringify(example_schema)} Please remove all other information. only return JSON structure"`,
          },
        ],
      }),
    }
  );
  if(response.status === 429) return { statusCode: 429, message: "Ratelimited. Try again later" }

  const data = await response.json();
  const { finish_reason, message } = data.choices[0]
  if(finish_reason === "stop") return { statusCode: 200, message: message.content }

  return { statusCode: 500, message: null }
}
