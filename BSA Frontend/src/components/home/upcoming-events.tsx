"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef } from "react";

interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  category: string;
}

const upcomingEvents: Event[] = [
  {
    id: "1",
    title: "Rakshabandhan Special Collection Launch",
    description:
      "Ahmedabad jeweller's honest take on the best gold gifts for Rakshabandhan 2026. From name pendants to gold coins to matching brother-sister sets, BIS hallmarked, starting under Rs 10,000.",
    image: "https://images.unsplash.com/photo-1552821206-86bf87c8f30f?w=600&h=400&fit=crop",
    date: "11/07/2026",
    category: "Collection Launch",
  },
  {
    id: "2",
    title: "Father's Day Gift 2026",
    description:
      "Your Dad has been wearing the same Kada for 15 Years. Here's the uncomfortable truth nobody says out loud: most fathers in India own exactly one piece of gold jewellery.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=400&fit=crop",
    date: "18/06/2026",
    category: "Gift Guide",
  },
  {
    id: "3",
    title: "Gold Making Charges Drop to Just 9%",
    description:
      "There is a cost involved in the activity that most people pay without fully understanding what it is. It's called making charges. And on June 9th, Satva Gold is doing something big.",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=400&fit=crop",
    date: "09/06/2026",
    category: "Special Offer",
  },
  {
    id: "4",
    title: "Celebrating 10 Years of Trust with Flat 9%",
    description:
      "Satva Gold marks its 10th anniversary on June 9th with an exclusive offer. Flat 9% making charges on all gold jewellery at our C.G. Road showroom, Ahmedabad.",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=400&fit=crop",
    date: "01/06/2026",
    category: "Anniversary",
  },
];

export function UpcomingEvents() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#17120e]">
            Upcoming <span className="text-[#c9a24a]">Events</span>
          </h2>

          {/* Navigation Arrows */}
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="p-2 rounded-lg border border-[#c9a24a]/30 hover:bg-[#c9a24a]/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-[#c9a24a]" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="p-2 rounded-lg border border-[#c9a24a]/30 hover:bg-[#c9a24a]/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-[#c9a24a]" />
            </button>
          </div>
        </div>

        {/* Events Carousel */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:overflow-x-visible md:grid md:grid-cols-1 lg:grid-cols-2"
        >
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="flex-shrink-0 w-full md:w-auto bg-white border border-[#c9a24a]/10 rounded-lg overflow-hidden hover:shadow-xl hover:shadow-[#c9a24a]/20 transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Event Image */}
              <div className="relative h-48 md:h-56 w-full bg-gray-200 overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 bg-[#c9a24a] text-white text-xs font-semibold rounded-full">
                    {event.category}
                  </span>
                </div>
              </div>

              {/* Event Content */}
              <div className="p-6">
                {/* Date */}
                <p className="text-sm text-[#6b6058] mb-3">
                  Post On: <span className="font-semibold text-[#17120e]">{event.date}</span>
                </p>

                {/* Title */}
                <h3 className="text-lg font-bold text-[#17120e] mb-3 line-clamp-2">
                  {event.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#6b6058] line-clamp-3 mb-4">
                  {event.description}
                </p>

                {/* Read More Link */}
                <button className="text-[#c9a24a] font-semibold text-sm hover:text-[#b89438] transition-colors flex items-center gap-2">
                  Learn More
                  <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
