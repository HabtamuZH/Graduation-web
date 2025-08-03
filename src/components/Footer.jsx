import { Heart, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-cream-50 py-8 px-4 text-center relative">
      <div className="max-w-4xl mx-auto">
        {/* Main footer content */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {/* Congratulatory message */}
          <div>
            <h3 className="text-2xl font-bold text-pink-700 mb-3 font-[Great Vibes] flex items-center justify-center">
              <Sparkles className="mr-2 text-gold-400" size={20} />
              Congratulations, Mar Nat!
            </h3>
            <p className="text-gray-600 font-[Inter] leading-relaxed">
              Your Accounting degree is a testament to your brilliance and hard
              work. Here’s to a future filled with success and joy! 🎓
            </p>
          </div>

          {/* Why Mar Nat Shines */}
          <div>
            <h3 className="text-2xl font-bold text-pink-700 mb-3 font-[Great Vibes] flex items-center justify-center">
              <Heart
                className="mr-2 text-pink-500"
                size={20}
                fill="currentColor"
              />
              You Shine Bright
            </h3>
            <div className="text-gray-600 font-[Inter] space-y-1">
              <p>✨ Inspiring determination</p>
              <p>🌟 Exceptional talent</p>
              <p>💖 Heart of gold</p>
              <p>🎓 Future CPA star</p>
            </div>
          </div>

          {/* Fun Graduation Facts */}
          <div>
            <h3 className="text-2xl font-bold text-pink-700 mb-3 font-[Great Vibes] flex items-center justify-center">
              <Sparkles className="mr-2 text-gold-400" size={20} />
              Graduation Highlights
            </h3>
            <div className="text-gray-600 font-[Inter] space-y-1">
              <p>🎓 Mastered Accounting!</p>
              <p>📊 Ready to lead!</p>
              <p>💼 Career awaits!</p>
              <p>🌟 Endless possibilities!</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-6"></div>

        {/* Quote */}
        <blockquote className="text-lg font-semibold text-pink-600 italic font-[Inter] mb-6">
          “Your graduation is just the beginning of your incredible journey, Mar
          Nat!”
        </blockquote>

        {/* Dedication */}
        <div className="flex justify-center items-center gap-3 mb-4">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Heart className="text-pink-500" size={20} fill="currentColor" />
          </motion.div>
          <p className="text-gray-600 font-[Inter]">
            Made with love for Mar Nat’s graduation
          </p>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            <Heart className="text-pink-500" size={20} fill="currentColor" />
          </motion.div>
        </div>

        <p className="text-sm text-gray-500 font-[Inter]">
          © {currentYear} • A Gift for Mar Nat’s Accounting Triumph
        </p>
      </div>

      {/* Subtle decorative element */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute bottom-4 right-4 text-pink-300 opacity-20"
          animate={{ rotate: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🎓
        </motion.div>
      </div>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Great+Vibes&family=Inter:wght@400;600&display=swap");
        .bg-cream-50 {
          background-color: #f4f4f4;
        }
        .text-pink-700 {
          color: #c084fc;
        }
        .text-pink-500 {
          color: #f8c8dc;
        }
        .text-gold-400 {
          color: #ffd700;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
