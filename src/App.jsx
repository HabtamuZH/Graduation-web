import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Header from "./components/Header";
import MusicPlayer from "./components/MusicPlayer";
import ImageSlideshow from "./components/ImageSlideshow";
import SpecialMessage from "./components/SpecialMessage";
import Guestbook from "./components/Guestbook";
import "./App.css";
import Footer from "./components/Footer";

function App() {
  useEffect(() => {
    // Initial confetti burst
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.7 },
      colors: [
        "#ff69b4",
        "#ff1493",
        "#ffd700",
        "#ff6347",
        "#9370db",
        "#00bfff",
      ],
    });

    // Custom heart cursor
    document.body.style.cursor = `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' fill='%23ff69b4'/%3E%3C/svg%3E"), auto`;
  }, []);

  // Countdown to next birthday (July 6, 2026)
  const nextBirthday = new Date("2026-07-06T00:00:00");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = nextBirthday - now;
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Sparkle animation for top header
  const triggerSparkle = () => {
    confetti({
      particleCount: 50,
      spread: 40,
      origin: { y: 0.1 },
      shapes: ["star"],
      colors: ["#ffd700", "#ff69b4", "#9370db"],
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative overflow-hidden">
      {/* Top Header */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 text-white py-4 px-4 text-center shadow-lg"
        onMouseEnter={triggerSparkle}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-4">
          <Sparkles size={24} className="text-yellow-300 animate-pulse" />
          <h1 className="text-3xl md:text-5xl font-extrabold font-[Great Vibes] drop-shadow-lg">
            Happy 18th Birthday, Burte! 🎉
          </h1>
          <Sparkles size={24} className="text-yellow-300 animate-pulse" />
        </div>
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`absolute animate-float-${
                (i % 3) + 1
              } text-red-300 opacity-60`}
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.3}s`,
                fontSize: `${Math.random() * 16 + 12}px`,
                filter: "drop-shadow(0 0 6px rgba(255, 105, 180, 0.8))",
              }}
            >
              💖
            </div>
          ))}
        </div>
      </motion.header>

      {/* Parallax Background */}
      <div className="fixed inset-0 bg-[url('/assets/images/birthday-bg.jpg')] bg-cover bg-center opacity-10 z-0" />

      <main className="relative z-10 pt-24 md:pt-20">
        {/* Header and Music Player */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
            <Header />
            <MusicPlayer />
          </div>
        </section>

        {/* Image Slideshow and Special Message */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
            <ImageSlideshow />
            <SpecialMessage />
          </div>
        </section>

        {/* Countdown */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="py-12 px-4 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-6 font-[Dancing Script]">
            Countdown to Burte’s 19th Birthday! 🎉
          </h2>
          <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-md mx-auto">
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-pink-600">
                  {timeLeft.days}
                </p>
                <p className="text-sm text-gray-600">Days</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-pink-600">
                  {timeLeft.hours}
                </p>
                <p className="text-sm text-gray-600">Hours</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-pink-600">
                  {timeLeft.minutes}
                </p>
                <p className="text-sm text-gray-600">Minutes</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-pink-600">
                  {timeLeft.seconds}
                </p>
                <p className="text-sm text-gray-600">Seconds</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Guestbook */}
        <Guestbook />
      </main>

      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-5xl animate-float-slow opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          >
            {["🎈", "🎂", "🎁", "✨", "🌟", "💖", "🎊", "🦋"][i]}
          </div>
        ))}
      </div>
      {/* Footer */}
      <Footer/>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Poppins:wght@400;600&family=Great+Vibes&display=swap");
        body {
          font-family: "Poppins", sans-serif;
        }
        h1,
        h2,
        h3 {
          font-family: "Dancing Script", cursive;
        }
        .font-\[Great_Vibes\] {
          font-family: "Great Vibes", cursive;
        }
        @keyframes float-1 {
          0% {
            transform: translateY(0);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-60px);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-120px);
            opacity: 0;
          }
        }
        @keyframes float-2 {
          0% {
            transform: translateY(0);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-80px);
            opacity: 0.7;
          }
          100% {
            transform: translateY(-160px);
            opacity: 0;
          }
        }
        @keyframes float-3 {
          0% {
            transform: translateY(0);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-70px);
            opacity: 0.6;
          }
          100% {
            transform: translateY(-140px);
            opacity: 0;
          }
        }
        @keyframes float-slow {
          0% {
            transform: translateY(0);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-100px);
            opacity: 0.4;
          }
          100% {
            transform: translateY(-200px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
