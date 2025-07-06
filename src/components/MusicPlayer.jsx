import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Music,
  Shuffle,
} from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import music1 from "../assets/music/music1.mp3";
import music2 from "../assets/music/music2.mp3";
import music0 from "../assets/music/02DawitTsige-YegleNesh(@ETHIOALBUMSONTELEGRAM).mp3";
import music_1 from "../assets/music/8.Swedlat.mp3";
import music_2 from "../assets/music/Dawit-Tsige-Dar-Dar-ዳር-ዳር-Live-Studio-Performance.m4a";
import music_3 from "../assets/music/Tegereda - Antene Worqu.m4a";
import music_4 from "../assets/music/Web Aynama - Antene Worqu.m4a";

const MusicPlayer = () => {
  const playlist = [
    {
      src: music1,
      title: "Burte’s Birthday Jam",
      artist: "Special Collection",
    },
    { src: music2, title: "Love & Celebration", artist: "Special Collection" },
    { src: music0, title: "Yegle Nesh", artist: "Dawit Tsige" },
    { src: music_1, title: "Swedlat Vibes", artist: "Madingo" },
    { src: music_2, title: "Dar Dar Love", artist: "Dawit Tsige" },
    { src: music_3, title: "Antene Worqu", artist: "Tegereda" },
    { src: music_4, title: "Web Aynama", artist: "Antene Worqu" },
  ];

  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0); // Start muted for autoplay
  const [targetVolume, setTargetVolume] = useState(0.7); // Target volume after fade-in
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [shuffledPlaylist, setShuffledPlaylist] = useState(playlist);
  const [autoplayError, setAutoplayError] = useState(false);
  const audioRef = useRef(null);

  // Auto-play on mount with muted audio
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0; // Start muted
      setIsPlaying(true);
      audio
        .play()
        .then(() => {
          // Fade in volume over 2 seconds
          const fadeIn = setInterval(() => {
            setVolume((prev) => {
              const newVolume = Math.min(prev + 0.05, targetVolume);
              audio.volume = isMuted ? 0 : newVolume;
              if (newVolume >= targetVolume) clearInterval(fadeIn);
              return newVolume;
            });
          }, 100);
        })
        .catch((err) => {
          console.error("Autoplay error:", err);
          setAutoplayError(true);
          setIsPlaying(false);
          setVolume(targetVolume); // Reset volume if autoplay fails
        });
    }
  }, []);

  // Volume and mute control
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateTime = () => setCurrentTime(audio.currentTime);
      const updateDuration = () => setDuration(audio.duration);
      const handleEnded = () => nextTrack();

      audio.addEventListener("timeupdate", updateTime);
      audio.addEventListener("loadedmetadata", updateDuration);
      audio.addEventListener("ended", handleEnded);

      return () => {
        audio.removeEventListener("timeupdate", updateTime);
        audio.removeEventListener("loadedmetadata", updateDuration);
        audio.removeEventListener("ended", handleEnded);
      };
    }
  }, [currentTrack]);

  // Play on track change
  useEffect(() => {
    if (isPlaying && !autoplayError) {
      audioRef.current?.play().catch((err) => {
        console.error("Playback error:", err);
        setAutoplayError(true);
        setIsPlaying(false);
      });
    }
  }, [currentTrack]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio
        .play()
        .then(() => {
          setAutoplayError(false); // Clear error on successful manual play
        })
        .catch((err) => {
          console.error("Playback error:", err);
          setAutoplayError(true);
        });
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % shuffledPlaylist.length);
    setIsPlaying(true);
    setAutoplayError(false); // Reset error on track change
  };

  const prevTrack = () => {
    setCurrentTrack(
      (prev) => (prev - 1 + shuffledPlaylist.length) % shuffledPlaylist.length
    );
    setIsPlaying(true);
    setAutoplayError(false);
  };

  const selectTrack = (index) => {
    setCurrentTrack(index);
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
    setIsMuted(!isMuted);
  };

  const shufflePlaylist = () => {
    if (!isShuffled) {
      const shuffled = [...playlist].sort(() => Math.random() - 0.5);
      setShuffledPlaylist(shuffled);
      setCurrentTrack(0);
      setIsShuffled(true);
    } else {
      setShuffledPlaylist(playlist);
      setCurrentTrack(0);
      setIsShuffled(false);
    }
    setIsPlaying(true);
    setAutoplayError(false);
  };

  return (
    <motion.section
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-purple-200 h-full"
    >
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 text-center relative">
        <Music
          size={40}
          className="mx-auto mb-2 animate-pulse text-yellow-200"
        />
        <h3 className="text-xl font-bold text-yellow-100 drop-shadow">
          {shuffledPlaylist[currentTrack].title}
        </h3>
        <p className="text-purple-100 drop-shadow">
          {shuffledPlaylist[currentTrack].artist}
        </p>
      </div>

      <audio ref={audioRef} src={shuffledPlaylist[currentTrack].src} />

      {autoplayError && (
        <div className="text-center p-4 bg-pink-100 rounded-lg mx-4 mb-4">
          <p className="text-sm text-pink-800 mb-2">
            🎉 Let’s get the party started! Click below to play Burte’s birthday
            music! 🎵
          </p>
          <Button
            onClick={togglePlay}
            className="bg-yellow-400 hover:bg-yellow-500 text-purple-800 font-bold py-2 px-6 rounded-full"
            onMouseEnter={() => confetti({ particleCount: 30, spread: 40 })}
            aria-label="Start music playback"
          >
            Start Music 🎊
          </Button>
        </div>
      )}

      <div className="p-6 bg-gradient-to-b from-white to-gray-50">
        <div className="mb-4 relative">
          <div
            className="w-full h-2 bg-gray-200 rounded-full cursor-pointer"
            onClick={handleSeek}
          >
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300"
              style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-600 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-4 mb-4">
          <Button
            onClick={shufflePlaylist}
            className={`${
              isShuffled ? "bg-yellow-400" : "bg-gray-300"
            } hover:bg-yellow-500 text-purple-900 rounded-full p-2`}
            onMouseEnter={() => confetti({ particleCount: 20, spread: 30 })}
            aria-label={isShuffled ? "Unshuffle playlist" : "Shuffle playlist"}
          >
            <Shuffle size={20} />
          </Button>
          <Button
            onClick={prevTrack}
            className="bg-purple-500 hover:bg-purple-600 text-white rounded-full p-2"
            onMouseEnter={() => confetti({ particleCount: 20, spread: 30 })}
            aria-label="Previous track"
          >
            <SkipBack size={20} />
          </Button>
          <Button
            onClick={togglePlay}
            className="bg-pink-500 hover:bg-pink-600 text-white rounded-full p-3"
            onMouseEnter={() => confetti({ particleCount: 20, spread: 30 })}
            aria-label={isPlaying ? "Pause music" : "Play music"}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </Button>
          <Button
            onClick={nextTrack}
            className="bg-purple-500 hover:bg-purple-600 text-white rounded-full p-2"
            onMouseEnter={() => confetti({ particleCount: 20, spread: 30 })}
            aria-label="Next track"
          >
            <SkipForward size={20} />
          </Button>
        </div>

        <div className="flex items-center justify-center space-x-3 mb-4">
          <Button
            onClick={toggleMute}
            className="bg-gray-500 hover:bg-gray-600 text-white rounded-full p-2"
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
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-24 accent-pink-500 cursor-pointer"
            aria-label="Volume control"
          />
        </div>

        <div className="bg-gray-50 rounded-xl p-4 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-gray-100">
          {shuffledPlaylist.map((track, index) => (
            <button
              key={index}
              onClick={() => selectTrack(index)}
              className={`w-full text-left p-2 rounded-lg transition-all duration-200 flex justify-between items-center ${
                index === currentTrack
                  ? "bg-purple-500 text-white shadow"
                  : "bg-white hover:bg-purple-100 text-gray-700"
              }`}
              aria-label={`Play ${track.title} by ${track.artist}`}
            >
              <div>
                <div className="text-sm font-medium">{track.title}</div>
                <div className="text-xs opacity-75">{track.artist}</div>
              </div>
              {index === currentTrack && (
                <Music size={16} className="animate-pulse" />
              )}
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: #c084fc #f3f4f6;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f3f4f6;
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #c084fc;
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #a855f7;
        }
      `}</style>
    </motion.section>
  );
};

export default MusicPlayer;
