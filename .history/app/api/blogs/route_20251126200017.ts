import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://diwanportfolio.vercel.app/api/blogs",
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch blogs");
    }

    const blogs = await response.json();
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
