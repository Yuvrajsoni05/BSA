"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  price?: string;
  isFavorite?: boolean;
  onFavoriteToggle?: (id: string) => void;
}

export function ProductCard({
  id,
  name,
  image,
  price,
  isFavorite = false,
  onFavoriteToggle,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="group relative">
      {/* Product Image Container */}
      <div
        className="relative h-64 md:h-80 bg-black rounded-lg overflow-hidden shadow-lg shadow-black/30 transition-all duration-300 transform group-hover:shadow-xl group-hover:shadow-[#c9a24a]/20"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Favorite Button */}
        <button
          onClick={() => onFavoriteToggle?.(id)}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#c9a24a] hover:bg-[#b89438] transition-colors shadow-lg"
          aria-label="Add to favorites"
        >
          <Heart
            className={`w-5 h-5 ${
              isFavorite
                ? "fill-white text-white"
                : "text-white"
            }`}
          />
        </button>

        {/* Overlay on Hover */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity">
            <button className="px-8 py-3 bg-[#c9a24a] text-[#17120e] font-semibold rounded-lg hover:bg-[#b89438] transition-colors">
              View Details
            </button>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="mt-4">
        <h3 className="text-sm md:text-base font-medium text-[#17120e] line-clamp-2 mb-1">
          {name}
        </h3>
        {price && (
          <p className="text-sm text-[#c9a24a] font-semibold">{price}</p>
        )}
      </div>
    </div>
  );
}
