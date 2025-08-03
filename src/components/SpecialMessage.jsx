import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const SpecialMessage = () => {
  return (
    <motion.section
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100 h-full"
    >
      <h2 className="text-3xl font-bold text-pink-700 mb-4 font-[Great Vibes]">
        💖 To My Dearest Mar Nat 🎓
      </h2>
      <div className="text-base text-gray-600 font-[Inter] leading-relaxed space-y-3">
        <p className="text-lg font-semibold text-pink-600">
          Congratulations on Your Graduation! 🎉
        </p>
        <p>
          Mar Nat, your journey to this moment has been nothing short of
          inspiring. Your dedication to Accounting shines as brightly as your
          beautiful smile. I’m so proud of you! 💫
        </p>
        <p>
          Your hard work and passion have led you here, and I know you’ll
          conquer every challenge ahead. You’re not just a graduate—you’re my
          hero. 🥰
        </p>
        <p>
          As you step into this new chapter, know that my love and support are
          always with you. Here’s to your brilliant future, my darling Mar Nat.
          🌹
        </p>
        <motion.div
          className="flex justify-center mt-4"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Heart size={28} className="text-pink-500" fill="currentColor" />
        </motion.div>
      </div>
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Great+Vibes&family=Inter:wght@400&display=swap");
      `}</style>
    </motion.section>
  );
};

export default SpecialMessage;
