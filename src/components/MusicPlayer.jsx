import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Music,
} from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import music2 from "../assets/music/music2.mp3";

const MusicPlayer = () => {
  const playlist = [
    {
      src: music2,
      title: "Mar Nat’s Celebration",
      artist: "Special Collection",
    },
    // { src: music2, title: "Love & Triumph", artist: "Special Collection" },
  ];

  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [autoplayError, setAutoplayError] = useState(false);
  const audioRef = useRef(null);

  // Update audio volume when volume or isMuted changes
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Initialize audio and attempt autoplay
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = isMuted ? 0 : volume;
      audio.play().catch((err) => {
        console.error("Autoplay error:", err);
        setAutoplayError(true);
        setIsPlaying(false);
      });
    }
  }, []);

  // Handle audio events and track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateTime = () => setCurrentTime(audio.currentTime);
      const updateDuration = () => setDuration(audio.duration);
      const handleEnded = () =>
        setCurrentTrack((prev) => (prev + 1) % playlist.length);

      audio.addEventListener("timeupdate", updateTime);
      audio.addEventListener("loadedmetadata", updateDuration);
      audio.addEventListener("ended", handleEnded);

      // Play new track when currentTrack changes
      if (isPlaying && !autoplayError) {
        audio.play().catch((err) => {
          console.error("Playback error:", err);
          setAutoplayError(true);
          setIsPlaying(false);
        });
      }

      return () => {
        audio.removeEventListener("timeupdate", updateTime);
        audio.removeEventListener("loadedmetadata", updateDuration);
        audio.removeEventListener("ended", handleEnded);
      };
    }
  }, [currentTrack, isPlaying, autoplayError]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setAutoplayError(false);
        })
        .catch((err) => {
          console.error("Playback error:", err);
          setAutoplayError(true);
        });
    }
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
    setIsPlaying(true);
    setAutoplayError(false);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
    setAutoplayError(false);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (isMuted && newVolume > 0) {
      setIsMuted(false); // Unmute if volume is adjusted
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 h-full"
    >
      <div className="bg-gradient-to-r from-pink-400 to-purple-400 text-white p-4 text-center">
        <Music size={32} className="mx-auto mb-2 text-cream-100" />
        <h3 className="text-lg font-semibold text-cream-100 font-[Inter]">
          {playlist[currentTrack].title}
        </h3>
        <p className="text-sm text-cream-200 font-[Inter]">
          {playlist[currentTrack].artist}
        </p>
      </div>

      <audio ref={audioRef} src={playlist[currentTrack].src} />

      {autoplayError && (
        <div className="text-center p-4 bg-cream-50 rounded-md mx-4 mb-4">
          <p className="text-sm text-pink-700 mb-2 font-[Inter]">
            🎵 Start Mar Nat’s celebration music! 🎉
          </p>
          <Button
            onClick={togglePlay}
            className="bg-pink-400 hover:bg-pink-500 text-white rounded-full py-2 px-6 font-[Inter]"
            aria-label="Start music playback"
          >
            Play Music 🎊
          </Button>
        </div>
      )}

      <div className="p-4 bg-gray-50">
        <div className="mb-3 relative">
          <div
            className="w-full h-1 bg-gray-200 rounded-full cursor-pointer"
            onClick={handleSeek}
          >
            <div
              className="h-full bg-pink-400 rounded-full"
              style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 font-[Inter] mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-3 mb-4">
          <Button
            onClick={prevTrack}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full p-2"
            aria-label="Previous track"
          >
            <SkipBack size={16} />
          </Button>
          <Button
            onClick={togglePlay}
            className="bg-pink-400 hover:bg-pink-500 text-white rounded-full p-3"
            aria-label={isPlaying ? "Pause music" : "Play music"}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </Button>
          <Button
            onClick={nextTrack}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full p-2"
            aria-label="Next track"
          >
            <SkipForward size={16} />
          </Button>
          <Button
            onClick={toggleMute}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full p-2"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </Button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-20 accent-pink-400 cursor-pointer"
            aria-label="Volume control"
          />
        </div>

        <div className="mt-4 bg-white rounded-md p-3 max-h-40 overflow-y-auto scrollbar-thin">
          {playlist.map((track, index) => (
            <button
              key={index}
              onClick={() => setCurrentTrack(index)}
              className={`w-full text-left p-2 rounded transition-all ${
                index === currentTrack
                  ? "bg-pink-100 text-pink-700"
                  : "bg-white hover:bg-gray-50"
              }`}
              aria-label={`Play ${track.title} by ${track.artist}`}
            >
              <div className="text-sm font-[Inter]">{track.title}</div>
              <div className="text-xs text-gray-500 font-[Inter]">
                {track.artist}
              </div>
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap");
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: #f8c8dc #f4f4f4;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f4f4f4;
          border-radius: 2px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #f8c8dc;
          border-radius: 2px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #f4a8c0;
        }
      `}</style>
    </motion.section>
  );
};

export default MusicPlayer;
