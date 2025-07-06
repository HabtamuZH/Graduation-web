import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button.jsx";
import { Heart, Sparkles, Gift } from "lucide-react";
import { motion } from "framer-motion";
import Burte1 from "../assets/images/Burte1.jpg";
import Burte2 from "../assets/images/Burte2.jpg";
import Burte3 from "../assets/images/Burte3.jpg";

const backgroundImages = [Burte1, Burte2, Burte3];

const Header = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ff69b4", "#ff1493", "#ffd700", "#ff6347", "#9370db"],
    });
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  useEffect(() => {
    setTimeout(triggerConfetti, 1000);
    const interval = setInterval(() => {
      setCurrentBgIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative text-white py-8 px-4 text-center overflow-hidden rounded-3xl shadow-2xl"
      style={{
        backgroundImage: `url(${backgroundImages[currentBgIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 1s ease-in-out",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-40 z-0" />
      <div className="absolute inset-0 opacity-20 z-10">
        <div className="absolute top-5 left-5 animate-bounce">
          <Sparkles size={24} className="text-yellow-300 drop-shadow" />
        </div>
        <div className="absolute top-10 right-10 animate-pulse">
          <Heart size={20} className="text-red-300 drop-shadow" />
        </div>
        <div className="absolute bottom-5 left-10 animate-spin">
          <Gift size={16} className="text-blue-300 drop-shadow" />
        </div>
      </div>

      <div className="relative z-20">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 animate-pulse drop-shadow-lg font-[Dancing Script]">
          🎉 Happy 18th, Burte! 💖
        </h1>
        <p className="text-lg md:text-xl text-pink-100 drop-shadow mb-4">
          A New Chapter Begins, My Love! ✨
        </p>
        <Button
          onClick={triggerConfetti}
          className="bg-yellow-400 hover:bg-yellow-500 text-purple-800 font-bold py-2 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
          onMouseEnter={() => confetti({ particleCount: 30, spread: 40 })}
        >
          🎊 Celebrate! 🎊
        </Button>
      </div>

      <div className="absolute inset-0 pointer-events-none z-10">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`absolute animate-float-${
              (i % 3) + 1
            } text-red-300 opacity-60`}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              fontSize: `${Math.random() * 20 + 12}px`,
              filter: "drop-shadow(0 0 6px rgba(255, 105, 180, 0.8))",
            }}
          >
            💖
          </div>
        ))}
      </div>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap");
        header {
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
            opacity: 0.6;
          }
          50% {
            transform: translateY(-80px);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-160px);
            opacity: 0;
          }
        }
        @keyframes float-2 {
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
        @keyframes float-3 {
          0% {
            transform: translateY(0);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-100px);
            opacity: 0.6;
          }
          100% {
            transform: translateY(-200px);
            opacity: 0;
          }
        }
      `}</style>
    </motion.header>
  );
};

export default Header;
