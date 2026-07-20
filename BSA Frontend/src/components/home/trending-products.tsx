"use client";

import { useState } from "react";
import { ProductCard } from "./product-card";

const sampleProducts = [
  {
    id: "1",
    name: "Gold Hexagon Link Necklace Set (1RN18-188 / ERR18-004)",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop",
    price: "₹45,000",
  },
  {
    id: "2",
    name: "Yellow Gold Jaguar Design Gents Ring (JRG22-2032)",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop",
    price: "₹35,000",
  },
  {
    id: "3",
    name: "Men's \"King\" Lion Face Ring (JRG22-2069)",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=500&h=500&fit=crop",
    price: "₹28,000",
  },
  {
    id: "4",
    name: "Nfinity Loop Designer Ring (VPJR18-257)",
    image: "https://images.unsplash.com/photo-1515562141207-6811bcb33eaf?w=500&h=500&fit=crop",
    price: "₹32,000",
  },
];

export function TrendingProducts() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const handleFavoriteToggle = (productId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="text-[#c9a24a]">Trending</span>{" "}
            <span className="text-[#17120e]">Products</span>
          </h2>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {sampleProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              isFavorite={favorites.has(product.id)}
              onFavoriteToggle={handleFavoriteToggle}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 border-2 border-[#c9a24a] text-[#c9a24a] font-semibold rounded-lg hover:bg-[#c9a24a] hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#c9a24a]/30 transform hover:scale-105">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
}
