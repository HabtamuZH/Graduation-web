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
      confetti({ particleCount: 50, spread: 60 });
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="py-16 px-4 bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-8 text-center font-[Dancing Script]">
          💌 Leave a Birthday Wish for Burte! 💌
        </h2>
        <div className="bg-white rounded-3xl shadow-2xl p-6">
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="flex-1 p-3 rounded-lg border border-purple-200 focus:outline-none focus:border-purple-500"
              />
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Your Birthday Wish"
                className="flex-1 p-3 rounded-lg border border-purple-200 focus:outline-none focus:border-purple-500"
              />
            </div>
            <Button
              type="submit"
              className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-6 py-2"
              onMouseEnter={() => confetti({ particleCount: 20, spread: 30 })}
            >
              Send Wish 🎉
            </Button>
          </form>
          <div className="space-y-4 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-gray-100">
            {messages.map((msg, index) => (
              <div key={index} className="p-4 bg-purple-50 rounded-lg">
                <p className="font-semibold text-purple-800">{msg.name}</p>
                <p className="text-gray-700">{msg.text}</p>
                <p className="text-xs text-gray-500">{msg.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap");
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

export default Guestbook;
