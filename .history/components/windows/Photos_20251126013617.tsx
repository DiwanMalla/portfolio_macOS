"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Grid3x3, Image as ImageIcon } from "lucide-react";

interface PhotoGalleryItem {
  id: string;
  src: string;
  title: string;
}

export default function Photos() {
  const [selectedImage, setSelectedImage] = useState<PhotoGalleryItem | null>(
    null
  );
  const [photos, setPhotos] = useState<PhotoGalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch projects from API and extract images
    const fetchProjectImages = async () => {
      try {
        const response = await fetch("/api/projects");
        const data = await response.json();
        
        // Extract images from projects
        const projectPhotos: PhotoGalleryItem[] = data.map((project: { id?: string; slug?: string; image?: string; thumbnail?: string; cover?: string; title?: string; name?: string }) => ({
          id: project.id || project.slug || "",
          src: project.image || project.thumbnail || project.cover || "",
          title: project.title || project.name || "Untitled",
        })).filter((photo: PhotoGalleryItem) => photo.src); // Only include projects with images
        
        setPhotos(projectPhotos);
      } catch (error) {
        console.error("Failed to fetch project images:", error);
        // Fallback to empty array
        setPhotos([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjectImages();
  }, []);

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      {/* Toolbar */}
      <div className="bg-gray-100 dark:bg-gray-800 p-3 border-b border-gray-300 dark:border-gray-700 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
            <Grid3x3 size={16} />
          </button>
          <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
            <ImageIcon size={16} />
          </button>
        </div>
        <div className="flex-1 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
          All Photos ({photos.length})
        </div>
      </div>

      {/* Photo Grid */}
      <div className="flex-1 overflow-auto p-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
          </div>
        ) : photos.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            No photos available
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="aspect-square rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800 cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
                onClick={() => setSelectedImage(photo)}
              >
                <Image
                  src={photo.src}
                  alt={photo.title}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-8"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <Image
              src={selectedImage.src}
              alt={selectedImage.title}
              width={1200}
              height={800}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <p className="text-white text-center mt-4 text-lg">
              {selectedImage.title}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
