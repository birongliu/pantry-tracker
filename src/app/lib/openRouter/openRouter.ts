
export async function openRouter(input: string) {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openchat/openchat-7b:free",
      messages: [{ role: "user", content: `As a culinary expert, given the stringified JSON data item name and quantity (amount) in JSON formatted ${JSON.stringify(input)}, you are making the dishes and I am your helper. you provide the output in JSON format containing the "ingredients" needed, time required, and how many serving for each person and the "recipes" for preparing the dishes using the ingredients. The output JSON format should be [{ "recipes": [{ recipeName: string, ingredients: [{ item: string, amount: number }], }], timeRequired: number, servingPerPerson: number }] Please exclude any other information. only return JSON structure. and remove all sentence that had nothing to do with JSON like "Here is the JSON output with only the ingredients and recipes for preparing the dishes using the given ingredients:"` }],
    }),
  });

  const data = await response.json();
  if(response.status === 429) return null
  return data.choices[0].message.content;
}
