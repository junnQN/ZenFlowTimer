# Meditation Timer App - Design Guidelines

## Design Approach

**Selected Framework**: Apple Human Interface Guidelines (HIG) with Zen Minimalism principles

**Rationale**: This is a utility-focused meditation application where distraction-free clarity and functional excellence are paramount. The user explicitly requested "hyper minimalist" and "zen" aesthetics. We'll follow Apple's content-first philosophy while amplifying minimalism through generous negative space, restrained typography, and purposeful element placement.

**Core Design Principles**:
- **Radical Simplicity**: Every element must earn its place - remove anything non-essential
- **Breathing Room**: Generous spacing creates calm, reduces cognitive load
- **Gentle Hierarchy**: Soft visual weights guide attention without demanding it
- **Purposeful Motion**: Timer animations only - no decorative effects

---

## Typography

**Font Stack**: 
- Primary: `Inter` (Google Fonts) - clean, readable, modern sans-serif
- Fallback: system-ui, -apple-system, sans-serif

**Type Scale**:
- **Timer Display**: 96px (6xl), font-weight: 200 (extra-light), tabular-nums
- **Preset Titles**: 20px (xl), font-weight: 400 (normal), letter-spacing: 0.02em
- **Secondary Labels**: 14px (sm), font-weight: 400, letter-spacing: 0.03em
- **Micro Text** (breathing phase labels): 12px (xs), font-weight: 500, uppercase, letter-spacing: 0.1em

**Hierarchy Implementation**:
- Use weight variation (200-500 range only) instead of size for subtle emphasis
- Maintain consistent line-height: 1.2 for display, 1.5 for body text
- All caps reserved exclusively for micro-labels and breathing phase indicators

---

## Layout System

**Spacing Primitives**: Use Tailwind units of **2, 4, 8, 12, 16** for all spacing

**Examples**:
- `p-2` (8px) - tight internal spacing
- `gap-4` (16px) - preset card gaps
- `p-8` (32px) - section padding
- `mb-12` (48px) - major section separation
- `py-16` (64px) - top/bottom screen margins

**Grid Structure**:
- **Main Layout**: Single column, center-aligned, max-width: 480px
- **Preset Grid**: 2 columns on mobile (grid-cols-2), 3 columns on tablet+ (md:grid-cols-3)
- **Vertical Rhythm**: Consistent 64px (py-16) spacing between major sections

**Container Philosophy**:
- All content within max-w-md (448px) container, centered
- Full viewport height (min-h-screen) with flex centering
- No horizontal scrolling - vertical stack only

---

## Component Library

### 1. Circular Timer (Hero Component)

**Structure**:
- SVG circle with 280px diameter
- Stroke width: 8px for progress ring, 2px for background track
- Timer text centered absolutely within circle
- Breathing phase indicator (if applicable) positioned below timer

**States**:
- **Idle**: Static ring showing full circle
- **Active**: Animated stroke-dashoffset countdown (clockwise from top)
- **Paused**: Frozen state with subtle pulse on timer text
- **Complete**: Gentle fade-in of completion message

**Spacing**: mb-16 (64px margin-bottom) to separate from controls

### 2. Preset Cards

**Card Design**:
- Rounded corners: rounded-2xl (16px)
- Padding: p-8 (32px)
- Border: 1px solid border with subtle transparency
- Aspect ratio: Natural height based on content (no forced aspect)

**Card Content**:
- Icon/symbol at top (24px size, mb-4)
- Preset name (xl text, mb-2)
- Brief description (sm text, 2 lines max)
- Duration indicator (xs uppercase, mt-4)

**Grid Layout**:
- Gap: gap-4 (16px between cards)
- Responsive: grid-cols-2 (mobile), md:grid-cols-3 (768px+)

**Interaction**: 
- Entire card is clickable
- Active state: slight scale transform (0.98)

### 3. Control Buttons

**Primary Action** (Start/Pause/Resume):
- Size: Large circular button (64px diameter)
- Icon: 28px play/pause
- Positioned below timer with mt-8

