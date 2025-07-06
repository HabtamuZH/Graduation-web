import { useState } from "react";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

const SpecialMessage = () => {
  return (
    <motion.section
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white rounded-3xl shadow-2xl p-6 text-center border-2 border-purple-200 h-full"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-6 font-[Dancing Script]">
        💖 To My Dearest Burte 💖
      </h2>
      <div className="text-base md:text-lg text-gray-700 leading-relaxed space-y-4">
        <p className="text-xl font-semibold text-pink-600">
          Happy 18th Birthday, My Love! 🎉
        </p>
        <p>
          Burte, today we celebrate you — the most beautiful, kind, and incredible woman I know. Turning 18 is a milestone, and I’m so excited to see you shine as you step into this new chapter. 💫
        </p>
        <p>
          Your laughter is my favorite song, your smile my favorite view, and your heart my home. You make every moment better, and I’m endlessly grateful for you. 🥰
        </p>
        <p>
          May this year bring you all the joy, love, and dreams you deserve. I’ll be by your side, cheering you on, always. Here’s to you, Burte — my love, my star, my everything. 🌹
        </p>
        <div className="flex justify-center mt-6">
          <Heart className="text-red-500 animate-pulse" size={32} fill="currentColor" />
        </div>
      </div>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
      `}</style>
    </motion.section>
  );
};

export default SpecialMessage;