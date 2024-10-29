import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface EstablishmentHeaderProps {
  images: string[];
  name: string;
  description: string;
}

export function EstablishmentHeader({ images, name, description }: EstablishmentHeaderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [images.length]);

  const previousSlide = () => {
    setCurrentIndex((current) => (current === 0 ? images.length - 1 : current - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((current) => (current + 1) % images.length);
  };

  return (
    <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-opacity duration-700",
            index === currentIndex ? "opacity-100" : "opacity-0"
          )}
        >
          <img
            src={image}
            alt={`${name} - Image ${index + 1}`}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
      ))}

      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 text-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-2">
          {name}
        </h1>
        <p className="text-lg sm:text-xl text-white/90 max-w-2xl">
          {description}
        </p>
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={previousSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}
    </div>
  );
}