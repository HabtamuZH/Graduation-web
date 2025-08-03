import { useEffect } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Header from "./components/Header";
import MusicPlayer from "./components/MusicPlayer";
import ImageSlideshow from "./components/ImageSlideshow";
import SpecialMessage from "./components/SpecialMessage";
import Guestbook from "./components/Guestbook";
import Footer from "./components/Footer";
import { useIsMobile } from "./hooks/use-mobile";
import "./App.css";

function App() {
  const isMobile = useIsMobile();

  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#f8c8dc", "#e6e6fa", "#ffd700", "#f4f4f4"],
    });
  }, []);

  const triggerSparkle = () => {
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.1 },
      shapes: ["star"],
      colors: ["#ffd700", "#f8c8dc", "#e6e6fa"],
    });
  };

  return (
    <div className="min-h-screen bg-cream-50 relative">
      {/* Top Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-pink-400 to-purple-400 text-white py-4 px-4 shadow-md"
        onMouseEnter={triggerSparkle}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-3">
          <Sparkles
            size={isMobile ? 20 : 24}
            className="text-gold-400 animate-pulse"
          />
          <h1
            className={`font-[Great Vibes] text-cream-100 drop-shadow-md ${
              isMobile ? "text-3xl" : "text-5xl"
            }`}
          >
            Mar Nat’s Graduation 🎓
          </h1>
          <Sparkles
            size={isMobile ? 20 : 24}
            className="text-gold-400 animate-pulse"
          />
        </div>
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-200 opacity-20"
            animate={{ rotate: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🎉
          </motion.div>
          <motion.div
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-pink-200 opacity-20"
            animate={{ rotate: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          >
            🎓
          </motion.div>
        </div>
      </motion.header>

      <main className="relative z-10 pt-20 md:pt-24">
        <section className="py-8 px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
            <Header />
            <MusicPlayer />
          </div>
        </section>

        <section className="py-8 px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
            <ImageSlideshow />
            <SpecialMessage />
          </div>
        </section>

        <Guestbook />
      </main>

      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="absolute text-4xl animate-float-slow opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          >
            {["🎓", "💖"][i]}
          </div>
        ))}
      </div>

      <Footer />

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Great+Vibes&family=Inter:wght@400;600&display=swap");
        body {
          font-family: "Inter", sans-serif;
        }
        h1,
        h2,
        h3 {
          font-family: "Great Vibes", cursive;
        }
        .bg-cream-50 {
          background-color: #f4f4f4;
        }
        .text-cream-100 {
          color: #f4f4f4;
        }
        .text-pink-200 {
          color: #f8c8dc;
        }
        .text-gold-400 {
          color: #ffd700;
        }
        @keyframes float-slow {
          0% {
            transform: translateY(0);
            opacity: 0.1;
          }
          50% {
            transform: translateY(-80px);
            opacity: 0.2;
          }
          100% {
            transform: translateY(-160px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
