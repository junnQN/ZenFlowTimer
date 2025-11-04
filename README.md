# 🧘 Zen Timer - Meditation & Breathing App

A beautifully minimalist meditation timer with scientifically-backed breathing exercises, designed for distraction-free mindfulness practice.

## ✨ Features

### 🕐 Meditation Presets
- **5 Countdown Timers** - Quick sessions from 5 to 25 minutes
- **6 Breathing Techniques** - Evidence-based exercises including:
  - Box Breathing (4-4-4-4 pattern)
  - 4-7-8 Breathing (Dr. Weil's technique)
  - Cyclic Sighing (Stanford research-backed)
  - Diaphragmatic Breathing (belly breathing)
  - Alternate Nostril (Nadi Shodhana)
- **Guided Body Scan** - 15-minute progressive meditation through 8 body regions

### 🎯 Core Functionality
- **Phase-Synchronized Visualizations** - Breathing animations that match exact timing
- **Session History Tracking** - Track your practice with streaks and statistics
- **Custom Preset Builder** - Create personalized meditation timers
- **Ambient Sounds** - Rain, ocean, and forest soundscapes with volume control
- **Audio Feedback** - Gentle tones for session start, transitions, and completion
- **Responsive Design** - Works seamlessly on desktop and mobile devices

## 🛠 Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Wouter** for lightweight routing
- **React Query** for data fetching
- **React Hook Form** with Zod validation
- **Web Audio API** for sound generation

### Backend
- **Express.js** server
- **PostgreSQL** database (Neon-backed)
- **Drizzle ORM** for type-safe database operations
- **RESTful API** architecture

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database (automatically configured on Replit)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/zen-timer.git
cd zen-timer
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Database connection (auto-configured on Replit)
DATABASE_URL=your_postgresql_connection_string
SESSION_SECRET=your_session_secret
```

4. Initialize the database:
```bash
npm run db:push
```

5. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5000`

## 📱 Usage Guide

### Starting a Meditation Session
1. **Choose a Preset** - Select from built-in timers or breathing exercises
2. **Start Timer** - Press the Start button to begin your session
3. **Follow Guidance** - For breathing exercises, follow the visual and text cues
4. **Complete Session** - Sessions are automatically saved to your history

### Creating Custom Presets
1. Click "Create Custom Preset" on the home page
2. Configure your preset:
   - Name and description
   - Timer duration
   - Optional breathing patterns with custom phases
   - Number of cycles for breathing exercises
3. Save and use your custom preset immediately

### Tracking Your Practice
- View your meditation history with the "Session History" link
- Track your current streak and best streak
- See total sessions and minutes practiced
- Monitor your consistency with recent session listings

### Using Ambient Sounds
- Select from rain, ocean, or forest sounds before starting
- Adjust volume with the slider
- Sounds automatically pause during active sessions
- Resume playback when timer is paused or completed

## 📂 Project Structure

```
zen-timer/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utilities and presets
│   │   └── pages/        # Route pages
├── server/                # Backend Express server
│   ├── routes.ts         # API endpoints
│   ├── storage.ts        # Database operations
│   └── db.ts            # Database connection
├── shared/               # Shared types and schemas
│   └── schema.ts        # Drizzle ORM schemas
├── public/              # Static assets
│   └── sounds/         # Ambient sound files
└── design_guidelines.md # UI/UX design system
```

## 🎨 Design Philosophy

Zen Timer follows a hyper-minimalist aesthetic:
- **Clean Interface** - Generous white space for mental clarity
- **Subtle Colors** - Calming blue accent on neutral backgrounds
- **Typography** - Inter font with careful weight hierarchy
- **Functional Motion** - Only essential animations, no decorative effects
- **Accessibility First** - Clear focus states and keyboard navigation

## 🔬 Evidence-Based Techniques

### Box Breathing
Used by Navy SEALs and first responders for stress management and focus enhancement.

### 4-7-8 Breathing
Dr. Andrew Weil's technique proven effective for anxiety relief and sleep improvement.

### Cyclic Sighing
Stanford research shows this technique provides rapid autonomic nervous system regulation.

### Diaphragmatic Breathing
Clinically proven to reduce cortisol levels and improve heart rate variability.

## 🧪 Testing

Run the test suite:
```bash
npm run test
```

The app includes comprehensive end-to-end tests covering:
- Timer functionality
- Breathing phase synchronization
- Session persistence
- Custom preset management
- Ambient sound integration

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style and patterns
- Maintain the minimalist design philosophy
- Add tests for new features
- Update documentation as needed
- Ensure accessibility standards are met

## 📈 Future Enhancements

- Dark mode toggle
- Export session data to CSV/JSON
- Social sharing of achievements
- Additional guided meditations
- Customizable audio cues
- Progressive Web App (PWA) support
- Mobile app versions (iOS/Android)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Breathing technique research from Stanford University
- Dr. Andrew Weil for the 4-7-8 breathing method
- The mindfulness community for feedback and support
- Open source contributors

## 💬 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contact: your-email@example.com

---

**Built with ❤️ for mindful living**