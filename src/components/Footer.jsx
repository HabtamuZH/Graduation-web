import { Heart, Star, Gift, Sparkles } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-purple-800 via-pink-700 to-purple-800 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Main footer content */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Birthday wishes section */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-4 flex items-center justify-center md:justify-start">
              <Gift className="mr-2" size={24} />
              Birthday Wishes
            </h3>
            <p className="text-purple-100 leading-relaxed">
              May your 18th birthday be the start of a year filled with good luck, 
              good health, and much happiness. You deserve all the wonderful things 
              life has to offer! 🌟
            </p>
          </div>

          {/* Special message section */}
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 flex items-center justify-center">
              <Heart className="mr-2 text-red-400" size={24} fill="currentColor" />
              You Are Amazing
            </h3>
            <div className="space-y-2 text-purple-100">
              <p>✨ Beautiful inside and out</p>
              <p>🌟 Bright future ahead</p>
              <p>💫 Dreams coming true</p>
              <p>🎈 Joy and laughter always</p>
            </div>
          </div>

          {/* Fun facts section */}
          <div className="text-center md:text-right">
            <h3 className="text-2xl font-bold mb-4 flex items-center justify-center md:justify-end">
              <Star className="mr-2 text-yellow-400" size={24} fill="currentColor" />
              Fun Facts
            </h3>
            <div className="text-purple-100 space-y-2">
              <p>🎂 You're officially an adult!</p>
              <p>🗳️ You can vote now!</p>
              <p>🚗 Time to get that license!</p>
              <p>🎓 College adventures await!</p>
            </div>
          </div>
        </div>

        {/* Decorative divider */}
        <div className="border-t border-purple-400 opacity-30 my-8"></div>

        {/* Birthday quote */}
        <div className="text-center mb-8">
          <blockquote className="text-xl md:text-2xl font-semibold text-yellow-200 italic">
            "The more you praise and celebrate your life, the more there is in life to celebrate!"
          </blockquote>
        </div>

        {/* Bottom section */}
        <div className="text-center border-t border-purple-400 opacity-30 pt-8">
          <div className="flex justify-center items-center space-x-4 mb-4">
            <Sparkles className="text-yellow-300 animate-pulse" size={20} />
            <span className="text-lg font-semibold">Made with Love for Your Special Day</span>
            <Sparkles className="text-yellow-300 animate-pulse" size={20} />
          </div>
          
          <p className="text-purple-200 text-sm">
            © {currentYear} • A Special Birthday Website For Burte's • Created By Hami💕
          </p>
          
          {/* Floating emojis */}
          <div className="flex justify-center space-x-4 mt-4 text-2xl">
            <span className="animate-bounce">🎉</span>
            <span className="animate-pulse">🎂</span>
            <span className="animate-bounce" style={{ animationDelay: '0.5s' }}>🎈</span>
            <span className="animate-pulse" style={{ animationDelay: '1s' }}>🎁</span>
            <span className="animate-bounce" style={{ animationDelay: '1.5s' }}>✨</span>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-pink-400 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute top-1/2 -right-8 w-32 h-32 bg-purple-400 rounded-full opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-8 left-1/4 w-20 h-20 bg-yellow-400 rounded-full opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
    </footer>
  );
};

export default Footer;

