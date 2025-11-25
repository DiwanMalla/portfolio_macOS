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

    // Call the Digital Twin MCP Server
    const response = await fetch(
      "https://digital-twin-workshop.vercel.app/api/mcp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "query_enhanced",
          params: {
            question: userQuery,
          },
          id: Date.now(),
        }),
      }
    );

    const data = await response.json();

    console.log("MCP Response:", JSON.stringify(data, null, 2));

    if (data.error) {
      console.error("MCP API Error:", data.error);
      return new Response(`Error: ${data.error.message}`, { status: 500 });
    }

    // Extract the answer from the result
    let answer = data.result;

    console.log("Result type:", typeof answer);
    console.log("Result value:", answer);

    // If result is an object, try to extract the text content
    if (typeof answer === "object" && answer !== null) {
      answer =
        answer.answer ||
        answer.response ||
        answer.text ||
        answer.content ||
        JSON.stringify(answer);
    }

    // Ensure answer is a string
    const answerText = String(answer);

    // Stream the response to match existing behavior
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        controller.enqueue(encoder.encode(answerText));
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
