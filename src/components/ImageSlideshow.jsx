import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { motion } from "framer-motion";
import Burte1 from "../assets/images/Burte1.jpg";
import Burte2 from "../assets/images/Burte2.jpg";
import Burte3 from "../assets/images/Burte3.jpg";
import confetti from "canvas-confetti";

const ImageSlideshow = () => {
  const images = [
    { src: Burte1, caption: "Burte’s Radiant Smile ✨" },
    { src: Burte2, caption: "Moments of Joy 😊" },
    { src: Burte3, caption: "Shining Bright 💫" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (isAutoPlay) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
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
    <motion.section
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-purple-200 h-full"
    >
      <div className="relative h-80 md:h-96 overflow-hidden">
        <motion.img
          key={currentIndex}
          src={images[currentIndex].src}
          alt={images[currentIndex].caption}
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <p className="text-white text-lg font-semibold text-center drop-shadow">
            {images[currentIndex].caption}
          </p>
        </div>
        <Button
          onClick={goToPrevious}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-purple-800 rounded-full p-2 shadow"
          size="sm"
          onMouseEnter={() => confetti({ particleCount: 20, spread: 30 })}
        >
          <ChevronLeft size={20} />
        </Button>
        <Button
          onClick={goToNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-purple-800 rounded-full p-2 shadow"
          size="sm"
          onMouseEnter={() => confetti({ particleCount: 20, spread: 30 })}
        >
          <ChevronRight size={20} />
        </Button>
        <div className="absolute top-2 right-2">
          <Heart className="text-red-500 animate-pulse" size={24} fill="currentColor" />
        </div>
      </div>
      <div className="p-4 bg-gradient-to-r from-purple-100 to-pink-100">
        <div className="flex justify-center space-x-2 mb-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                index === currentIndex ? "border-purple-500 scale-110" : "border-white hover:border-purple-300"
              }`}
            >
              <img src={image.src} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
        <Button
          onClick={() => setIsAutoPlay(!isAutoPlay)}
          className={`${isAutoPlay ? "bg-purple-500 hover:bg-purple-600" : "bg-gray-400 hover:bg-gray-500"} text-white px-4 py-1 rounded-full`}
          onMouseEnter={() => confetti({ particleCount: 20, spread: 30 })}
        >
          {isAutoPlay ? "⏸️ Pause" : "▶️ Play"}
        </Button>
      </div>
    </motion.section>
  );
};

export default ImageSlideshow;