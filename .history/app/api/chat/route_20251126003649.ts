export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1];
    const userQuery = lastMessage.content;

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

    if (data.error) {
      console.error("MCP API Error:", data.error);
      return new Response(`Error: ${data.error.message}`, { status: 500 });
    }

    const answer = data.result;

    // Stream the response to match existing behavior
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        controller.enqueue(encoder.encode(answer));
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
