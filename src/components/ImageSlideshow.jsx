import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { motion } from "framer-motion";
import graduation1 from "../assets/images/graduation1.jpg";
import graduation2 from "../assets/images/graduation2.jpg";
import graduation3 from "../assets/images/graduation3.jpg";
import Marnat1 from "../assets/images/Marnat1.jpg";
import Marnat2 from "../assets/images/Marnat2.jpg";
import Marnat3 from "../assets/images/Marnat3.jpg";
import Marnat4 from "../assets/images/Marnat4.jpg";
import Marnat5 from "../assets/images/Marnat5.jpg";

const ImageSlideshow = () => {
  const images = [
    { src: Marnat2, caption: "Radiating Happiness and Pride 🌟" },
    { src: graduation1, caption: "Mar Nat’s Brilliant Journey ✨" },
    { src: Marnat1, caption: "Mar Nat’s Joyful Moments 🎉" },
    { src: graduation2, caption: "Celebrating Your Success 🎓" },
    { src: Marnat3, caption: "Cherishing Memories Together ❤️" },
    { src: graduation3, caption: "Future Star of Accounting 💫" },
    { src: Marnat4, caption: "Mar Nat’s Unforgettable Smile 😊" },
    { src: Marnat5, caption: "A Journey of Love and Achievement 💖" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (isAutoPlay) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
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
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 h-full"
    >
      <div className="relative h-80 md:h-96">
        <motion.img
          key={currentIndex}
          src={images[currentIndex].src}
          alt={images[currentIndex].caption}
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
          <p className="text-white text-base font-[Inter] text-center">
            {images[currentIndex].caption}
          </p>
        </div>
        <Button
          onClick={goToPrevious}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 rounded-full p-2"
          size="sm"
        >
          <ChevronLeft size={20} />
        </Button>
        <Button
          onClick={goToNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 rounded-full p-2"
          size="sm"
        >
          <ChevronRight size={20} />
        </Button>
      </div>
      <div className="p-4 bg-gray-50">
        <div className="flex justify-center space-x-2 mb-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-10 h-10 rounded-md overflow-hidden border transition-all duration-200 ${
                index === currentIndex
                  ? "border-pink-400 scale-105"
                  : "border-gray-200 hover:border-pink-300"
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
        <Button
          onClick={() => setIsAutoPlay(!isAutoPlay)}
          className={`${
            isAutoPlay
              ? "bg-pink-400 hover:bg-pink-500"
              : "bg-gray-300 hover:bg-gray-400"
          } text-white px-4 py-1 rounded-full font-[Inter]`}
        >
          {isAutoPlay ? "⏸ Pause" : "▶ Play"}
        </Button>
      </div>
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap");
      `}</style>
    </motion.section>
  );
};

export default ImageSlideshow;
