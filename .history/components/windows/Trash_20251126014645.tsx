"use client";

import { Trash2 } from "lucide-react";

export default function Trash() {
  return (
    <div className="h-full bg-white dark:bg-gray-900 flex flex-col">
      {/* Trash Toolbar */}
      <div className="bg-gray-100 dark:bg-gray-800 p-3 border-b border-gray-300 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Trash2 size={20} className="text-gray-700 dark:text-gray-300" />
            <span className="font-semibold text-gray-900 dark:text-white">
              Trash
            </span>
          </div>
        </div>
      </div>

      {/* Empty Trash Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <Trash2 size={80} className="text-gray-300 dark:text-gray-700" />
            </div>
          </div>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No Items in Trash
          </h2>

          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Trash is empty
          </p>
        </div>
      </div>
    </div>
  );
}
