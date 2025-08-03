import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button.jsx";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

const Guestbook = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const storedMessages = JSON.parse(
      localStorage.getItem("guestbook") || "[]"
    );
    setMessages(storedMessages);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim() && name.trim()) {
      const updatedMessages = [
        ...messages,
        { name, text: newMessage, date: new Date().toLocaleString() },
      ];
      setMessages(updatedMessages);
      localStorage.setItem("guestbook", JSON.stringify(updatedMessages));
      setNewMessage("");
      setName("");
      confetti({
        particleCount: 40,
        spread: 50,
        colors: ["#f8c8dc", "#e6e6fa", "#ffd700"],
      });
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="py-12 px-4 bg-cream-50"
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-pink-700 mb-6 text-center font-[Great Vibes]">
          💌 Messages for Mar Nat 🎓
        </h2>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <form onSubmit={handleSubmit} className="mb-6 space-y-4">
            <div className="flex flex-col md:flex-row gap-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="flex-1 p-2 rounded-md border border-gray-200 focus:outline-none focus:border-pink-400 font-[Inter]"
              />
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Your Message"
                className="flex-1 p-2 rounded-md border border-gray-200 focus:outline-none focus:border-pink-400 font-[Inter]"
              />
            </div>
            <Button
              type="submit"
              className="bg-pink-400 hover:bg-pink-500 text-white rounded-full px-6 py-2 font-[Inter]"
            >
              Send Love 🎓
            </Button>
          </form>
          <div className="space-y-3 max-h-60 overflow-y-auto scrollbar-thin">
            {messages.map((msg, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-md">
                <p className="font-semibold text-pink-700 font-[Inter]">
                  {msg.name}
                </p>
                <p className="text-gray-600 font-[Inter]">{msg.text}</p>
                <p className="text-xs text-gray-400 font-[Inter]">{msg.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Great+Vibes&family=Inter:wght@400&display=swap");
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

export default Guestbook;
