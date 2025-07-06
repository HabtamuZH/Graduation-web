import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";

// Import images
import Burte1 from "../assets/images/Burte1.jpg";
import Burte2 from "../assets/images/Burte2.jpg";
import Burte3 from "../assets/images/Burte3.jpg";

const ImageSlideshow = () => {
  const images = [
    { src: Burte1, caption: "Beautiful moments ✨" },
    { src: Burte2, caption: "Radiant smile 😊" },
    { src: Burte3, caption: "Stylish and confident 💫" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (isAutoPlay) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlay, images.length]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-purple-800 mb-4">
            Beautiful Memories 📸
          </h2>
          <p className="text-xl text-purple-600">
            Celebrating the amazing person you are! 💕
          </p>
        </div>

        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Main image display */}
          <div className="relative h-96 md:h-[500px] overflow-hidden">
            <img
              src={images[currentIndex].src}
              alt={images[currentIndex].caption}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />

            {/* Overlay with caption */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <p className="text-white text-xl font-semibold text-center">
                {images[currentIndex].caption}
              </p>
            </div>

            {/* Navigation arrows */}
            <Button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-purple-800 rounded-full p-2 shadow-lg"
              size="sm"
            >
              <ChevronLeft size={24} />
            </Button>

            <Button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-purple-800 rounded-full p-2 shadow-lg"
              size="sm"
            >
              <ChevronRight size={24} />
            </Button>

            {/* Floating hearts */}
            <div className="absolute top-4 right-4">
              <Heart
                className="text-red-500 animate-pulse"
                size={32}
                fill="currentColor"
              />
            </div>
          </div>

          {/* Thumbnail navigation */}
          <div className="p-6 bg-gradient-to-r from-purple-100 to-pink-100">
            <div className="flex justify-center space-x-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-4 transition-all duration-300 ${
                    index === currentIndex
                      ? "border-purple-500 scale-110 shadow-lg"
                      : "border-white hover:border-purple-300"
                  }`}
                >
                  <img
                    src={image.src}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Auto-play toggle */}
            <div className="text-center mt-6">
              <Button
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className={`${
                  isAutoPlay
                    ? "bg-purple-500 hover:bg-purple-600"
                    : "bg-gray-400 hover:bg-gray-500"
                } text-white px-6 py-2 rounded-full transition-colors duration-300`}
              >
                {isAutoPlay ? "⏸️ Pause Slideshow" : "▶️ Play Slideshow"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageSlideshow;
