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

// Import music files (adjust paths as needed)
import music1 from "../assets/music/music1.mp3";
import music2 from "../assets/music/music2.mp3";
import music0 from "../assets/music/02DawitTsige-YegleNesh(@ETHIOALBUMSONTELEGRAM).mp3";
import music_1 from "../assets/music/8.Swedlat.mp3";
import music_2 from "../assets/music/Dawit-Tsige-Dar-Dar-ዳር-ዳር-Live-Studio-Performance.m4a";
import music_3 from "../assets/music/Tegereda - Antene Worqu.m4a";
import music_4 from "../assets/music/Web Aynama - Antene Worqu.m4a";

const MusicPlayer = () => {
  const playlist = [
    { src: music1, title: "Birthday 1", artist: "Special Collection" },
    { src: music2, title: "Birthday 2", artist: "Special Collection" },
    { src: music0, title: "Love", artist: "Dawit-Tsige" },
    { src: music_1, title: "Love Vibes", artist: "Madingo" },
    { src: music_2, title: "Love Moments", artist: "Dawit-Tsige" },
    { src: music_3, title: "Cool Loves", artist: "Antene Worqu" },
    { src: music_4, title: "Web Aynama", artist: "Antene Worqu" },
  ];

  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [shuffledPlaylist, setShuffledPlaylist] = useState(playlist);

  const audioRef = useRef(null);

  // Volume control
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

  // Auto-play on track change
  useEffect(() => {
    if (isPlaying) {
      audioRef.current
        ?.play()
        .catch((err) => console.error("Playback error:", err));
    }
  }, [currentTrack]);

  // Play/pause toggle
  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((err) => console.error("Playback error:", err));
    }
    setIsPlaying(!isPlaying);
  };

  // Next track
  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % shuffledPlaylist.length);
    setIsPlaying(true);
  };

  // Previous track
  const prevTrack = () => {
    setCurrentTrack(
      (prev) => (prev - 1 + shuffledPlaylist.length) % shuffledPlaylist.length
    );
    setIsPlaying(true);
  };

  // Select specific track
  const selectTrack = (index) => {
    setCurrentTrack(index);
    setIsPlaying(true);
  };

  // Seek track
  const handleSeek = (e) => {
    const audio = audioRef.current;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Format time display
  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Toggle mute
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Shuffle playlist
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
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-pink-100 via-purple-100 to-indigo-100">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-purple-900 mb-4 animate-bounce">
            🎵 Birthday Party Playlist 🎵
          </h2>
          <p className="text-xl text-purple-700 drop-shadow">
            Groove to these special tracks for an unforgettable celebration! 🎉
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-purple-200 transition-transform duration-300 hover:scale-[1.02]">
          {/* Current track display */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 animate-pulse">
              <Music size={80} className="mx-auto text-yellow-300" />
            </div>
            <div className="relative z-10">
              <Music
                size={48}
                className="mx-auto mb-4 animate-pulse text-yellow-200"
              />
              <h3 className="text-2xl font-bold mb-2 text-yellow-100 drop-shadow">
                {shuffledPlaylist[currentTrack].title}
              </h3>
              <p className="text-purple-100 drop-shadow">
                {shuffledPlaylist[currentTrack].artist}
              </p>
            </div>
          </div>

          {/* Audio element */}
          <audio
            ref={audioRef}
            src={shuffledPlaylist[currentTrack].src}
            onLoadedData={() => setIsPlaying(true)}
          />

          {/* Controls */}
          <div className="p-8 bg-gradient-to-b from-white to-gray-50">
            {/* Progress bar */}
            <div className="mb-6 relative">
              <div
                className="w-full h-3 bg-gray-200 rounded-full cursor-pointer relative"
                onClick={handleSeek}
              >
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300 relative"
                  style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
                >
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-pink-600 rounded-full shadow" />
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Main controls */}
            <div className="flex items-center justify-center space-x-6 mb-6">
              <Button
                onClick={shufflePlaylist}
                className={`${
                  isShuffled ? "bg-yellow-400" : "bg-gray-300"
                } hover:bg-yellow-500 text-purple-900 rounded-full p-3 transition-transform duration-200 hover:scale-110`}
              >
                <Shuffle size={24} />
              </Button>
              <Button
                onClick={prevTrack}
                className="bg-purple-500 hover:bg-purple-600 text-white rounded-full p-3 transition-transform duration-200 hover:scale-110"
              >
                <SkipBack size={24} />
              </Button>
              <Button
                onClick={togglePlay}
                className="bg-pink-500 hover:bg-pink-600 text-white rounded-full p-4 text-lg transition-transform duration-200 hover:scale-110"
              >
                {isPlaying ? <Pause size={32} /> : <Play size={32} />}
              </Button>
              <Button
                onClick={nextTrack}
                className="bg-purple-500 hover:bg-purple-600 text-white rounded-full p-3 transition-transform duration-200 hover:scale-110"
              >
                <SkipForward size={24} />
              </Button>
            </div>

            {/* Volume control */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <Button
                onClick={toggleMute}
                className="bg-gray-500 hover:bg-gray-600 text-white rounded-full p-2 transition-transform duration-200 hover:scale-110"
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </Button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-32 accent-pink-500 cursor-pointer"
              />
            </div>

            {/* Playlist */}
            <div className="bg-gray-50 rounded-2xl p-6 shadow-inner">
              <h4 className="text-lg font-semibold text-purple-800 mb-4 text-center">
                Party Playlist 🎶
              </h4>
              <div className="space-y-2 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-gray-100">
                {shuffledPlaylist.map((track, index) => (
                  <button
                    key={index}
                    onClick={() => selectTrack(index)}
                    className={`w-full text-left p-4 rounded-lg transition-all duration-200 flex justify-between items-center ${
                      index === currentTrack
                        ? "bg-purple-500 text-white shadow-lg"
                        : "bg-white hover:bg-purple-100 text-gray-700 hover:shadow"
                    }`}
                  >
                    <div>
                      <div className="font-medium">{track.title}</div>
                      <div className="text-sm opacity-75">{track.artist}</div>
                    </div>
                    {index === currentTrack && (
                      <Music size={20} className="animate-pulse" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations and styling */}
      <style jsx>{`
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: #c084fc #f3f4f6;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f3f4f6;
          border-radius: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #c084fc;
          border-radius: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #a855f7;
        }
      `}</style>
    </section>
  );
};

export default MusicPlayer;
