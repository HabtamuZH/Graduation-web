import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button.jsx";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import graduationHeaderBg from "../assets/images/graduation-header-bg.jpeg";

const Header = () => {
  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#f8c8dc", "#e6e6fa", "#ffd700", "#f4f4f4"],
    });
  };

  useEffect(() => {
    triggerConfetti(); // Single confetti burst on load
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative text-white py-12 px-6 text-center rounded-2xl shadow-lg overflow-hidden"
      style={{
        backgroundImage: `url(${graduationHeaderBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/30 to-purple-500/30 z-0" />
      <div className="relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 font-[Great Vibes] text-pink-100 drop-shadow-md">
          🎓 Mar Nat, Our Star! 🎉
        </h1>
        <p className="text-lg md:text-xl text-gray-100 font-[Inter] mb-6">
          Your Accounting Journey Shines Bright! ✨
        </p>
        <Button
          onClick={triggerConfetti}
          className="bg-pink-200 hover:bg-pink-300 text-purple-800 font-semibold py-2 px-6 rounded-full shadow-md transition-transform hover:scale-105"
        >
          Celebrate Mar Nat! 🎊
        </Button>
        <div className="absolute top-4 right-4">
          <Heart size={24} className="text-pink-300 animate-pulse" />
        </div>
      </div>
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Great+Vibes&family=Inter:wght@400&display=swap");
      `}</style>
    </motion.header>
  );
};

export default Header;
