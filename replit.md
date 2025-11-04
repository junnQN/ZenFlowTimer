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

### Core Functionality

- **Circular Timer Display** - 280px SVG with animated progress ring and 96px timer display
- **Phase-Synchronized Visualizations** - Box and circular breathing guides that match exact phase timing
- **Audio Cues** - Gentle sine wave tones for session start, phase transitions, and completion
- **Timer Controls** - Start, Pause, Resume, Reset with consistent button styling
- **Cycle Tracking** - Progress indicators for breathing exercises
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
- In-memory storage for user preferences
- Minimal API (preferences endpoint)

### Key Components
- `CircularTimer` - Main timer display with progress ring
- `BreathingVisualizer` - Phase-synchronized animations (box or circle)
- `PresetCard` - Grid cards for preset selection
- `TimerControls` - Unified control buttons
- `useTimer` - Custom hook managing countdown and breathing phases

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
- Responsive layout and accessibility

## Future Enhancements

Potential additions:
- Session history tracking
- Practice streaks
- Additional breathing techniques (diaphragmatic, alternate nostril)
- Guided body scan meditation
- Customizable preset builder
- Optional ambient background sounds
- Dark mode toggle (currently follows system preference)

## Development

The app is built using a schema-first approach:
1. Define data models in `shared/schema.ts`
2. Build frontend components with full design system
3. Implement backend API routes
4. Integrate and test end-to-end

All components follow universal design guidelines with proper spacing, contrast, and interaction patterns.
