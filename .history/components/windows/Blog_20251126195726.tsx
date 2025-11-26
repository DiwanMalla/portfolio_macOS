"use client";

import { useState, useEffect } from "react";
import {
  BookOpen,
  Calendar,
  Tag,
  ChevronLeft,
  Loader2,
  ExternalLink,
  Clock,
  Folder,
} from "lucide-react";
import Image from "next/image";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  images: string[];
  description: string;
  blogCategory: string[];
  tags: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatMarkdown(text: string) {
  // Simple markdown parser for bold, headers, etc.
  return text
    .split("\n")
    .map((line, index) => {
      // Headers
      if (line.startsWith("### ")) {
        return (
          <h3
            key={index}
            className="text-lg font-bold text-gray-800 dark:text-white mt-4 mb-2"
          >
            {line.replace("### ", "").replace(/\*\*/g, "")}
          </h3>
        );
      }
      if (line.startsWith("## ")) {
        return (
          <h2
            key={index}
            className="text-xl font-bold text-gray-800 dark:text-white mt-4 mb-2"
          >
            {line.replace("## ", "").replace(/\*\*/g, "")}
          </h2>
        );
      }
      if (line.startsWith("# ")) {
        return (
          <h1
            key={index}
            className="text-2xl font-bold text-gray-800 dark:text-white mt-4 mb-2"
          >
            {line.replace("# ", "").replace(/\*\*/g, "")}
          </h1>
        );
      }

      // Empty lines
      if (line.trim() === "") {
        return <br key={index} />;
      }

      // Regular paragraphs with bold text handling
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p
          key={index}
          className="text-gray-600 dark:text-gray-300 leading-relaxed mb-2"
        >
          {parts.map((part, i) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return (
                <strong key={i} className="font-semibold text-gray-800 dark:text-white">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            // Handle *italic* text
            const italicParts = part.split(/(\*.*?\*)/g);
            return italicParts.map((italicPart, j) => {
              if (
                italicPart.startsWith("*") &&
                italicPart.endsWith("*") &&
                !italicPart.startsWith("**")
              ) {
                return (
                  <em key={`${i}-${j}`} className="italic">
                    {italicPart.slice(1, -1)}
                  </em>
                );
              }
              return italicPart;
            });
          })}
        </p>
      );
    });
}

function CategoryBadge({ category }: { category: string }) {
  const colors: Record<string, string> = {
    "Node js": "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300",
    "React js": "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300",
    "Next js": "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300",
    CSS: "bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300",
    "Flutter Dev": "bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300",
    Database: "bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300",
    Deployment: "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300",
  };

  return (
    <span
      className={`inline-block px-2 py-1 text-xs font-medium rounded-full mr-2 mb-2 ${
        colors[category] || "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
      }`}
    >
      {category}
    </span>
  );
}

function TagBadge({ tag }: { tag: string }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded mr-2 mb-2">
      <Tag size={10} />
      {tag}
    </span>
  );
}

function BlogCard({
  blog,
  onClick,
}: {
  blog: Blog;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group border border-gray-200 dark:border-gray-700"
    >
      {/* Blog Image */}
      <div className="relative h-48 overflow-hidden">
        {blog.images && blog.images[0] ? (
          <Image
            src={blog.images[0]}
            alt={blog.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="h-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <BookOpen size={48} className="text-white/50" />
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex flex-wrap gap-1">
            {blog.blogCategory.slice(0, 3).map((cat) => (
              <span
                key={cat}
                className="px-2 py-0.5 text-xs font-medium bg-white/20 backdrop-blur-sm text-white rounded-full"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {blog.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
          {blog.description.replace(/[#*]/g, "").slice(0, 120)}...
        </p>
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Calendar size={12} />
            <span>{formatDate(blog.createdAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span>{Math.ceil(blog.description.length / 1000)} min read</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function BlogDetail({ blog, onBack }: { blog: Blog; onBack: () => void }) {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-3"
        >
          <ChevronLeft size={16} />
          Back to Blogs
        </button>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          {blog.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{formatDate(blog.createdAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{Math.ceil(blog.description.length / 1000)} min read</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Featured Image */}
        {blog.images && blog.images[0] && (
          <div className="relative h-64 w-full">
            <Image
              src={blog.images[0]}
              alt={blog.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="p-6">
          {/* Categories */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Folder size={14} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Categories
              </span>
            </div>
            <div className="flex flex-wrap">
              {blog.blogCategory.map((cat) => (
                <CategoryBadge key={cat} category={cat} />
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Tag size={14} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Tags
              </span>
            </div>
            <div className="flex flex-wrap">
              {blog.tags.map((tag) => (
                <TagBadge key={tag} tag={tag} />
              ))}
            </div>
          </div>

          {/* Blog Content */}
          <div className="prose prose-sm dark:prose-invert max-w-none">
            {formatMarkdown(blog.description)}
          </div>

          {/* External Link */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <a
              href={`https://www.diwanmalla.com.au/blog/${blog.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <ExternalLink size={16} />
              Read on Portfolio
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Blog() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch("/api/blogs");
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data = await response.json();
        // Filter only published blogs
        const publishedBlogs = data.filter(
          (blog: Blog) => blog.status === "publish"
        );
        setBlogs(publishedBlogs);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load blogs");
      } finally {
        setIsLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  if (selectedBlog) {
    return (
      <div className="h-full bg-gray-50 dark:bg-gray-900">
        <BlogDetail blog={selectedBlog} onBack={() => setSelectedBlog(null)} />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-linear-to-br from-purple-500 to-pink-500 rounded-lg">
            <BookOpen size={20} className="text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-gray-800 dark:text-white">
              Blog
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Thoughts, tutorials & insights
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <Loader2 size={32} className="animate-spin text-blue-500 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400">Loading blogs...</p>
            </div>
          </div>
        ) : error ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <p className="text-red-500 mb-2">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="text-blue-500 hover:text-blue-600"
              >
                Try again
              </button>
            </div>
          </div>
        ) : blogs.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <BookOpen size={48} className="text-gray-300 dark:text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400">No blogs found</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {blogs.map((blog) => (
              <BlogCard
                key={blog._id}
                blog={blog}
                onClick={() => setSelectedBlog(blog)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
