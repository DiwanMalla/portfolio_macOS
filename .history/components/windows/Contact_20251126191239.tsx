"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import { Send, Mail, MapPin, Phone, Loader2 } from "lucide-react";
import { contactInfo, socialLinks } from "@/constants/profile";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setIsSent(true);
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setIsSent(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="h-full flex flex-col md:flex-row bg-gray-50 dark:bg-gray-900">
      {/* Sidebar Info */}
      <div className="w-full md:w-1/3 bg-gray-100 dark:bg-gray-800 p-6 border-r border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">
          Get in Touch
        </h2>

        <div className="space-y-6">
          <div className="flex items-start gap-3">
            <Mail className="text-blue-500 mt-1" size={20} />
            <div>
              <div className="text-xs font-medium text-gray-500 uppercase">
                Email
              </div>
              <a
                href={`mailto:${contactInfo.email}`}
                className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-500"
              >
                {contactInfo.email}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="text-green-500 mt-1" size={20} />
            <div>
              <div className="text-xs font-medium text-gray-500 uppercase">
                Phone
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-300">
                {contactInfo.phone}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="text-red-500 mt-1" size={20} />
            <div>
              <div className="text-xs font-medium text-gray-500 uppercase">
                Location
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-300">
                {contactInfo.location}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="text-xs font-medium text-gray-500 uppercase mb-3">
              Socials
            </div>
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all hover:scale-110"
                  title={link.label}
                >
                  <Image
                    src={link.icon}
                    alt={link.label}
                    width={20}
                    height={20}
                    className="w-5 h-5"
                    unoptimized
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="flex-1 p-6 md:p-10 overflow-auto">
        <div className="max-w-lg mx-auto">
          <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
            Send a Message
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            I&apos;m always open to discussing new projects, creative ideas or
            opportunities to be part of your visions.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) =>
                    setFormState({ ...formState, name: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) =>
                    setFormState({ ...formState, email: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                Message
              </label>
              <textarea
                required
                rows={5}
                value={formState.message}
                onChange={(e) =>
                  setFormState({ ...formState, message: e.target.value })
                }
                className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            {error && (
              <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-md">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSending || isSent}
              className={`w-full py-2.5 px-4 rounded-md font-medium text-white transition-all flex items-center justify-center gap-2 ${
                isSent
                  ? "bg-green-500 hover:bg-green-600"
                  : isSending
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {isSent ? (
                "Message Sent!"
              ) : isSending ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
