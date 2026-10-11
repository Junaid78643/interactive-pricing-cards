# Task 2: Interactive Pricing & Product Cards with Filter and Toggle

An interactive, responsive SaaS pricing showcase with dynamic billing toggles, category filtering, card hover animations, and micro-interactions.

---

## 🚀 Live Demo & Quick Start

Simply open `index.html` in any modern web browser:
- Double click `index.html` in your file explorer, or
- Right click `index.html` and choose **Open with Live Server** (or default browser).

---

## ✨ Features Implemented

### 1. Functional Pricing Cards (4 Tiers)
Each card includes:
- **Vector Icons:** High-resolution SVG icons with ambient glow backgrounds (Rocket, Lightning, Chart, Shield).
- **Tier Badge & Title:** Starter, Growth, Pro, Enterprise.
- **Description:** Audience-focused descriptions for each plan.
- **Dynamic Price Display:** Clear currency symbol, large numeric display, billing cycle label, and annual savings notes.
- **Comprehensive Feature List:** Verified with green checkmarks (and crossmarks for excluded tier features).
- **Call-to-Action (CTA):** Actionable CTA buttons with directional hover indicators.

### 2. Monthly / Yearly Billing Toggle Switch
- **Toggle Switch:** Sliding switch with smooth CSS spring transitions and ARIA accessibility (`role="switch"`, `aria-checked`).
- **Interactive Labels:** Users can click either the switch or the "Monthly" / "Yearly" text labels.
- **Discount Badge:** "Save 20%" tag with subtle pulsing glow.
- **Dynamic Price Animation:** When toggled, the numeric pricing animates with a smooth swap/scale effect, and the billing note dynamically updates (e.g., *Billed $468 annually (Save $120)* vs *Billed monthly*).

### 3. Category Filter Logic (JavaScript DOM Manipulation)
- **Filter Tabs:** "All Plans", "Basic", and "Premium" buttons with dynamic count badges.
- **Smooth Staggered Entrance:** Cards fade in and scale smoothly (`cardEntrance` animation with staggered CSS delays) rather than popping abruptly.
- **Empty State Handler:** Graceful fallback if no plans match a given filter.

### 4. Card Hover Animations
- **Card Lift:** Elevates `-10px` on hover using smooth cubic-bezier transitions.
- **Border & Glow:** Dynamic border highlight and multi-layer colored ambient box-shadows.
- **Icon Hover Effect:** Scales and subtly rotates the card icon (`scale(1.1) rotate(3deg)`).
- **CTA Shimmer Sweep:** Diagonal light sweep wipes across the CTA button on hover.

### 5. Highlighted "Most Popular" Card
- The **Growth** card is highlighted as **"Most Popular"**:
  - Glowing floating top ribbon with spinning sparkle SVG.
  - Emerald gradient border and enhanced depth shadow.
  - Distinct primary CTA button with emerald gradient styling.

### 6. Micro-Interactions
- **Button Click Ripple Effect:** Generates a ripple wave originating precisely from the click coordinate.
- **Button Depression:** Tactile `scale(0.97)` active press state.
- **Interactive Toast Notification:** Clicking any CTA displays an interactive toast notification confirming the chosen plan and billing frequency with auto-dismiss.
- **Sliding Toggle Thumb:** Physics-inspired cubic-bezier slide when toggling billing cycles.

### 7. Responsive Layout (CSS Grid & Flexbox)
- **Desktop (1200px+):** 4-column side-by-side grid.
- **Tablet (720px - 1200px):** 2-column balanced grid.
- **Mobile (<720px):** Single-column stacked view with touch-friendly button targets (min 44px) and full-width controls.

---

## 📂 Project Architecture

```
Interndom_Task2/
├── index.html     # Semantic HTML5 markup, ARIA roles & SVG icons
├── styles.css     # CSS custom properties, grid layouts, animations & responsive media queries
├── script.js      # Vanilla JS: event listeners, DOM state, filter & toggle logic, ripples & toasts
└── README.md      # Documentation & feature overview
```

---

## 🛠️ Technologies Used
- **HTML5:** Semantic structure, ARIA accessibility attributes.
- **CSS3:** Custom properties (CSS variables), Grid, Flexbox, backdrop-filter glassmorphism, keyframe animations.
- **Vanilla JavaScript (ES6+):** Event listeners, dataset manipulation, class toggling, DOM element creation and cleanup.
