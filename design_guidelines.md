# Design Guidelines: Tactical Battlefield Deployment Simulator

## Design Approach

**Selected Approach:** Design System - Tactical Professional Interface

Drawing inspiration from mission control interfaces (NASA, SpaceX) and professional military simulation software, combined with Material Design principles for data-heavy applications. This is a professional research tool requiring clarity, precision, and efficient information display.

**Core Principles:**
- Information density with clear hierarchy
- Professional tactical aesthetic
- Precision over decoration
- Functional minimalism
- Data-first presentation

---

## Typography System

**Primary Font Family:** 
- UI Text: Inter (Google Fonts) - clean, highly legible at small sizes
- Data/Metrics: JetBrains Mono (Google Fonts) - monospaced for coordinates, scores, technical readouts

**Type Scale:**
- Hero/Page Titles: text-4xl font-bold (36px)
- Section Headers: text-2xl font-semibold (24px)
- Panel Headers: text-lg font-semibold (18px)
- Body Text: text-base (16px)
- Labels/Captions: text-sm (14px)
- Data Readouts: text-sm font-mono (14px monospace)
- Small UI Text: text-xs (12px)

**Hierarchy Rules:**
- Use font-weight for emphasis (font-semibold for headers, font-medium for emphasis)
- Reserve font-mono exclusively for numerical data, coordinates, scores
- Maintain consistent line-height: leading-relaxed for body, leading-tight for headers

---

## Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, 12, 16, 24
- Micro spacing (within components): p-2, gap-2
- Component padding: p-4, p-6
- Section spacing: p-8, gap-8
- Page margins: p-12, p-16
- Large separations: mt-24, mb-24

**Grid Structure:**

*Overview Page:*
- max-w-7xl container
- Hero: Full-width with centered content (max-w-4xl)
- Sections: Grid layouts - grid-cols-1 md:grid-cols-2 lg:grid-cols-3 for feature cards
- Consistent vertical rhythm: space-y-24 between major sections

*PoC Page:*
- max-w-5xl container for optimal reading
- Single column layout with clear section breaks
- Accordion/tab component with generous spacing (space-y-4)

*Demo Page:*
- Fixed layout: 70/30 split (w-[70%] / w-[30%])
- Left: Canvas container (h-screen with toolbar)
- Right: Scrollable panel (overflow-y-auto)
- Toolbar: Fixed top bar, h-16, flex items-center gap-4

**Responsive Behavior:**
- Demo page: Stack to single column below lg breakpoint (canvas full-width, panels below)
- Overview/PoC: Standard responsive grid collapse

---

## Component Library

### Navigation (TopNav.tsx)
- Fixed top bar, h-16, border-b
- Flex layout: logo/title left, nav links center, language toggle right
- Navigation items: px-4 py-2, hover states with subtle transitions
- Active route indicator: border-b-2 with offset

### Cards (Feature Cards, Platform Cards)
- Border: border with rounded-lg
- Padding: p-6
- Hover: Subtle lift effect (transition-transform hover:scale-[1.02])
- Icon placement: Top-aligned with text-4xl icons from Heroicons
- Content spacing: space-y-4

### Panels (Control Panel, Results Panel)
- Container: border rounded-lg p-6
- Header: pb-4 border-b
- Content sections: space-y-6
- Collapsible sections: Accordion pattern with chevron icons

### Buttons
**Primary Actions:**
- px-6 py-3 rounded-lg font-semibold
- Icons: Left-aligned with mr-2 (Heroicons outline)

**Secondary Actions:**
- px-4 py-2 rounded-md
- Border variant for destructive/neutral actions

**Icon Buttons:**
- w-10 h-10 rounded-lg
- Centered icon with p-2

**Toolbar Buttons:**
- px-4 py-2 gap-2 (icon + text horizontal)

### Form Controls
**Sliders:**
- Full-width input with labels above
- Value display: font-mono text-sm inline
- Range: w-full with custom styling

**Selects/Dropdowns:**
- h-10 px-4 rounded-lg border
- Chevron icon right-aligned

**Toggles:**
- Switch component: w-11 h-6 rounded-full
- Label positioning: inline with mr-3

### Canvas Controls (EditTools)
- Vertical toolbar pattern: space-y-2
- Tool buttons: w-12 h-12 rounded-lg
- Active state: distinct visual treatment
- Brush preview: Small circle indicator

### Data Display
**Metrics Grid:**
- grid-cols-2 gap-4 for key metrics
- Each metric: Label (text-sm) + Value (text-2xl font-mono font-bold)

**Score Breakdown:**
- Table layout with alternating row backgrounds
- Columns: Parameter name | Weight | Score | Contribution
- Monospace font for numerical columns

**Top 5 Results:**
- Numbered list with cards
- Each card: Position coordinates (font-mono) + score breakdown
- Visual rank indicator (1st, 2nd, etc.)

### Tutorial Overlay
- Full-screen overlay with backdrop blur
- Centered modal: max-w-lg p-8 rounded-xl
- Step indicator: Dots navigation at bottom
- Progress: Current step highlighted
- Buttons: "Skip" (subtle) vs "Next/Got it" (prominent)

---

## Icon System

**Library:** Heroicons (via CDN)
- Use outline variant for most UI elements
- Solid variant for active states and emphasis
- Consistent sizing: w-5 h-5 for inline icons, w-6 h-6 for standalone

**Key Icons:**
- Navigation: ChevronRightIcon, Bars3Icon
- Actions: PlayIcon, PauseIcon, ArrowPathIcon
- Tools: PencilIcon, TrashIcon, PlusIcon
- Data: ChartBarIcon, TableCellsIcon
- Language: GlobeAltIcon or LanguageIcon

---

## Images

**Hero Section (Overview Page):**
Large hero background image showing tactical/military context:
- Image description: Abstract topographic map or satellite terrain view with grid overlay, suggesting tactical planning
- Placement: Full-width hero section, h-[500px]
- Treatment: Subtle gradient overlay for text readability
- CTA buttons with blurred background (backdrop-blur-sm with bg-opacity-90)

**No other images required** - This is a data/tool-focused application where the canvas visualization is the primary visual element.

---

## Animations

**Minimal, Purposeful Only:**
- Transition durations: transition-all duration-200 for hover states
- Page transitions: None (instant navigation)
- Canvas updates: Smooth but not animated (immediate state rendering)
- Tutorial overlay: Simple fade-in (transition-opacity)
- Avoid scroll animations, parallax, or decorative motion

---

## Professional Polish

- Consistent border-radius across components: rounded-lg (8px) standard, rounded-xl (12px) for modals
- Subtle shadows only on elevated elements (cards, dropdowns): shadow-sm to shadow-md
- Generous whitespace in panels: min 6-unit padding
- Clear visual separation: Use borders rather than shadows where possible
- Monospaced readouts must align vertically (tabular-nums utility)
- Bilingual text must maintain same hierarchy in both languages
- No playful or casual design elements - maintain professional tactical aesthetic throughout