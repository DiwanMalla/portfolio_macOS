export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response("Invalid request body", { status: 400 });
    }

    const lastMessage = messages[messages.length - 1];
    const userQuery = lastMessage.content;

    if (typeof userQuery !== "string" || userQuery.length > 500) {
      return new Response("Query too long or invalid", { status: 400 });
    }

    // Call the Digital Twin MCP Server streaming endpoint
    const response = await fetch(
      "https://digital-twin-workshop.vercel.app/api/mcp/stream",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: userQuery,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`MCP Server error: ${response.statusText}`);
    }

    // The response is a Server-Sent Events stream
    // We need to parse it and extract the text tokens
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let fullAnswer = "";

    if (!reader) {
      throw new Error("No response body");
    }

    // Read the stream and accumulate the answer
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split("\n");

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          try {
            const data = JSON.parse(line.slice(6));
            if (data.type === "token" && data.content) {
              fullAnswer += data.content;
            }
          } catch {
            // Ignore parse errors for malformed SSE data
          }
        }
      }
    }

    console.log("Full answer received:", fullAnswer.substring(0, 100) + "...");

    // Return the complete answer as plain text
    return new Response(fullAnswer, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("Error in chat route:", error);
    return new Response("Error processing request", { status: 500 });
  }
}
