import { useEffect } from "react";
import confetti from "canvas-confetti";
import Header from "./components/Header";
import ImageSlideshow from "./components/ImageSlideshow";
import MusicPlayer from "./components/MusicPlayer";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  useEffect(() => {
    // Welcome confetti burst
    const timer = setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 60,
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
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header Section */}
      <Header />

      {/* Main Content */}
      <main>
        <div className="flex md:flex-row flex-col items-center justify-center py-16 px-4">
          {/* Image Slideshow Section */}
          <ImageSlideshow />
          {/* Music Player Section */}
          <MusicPlayer />
        </div>

        {/* Birthday Message Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-purple-800 mb-8">
              💖 A Special Message for My Love, Burte 💖
            </h2>
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
              <div className="text-lg md:text-xl text-gray-700 leading-relaxed space-y-6">
                <p className="text-2xl font-semibold text-purple-600 mb-6">
                  Happy 18th Birthday, My Beautiful Girl! 🎉🎂
                </p>

                <p>
                  Today isn’t just a birthday — it’s a celebration of you
                  stepping into a new chapter of life with grace, strength, and
                  so much promise. You’re now 18 — officially an adult — but to
                  me, you’ll always be the sweet, shining soul who stole my
                  heart. 💕
                </p>

                <p>
                  Your smile lights up every moment we share. Your kindness
                  makes the world a softer place, and your strength reminds me
                  every day how lucky I am to have you. I believe in you more
                  than words can say — your future is filled with magic, dreams,
                  and so much beauty. ✨
                </p>

                <p>
                  As you grow into the amazing woman you're meant to be, know
                  that I’ll always be here, cheering for you, supporting you,
                  and loving you more each day. 🥰 May today bring you joy,
                </p>
                <p>
                  surprises, and everything you love — because you truly deserve
                  it all.
                </p>
                <div className="text-3xl font-bold text-pink-600 mt-8">
                  Happy 18th, my love. Here’s to your dreams, your journey, and
                  to us. 🌹💫
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <Footer />

      {/* Floating birthday elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute text-4xl animate-float-slow opacity-30`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          >
            {["🎈", "🎂", "🎁", "✨", "🌟", "💖", "🎊", "🦋"][i]}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
