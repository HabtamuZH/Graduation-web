# 🎓 Mar Nat’s Graduation Celebration Website 🎉

A heartfelt, interactive website created to celebrate Mar Nat’s Accounting degree graduation! Built with React, Vite, and TailwindCSS, this site features a music player, image slideshow, guestbook, special messages, and confetti effects, all wrapped in a minimalist and romantic design.

## ✨ Features

- **🎓 Graduation Theme**: Elegant design with soft pink, lavender, and gold accents to honor Mar Nat’s achievement.
- **📸 Image Slideshow**: Interactive slideshow showcasing Mar Nat’s graduation moments.
- **🎵 Music Player**: Full-featured player with a curated playlist, volume control, and smooth playback.
- **💌 Guestbook**: Allows visitors to leave congratulatory messages for Mar Nat.
- **💖 Special Message**: A heartfelt dedication celebrating Mar Nat’s journey.
- **🎊 Confetti Effects**: Subtle confetti animations on page load and header hover for a festive touch.
- **📱 Responsive Design**: Optimized for desktop and mobile devices using the `useIsMobile` hook.
- **🎨 Smooth Animations**: Powered by Framer Motion for elegant transitions and floating elements.

## 🚀 Quick Start

### Option 1: Use the Built Version (Recommended)

1. Open the `dist` folder.
2. Open `index.html` in any modern web browser.
3. Celebrate Mar Nat’s graduation! 🎓

### Option 2: Development Mode

1. Ensure Node.js is installed.
2. Open a terminal in the project folder.
3. Run: `npm install`
4. Run: `npm run dev`
5. Open `http://localhost:5173` in your browser.

## 📁 Project Structure

```
graduation-website/
├── dist/                    # Built production files
├── src/
│   ├── assets/
│   │   ├── images/         # Graduation photos
│   │   └── music/          # Music files
│   ├── components/
│   │   ├── Header.jsx      # Main header with confetti and background image
│   │   ├── MusicPlayer.jsx # Music player with fixed volume control
│   │   ├── ImageSlideshow.jsx # Photo slideshow with navigation
│   │   ├── SpecialMessage.jsx # Heartfelt message for Mar Nat
│   │   ├── Guestbook.jsx   # Guestbook for visitor messages
│   │   └── Footer.jsx      # Footer with congratulatory content
│   ├── App.jsx             # Main app with top header and layout
│   ├── App.css             # Custom styles and animations
│   └── useIsMobile.js      # Hook for responsive design
├── index.html              # Entry point with custom favicon
├── package.json            # Project dependencies
└── README.md               # This file
```

## 🎵 Music Player Features

- Play/Pause controls
- Track selection from a curated playlist
- Fixed volume control with mute/unmute functionality
- Progress bar with seek functionality
- Auto-play next track
- Autoplay error handling with a fallback “Play Music” button

## 📸 Image Slideshow Features

- Automatic slideshow with 5-second intervals
- Manual navigation via arrow buttons and thumbnails
- Play/Pause slideshow control
- Smooth fade transitions using Framer Motion
- Responsive design for mobile and desktop

## 💌 Guestbook Features

- Form to submit congratulatory messages
- Messages saved to localStorage
- Subtle confetti effect on submission
- Scrollable m** essage list with custom scrollbar
**
## 🎊 Interact** ive Elements

- **Top Header**: Fixed banner with “Mar Nat’s Graduation 🎓” title and confetti on hover.
- **Confetti Effects**: Subtle bursts on page load and header hover using canvas-confetti.
- **Floating Elements**: Animated graduation cap and heart emojis in the background.
- **Hover Animations**: Smooth transitions on buttons and interactive elements.
- **Special Message**: A dedicated section with a heartfelt note and animated heart.

## 🎨 Customization

To customize the website:

1. **Colors**: Edit the CSS variables in `src/App.css`
2. **Images**: Replace files in `src/assets/images/`
3. **Music**: Replace files in `src/assets/music/`
4. **Text**: Edit the content in the component files

## 📱 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## 🎁 Special Features

- **Graduation Theme**: Designed to celebrate Mar Nat’s Accounting degree with a romantic, minimalist aesthetic.
- **Personal Touch**: Includes Mar Nat’s photos, a curated playlist, and heartfelt messages.
- **Mobile Friendly**: Responsive layouts using TailwindCSS and useIsMobile hook.
- **Fast Loading**: Optimized images and audio files for quick load times.
- **Accessibility**: Buttons include aria-label attributes for screen readers.

## 💝 Made with Love

This website was created with love to honor Mar Nat’s incredible achievement in earning her Accounting degree. Congratulations, Mar Nat! 🎓💖

Built with React ⚛️, Vite ⚡, TailwindCSS 🎨, Framer Motion 🎬, canvas-confetti 🎊, and Lucide React 🖼️ for a magical graduation celebration!
