import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button.jsx";
import { Heart, Sparkles, Gift } from "lucide-react";
// Import background images
import Burte1 from "../assets/images/Burte1.jpg";
import Burte2 from "../assets/images/Burte2.jpg";
import Burte3 from "../assets/images/Burte3.jpg";

// Array of background images from asset folder
const backgroundImages = [Burte1, Burte2, Burte3];

const Header = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Trigger confetti effect
  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#ff69b4", "#ff1493", "#ffd700", "#ff6347", "#9370db"],
    });
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  // Auto-trigger confetti on load
  useEffect(() => {
    setTimeout(triggerConfetti, 1000);
  }, []);

  // Cycle background images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, 5000); // Change every 5 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <header
      className="relative text-white py-16 px-4 text-center overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImages[currentBgIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 1s ease-in-out", // Smooth fade transition
      }}
    >
      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-black opacity-30 z-0" />

      {/* Background decorations */}
      <div className="absolute inset-0 opacity-20 z-10">
        <div className="absolute top-10 left-10 animate-bounce">
          <Sparkles size={32} className="text-yellow-300 drop-shadow" />
        </div>
        <div className="absolute top-20 right-20 animate-pulse">
          <Heart size={28} className="text-red-300 drop-shadow" />
        </div>
        <div className="absolute bottom-10 left-20 animate-spin">
          <Gift size={24} className="text-blue-300 drop-shadow" />
        </div>
        <div className="absolute bottom-20 right-10 animate-bounce">
          <Sparkles size={36} className="text-green-300 drop-shadow" />
        </div>
      </div>

      <div className="relative z-20 max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-6xl md:text-8xl font-extrabold mb-4 animate-pulse drop-shadow-lg">
            🎉 HAPPY 18TH BIRTHDAY! My Love 💖 💖 💖🎉
          </h1>
          <div className="text-2xl md:text-4xl font-semibold mb-6 text-yellow-100 drop-shadow">
            Welcome to Adulthood! ✨
          </div>
        </div>

        <div className="mb-8">
          <p className="text-xl md:text-2xl mb-4 text-pink-100 drop-shadow">
            Today marks the beginning of an amazing new chapter in your life!
          </p>
          <p className="text-lg md:text-xl text-pink-200 drop-shadow">
            May this special day be filled with love, laughter, and
            unforgettable memories! 💕
          </p>
        </div>

        <Button
          onClick={triggerConfetti}
          className="bg-yellow-400 hover:bg-yellow-500 text-purple-800 font-bold py-3 px-8 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          🎊 Celebrate! 🎊
        </Button>
      </div>

      {/* Floating hearts animation */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute animate-float-${
              (i % 3) + 1
            } text-red-300 opacity-70`}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.4}s`,
              fontSize: `${Math.random() * 24 + 16}px`,
              filter: "drop-shadow(0 0 8px rgba(255, 105, 180, 0.8))",
            }}
          >
            💖
          </div>
        ))}
      </div>

      {/* CSS for smooth background transition */}
      <style jsx>{`
        header {
          position: relative;
          background-blend-mode: overlay;
        }
        header::before {
          content: "";
          position: absolute;
          inset: 0;
          background: inherit;
          opacity: 1;
          transition: opacity 1s ease-in-out;
        }
        header[style*="background-image"]::before {
          opacity: 0;
        }
        @keyframes float-1 {
          0% {
            transform: translateY(0);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-100px);
            opacity: 0.9;
          }
          100% {
            transform: translateY(-200px);
            opacity: 0;
          }
        }
        @keyframes float-2 {
          0% {
            transform: translateY(0);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-150px);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-300px);
            opacity: 0;
          }
        }
        @keyframes float-3 {
          0% {
            transform: translateY(0);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-120px);
            opacity: 0.7;
          }
          100% {
            transform: translateY(-240px);
            opacity: 0;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