**Secondary Actions** (Reset/Back):
- Size: Medium (48px diameter)
- Icons: 20px
- Flanking primary button with gap-4

**Button Group Layout**:
```
flex justify-center items-center gap-4
```

### 4. Timer Control Panel

**Active Session View**:
- Breathing phase indicator (if breathing exercise): uppercase, text-xs, mb-2
- Visual breathing guide (expanding/contracting circle) for breath-sync techniques
- Progress indicator showing intervals completed (e.g., "Cycle 3 of 10")

### 5. Settings/Custom Timer

**Input Fields**:
- Number inputs for custom durations
- Minimal borders (border-b-2 only)
- Padding: py-2, text-center
- Font size: text-lg for input values

**Stepper Controls**:
- +/- buttons adjacent to inputs
- Size: 40px square
- Icons: 16px

---

## Interaction Patterns

### Timer Flow:
1. **Home Screen**: Preset grid + custom timer option at bottom
2. **Preset Selection**: Slide transition to timer view with preset details
3. **Timer Active**: Full-screen timer with minimal controls
4. **Completion**: Brief success state (2s) → return to home

### Navigation:
- Back button (top-left, subtle) when in timer view
- No persistent navigation chrome
- Swipe gestures for back (if technically feasible)

### Breathing Exercise Visualization:
- **Box Breathing**: Square outline that traces edges (inhale→hold→exhale→hold)
- **4-7-8**: Simple expanding circle with phase labels
- **Cyclic Sighing**: Double-pulse on inhale, long fade on exhale

---

## Audio Design

**Sound Cues** (not visual, but critical to UX):
- **Start**: Gentle chime (300ms)
- **Breathing Phase Transitions**: Soft bell tone (150ms)
- **Interval Completion**: Two-note progression
- **Session Complete**: Warm, resolving chord

**Volume**: All sounds at 60% max volume, never jarring

---

## Accessibility

**Focus States**:
- 3px outline offset by 2px on all interactive elements
- Visible on keyboard navigation
- Circular buttons get circular focus rings

**Screen Reader**:
- Timer announces minutes remaining every 5 minutes
- Breathing phase changes announced immediately
- Clear ARIA labels on all controls

**Touch Targets**:
- Minimum 44x44px for all interactive elements
- Preset cards exceed minimum naturally
- Adequate spacing (16px min) between adjacent buttons

---

## Responsive Behavior

**Mobile (< 768px)**:
- Timer: 240px diameter
- Preset grid: 2 columns
- Controls: Full 64px size maintained

**Tablet/Desktop (≥ 768px)**:
- Timer: 280px diameter
- Preset grid: 3 columns
- Max container width enforced (448px)
- Centered in viewport

---

## Animation Specifications

**Timer Countdown**:
- Linear easing for predictable time perception
- 60fps target for smooth progress ring
- No bounce or elastic effects

**Breathing Guides**:
- Ease-in-out for organic breathing rhythm
- Duration matches exact breathing phase timing
- Continuous loop during session

**Transitions**:
- Page transitions: 200ms fade
- Card hover: 150ms ease-out
- NO animations on initial load

**Critical Rule**: Animations serve function only - never decorative

---

## Key Screens Structure

### Home Screen:
1. App title (optional, text-sm, mb-8)
2. Preset grid (3x2 or 3x3 layout)
3. Custom timer button (full-width, mt-8)

### Timer Screen:
1. Back button (absolute top-left)
2. Preset name (centered, mb-4)
3. Circular timer (centered)
4. Breathing phase indicator (if applicable)
5. Control buttons (centered, mt-8)
6. Progress indicator (subtle, bottom)

### Custom Timer Setup:
1. Duration inputs with steppers
2. Interval settings (if applicable)
3. Sound toggle
4. Start button (centered, mt-12)

---

## Images

**No images required** - This is a purely functional meditation timer app where visual simplicity is paramount. The circular timer visualization and clean typography create the entire aesthetic. No hero images, illustrations, or decorative graphics should be added.