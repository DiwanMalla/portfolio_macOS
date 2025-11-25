import { Groq } from "groq-sdk";
import { Index } from "@upstash/vector";
import { profile, socialLinks, terminalCommands } from "@/constants/profile";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const index = new Index({
  url: process.env.UPSTASH_VECTOR_REST_URL,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1];
    const userQuery = lastMessage.content;

    // 1. Retrieve relevant context from Upstash Vector (Optional/Enhancement)
    // We'll try to query, but if it fails or returns nothing, we fall back to static profile.
    let vectorContext = "";
    try {
      const queryResult = await index.query({
        data: userQuery,
        topK: 3,
        includeMetadata: true,
      });

      if (queryResult && queryResult.length > 0) {
        vectorContext = queryResult
          .map((match) => match.metadata?.text || "")
          .join("\n\n");
      }
    } catch (error) {
      console.warn("Upstash Vector query failed:", error);
      // Continue without vector context
    }

    // 2. Construct the System Prompt
    const systemPrompt = `
You are Diwan Malla's AI Digital Assistant, living inside a terminal in his portfolio website.
Your goal is to answer questions about Diwan, his skills, projects, and background.

Here is the core profile data about Diwan:
Name: ${profile.name}
Title: ${profile.title}
Location: ${profile.location}
Summary: ${profile.summary}
Email: ${profile.email}
Website: ${profile.website}

Social Links:
${socialLinks.map((s) => `- ${s.label}: ${s.url}`).join("\n")}

Skills & Info (from terminal commands):
${JSON.stringify(terminalCommands, null, 2)}

Additional Context (from knowledge base):
${vectorContext}

Instructions:
- Be helpful, concise, and professional but with a touch of tech-savvy personality.
- You are running in a simulated terminal environment.
- If asked about something not in the context, politely say you don't have that information about Diwan yet.
- Keep responses relatively short to fit the terminal aesthetic, unless asked for details.
- You can use markdown for formatting (bold, code blocks).
`;

    // 3. Call Groq API
    const completion = await groq.chat.completions.create({
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      model: "llama3-8b-8192", // Fast and good for chat
      stream: true,
    });

    // 4. Stream the response
    // We need to convert the Groq stream to a ReadableStream for the Response
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta?.content || "";
          if (content) {
            controller.enqueue(encoder.encode(content));
          }
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("Error in chat route:", error);
    return new Response("Error processing request", { status: 500 });
  }
}
