# Zen Timer - Meditation & Breathing App

A hyper-minimalist meditation timer with evidence-based breathing exercises designed for distraction-free mindfulness practice.

## Overview

Zen Timer is a beautifully crafted meditation application that combines simple countdown timers with scientifically-backed breathing techniques. The app features a clean, zen aesthetic with smooth animations and phase-synchronized breathing visualizations.

## Features

### Meditation Presets

**Simple Countdown Timers:**
- Quick Session (5 minutes)
- Standard (10 minutes)
- Deep Session (15 minutes)
- Extended (20 minutes)
- Long Practice (25 minutes)

**Breathing Exercises:**
- **Box Breathing** - 4-4-4-4 pattern used by Navy SEALs for focus and stress management
- **4-7-8 Breathing** - Dr. Andrew Weil's relaxation technique for sleep and anxiety relief
- **Cyclic Sighing** - Stanford-backed technique with double inhale and long exhale for rapid stress relief
- **Diaphragmatic Breathing** - Deep belly breathing for relaxation and stress reduction
- **Alternate Nostril** - Traditional yogic breathing (Nadi Shodhana) for balance and calm

**Guided Meditation:**
- **Body Scan** - Progressive body awareness meditation with timed intervals through 8 body regions

### Core Functionality

- **Circular Timer Display** - 280px SVG with animated progress ring and 96px timer display
- **Phase-Synchronized Visualizations** - Box and circular breathing guides that match exact phase timing
- **Audio Cues** - Gentle sine wave tones for session start, phase transitions, and completion
- **Timer Controls** - Start, Pause, Resume, Reset with consistent button styling
- **Cycle Tracking** - Progress indicators for breathing exercises
- **Session History** - PostgreSQL database tracking with practice streaks and statistics
- **Custom Preset Builder** - Create personalized meditation timers with custom durations and breathing patterns
- **Ambient Background Sounds** - Optional nature sounds (rain, ocean, forest) with volume control
- **Responsive Design** - Works beautifully on mobile and desktop

## Architecture

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- Wouter for lightweight routing
- Custom hooks for timer logic
- Web Audio API for sound cues

### Backend
- Express.js server
- PostgreSQL database (Neon-backed) for session history and custom presets
- Drizzle ORM for type-safe database operations
- RESTful API endpoints for sessions and custom presets

### Key Components
- `CircularTimer` - Main timer display with progress ring
- `BreathingVisualizer` - Phase-synchronized animations (box or circle)
- `PresetCard` - Grid cards for preset selection
- `TimerControls` - Unified control buttons
- `SessionHistory` - Statistics dashboard with practice streaks
- `PresetBuilder` - Form for creating custom meditation presets
- `AmbientSoundControl` - Audio playback controls for nature sounds
- `useTimer` - Custom hook managing countdown and breathing phases
- `useAmbientSound` - Custom hook for ambient audio playback

## Design Philosophy

The app follows a hyper-minimalist zen aesthetic with:
- Generous white space for breathing room
- Inter typeface with extralight weight for timer
- Subtle color palette with primary blue accent
- Smooth transitions (200ms fades)
- No decorative animations - only functional motion
- Accessibility-first focus states

## Recent Changes (November 4, 2025)

### Initial Implementation
- Created complete meditation timer MVP
- Implemented 8 meditation presets (5 countdown + 3 breathing)
- Built phase-synchronized breathing visualizations
- Added audio feedback system
- Configured zen design system with proper typography hierarchy
- Fixed button sizing to use shadcn variants correctly
- Synchronized breathing visualizer with actual phase timing

### Next-Phase Features (Completed)
- **Session History Tracking** - PostgreSQL database with sessions table, API endpoints for saving/retrieving completed sessions, statistics dashboard showing total sessions, minutes practiced, current streak, and best streak
- **Additional Breathing Techniques** - Added diaphragmatic breathing (4-6-4 pattern) and alternate nostril breathing (4-4-4-4 pattern with nostril switching instructions)
- **Guided Body Scan Meditation** - 15-minute progressive body awareness meditation with 8 timed intervals (feet, legs, hips, abdomen, chest, arms, neck, head)
- **Customizable Preset Builder** - Complete UI for creating custom meditation presets with configurable name, description, type, duration, breathing intervals, and cycles - all saved to PostgreSQL
- **Ambient Background Sounds** - Three nature soundscapes (rain, ocean waves, forest ambience) with volume control, auto-pause during active sessions, seamless playback integration

## User Preferences

The app stores user preferences in memory including:
- Last used preset
- Custom duration preferences
- Sound enabled/disabled state

## Technical Notes

### Timer Accuracy
- 1-second interval for countdown
- 50ms polling for breathing phase progress
- Phase transitions trigger immediately on timer boundaries

### Audio System
- Uses Web Audio API for precise tone generation
- Start: 528Hz (C note)
- Phase transition: 440Hz (A note)
- Complete: 660Hz (E note)
- All tones at 30% volume to avoid jarring users

### Breathing Phase Logic
Each breathing preset defines intervals with:
- Phase type (inhale, hold, exhale, hold2, rest)
- Duration in seconds
- Instruction text for display

The timer hook manages phase cycling and triggers visualizer updates.

## Testing

End-to-end tests verify:
- Preset selection and navigation
- Timer start/pause/resume/reset functionality
- Breathing phase transitions and visualizations
- Cycle tracking for breathing exercises
- Audio cue playback
- Session history tracking and statistics
- Custom preset creation, deletion, and usage
- Ambient sound controls and playback
- Responsive layout and accessibility

## Future Enhancements

Potential additions:
- Dark mode toggle (currently follows system preference)
- Export session history data
- Social sharing of meditation achievements
- Additional guided meditations
- Customizable audio cues
- Mobile app version

## Development

The app is built using a schema-first approach:
1. Define data models in `shared/schema.ts`
2. Build frontend components with full design system
3. Implement backend API routes
4. Integrate and test end-to-end

All components follow universal design guidelines with proper spacing, contrast, and interaction patterns.
