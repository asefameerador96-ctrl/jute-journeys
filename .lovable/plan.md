

# Shah Agro — Premium Scrollytelling Landing Page

## Assets Inventory (All Received)

| Code | File | Usage |
|------|------|-------|
| Logo | SHAH_AGRO-_LOGO-EMBLEM.png | Navbar |
| T6 | T6.png | Hero slide 1 |
| T7 | T7.png | Hero slide 2 |
| T8 | T8.png | Hero slide 3 |
| S5 | S5.png | Process: Seeding |
| H3 | H3.png | Process: Harvesting |
| C5 | C5.png | Process: Curing |
| B3 | B3.png | Process: Buying |
| M3 | M3.png | Process: Manufacturing |
| Pack2 | Pack2.png | Process: Packing & Export |
| Floating seed | Floating_3d_Jute_seed.png | Process center object |
| Y5 | Y5.png | Product: Yarn |
| SLV5 | SLV5.png | Product: Sliver |
| SB2 | SB2.png | Product: Sacking Bag |

## Design System

- **Colors**: Deep olive `#2F3E2C`, warm beige `#F3EFE6`, golden accent `#C8A951`
- **Fonts**: Playfair Display (headlines), Inter (body) — via Google Fonts
- **Style**: Large whitespace, organic shadows, cinematic grain overlay

## Architecture

All images copied to `src/assets/`. Single-page app with these components:

```text
src/
├── assets/          (all images)
├── pages/
│   └── Index.tsx    (main orchestrator)
├── components/
│   ├── Navbar.tsx
│   ├── HeroCarousel.tsx
│   ├── FactsFigures.tsx
│   ├── ProcessSection.tsx
│   ├── ProcessStage.tsx
│   ├── ProductShowcase.tsx
│   ├── ProductCard.tsx
│   ├── Footer.tsx
│   ├── ScrollProgress.tsx
│   └── GrainOverlay.tsx
├── hooks/
│   ├── useScrollAnimation.ts
│   └── useCountUp.ts
└── index.css        (fonts, global styles)
```

## Section Breakdown

### 1. Navbar (`Navbar.tsx`)
- Fixed, transparent → solid on scroll
- Logo left, nav links right (Process, Products, Contact)
- `ScrollProgress` bar at top (thin golden line showing scroll %)

### 2. Hero Carousel (`HeroCarousel.tsx`)
- Fullscreen 100vh, 3 images crossfading every 4.5s
- Slow Ken Burns zoom (scale 1→1.05 over 5s)
- Dark green gradient overlay (30% opacity)
- Center text: "Shah Agro Limited" + "Finest Jutes of Bangladesh"
- CTA button: "Explore Our Process" (scrolls to process section)
- Text fades in on load with staggered animation

### 3. Facts & Figures (`FactsFigures.tsx`)
- Beige background, full width
- "7K MT +" at ~12vw font size, bold serif
- Count-up animation from 0 triggered on scroll into view
- Subtitle: "Monthly Production Capacity"
- Blur-to-sharp reveal effect using Intersection Observer

### 4. Process Section (`ProcessSection.tsx` + `ProcessStage.tsx`)
- 6 stages, each 100vh, alternating left/right text layout (zig-zag)
- **Center floating object**: The `Floating_3d_Jute_seed.png` image with CSS float animation + gentle rotation, crossfading with each stage's photo as user scrolls
- Scroll-linked opacity/transform transitions using Intersection Observer + CSS transforms
- Each stage: full-bleed background image (the process photo) with overlay + text
- Background color shifts gradually green → beige across stages
- Subtle floating particle dust via CSS animation (small golden dots)
- On mobile: simplified to vertical stack with fade transitions

**Stage content as specified in brief** (Seeding → Harvesting → Curing → Buying → Manufacturing → Packing)

### 5. Product Showcase (`ProductShowcase.tsx` + `ProductCard.tsx`)
- Beige background, 3-column grid (stacks on mobile)
- Cards with: image, tagline, hover effect (lift + scale 1.05 + golden border glow)
- "View Details" button fades in on hover
- Products: Yarn (Y5), Sliver (SLV5), Sacking Bag (SB2)

### 6. Footer (`Footer.tsx`)
- Minimal dark olive background
- Contact info, email, "Bangladesh" country tag
- Logo small

### 7. Global Effects (`GrainOverlay.tsx`)
- Fixed full-screen CSS noise/grain texture overlay (pointer-events: none)
- Very subtle opacity (~3-5%) for cinematic feel

## Animation Approach
- **No heavy libraries** — pure CSS animations + Intersection Observer API via custom `useScrollAnimation` hook
- CSS `transition`, `transform`, `opacity` for all scroll-triggered reveals
- `useCountUp` hook for the 7K number animation
- CSS keyframes for floating seed bob, particle dust, grain overlay
- Smooth scroll behavior via CSS `scroll-behavior: smooth`
- All animations respect `prefers-reduced-motion`

## Implementation Order
1. Copy all assets, set up fonts and global CSS variables
2. Build Navbar + ScrollProgress + GrainOverlay
3. Build HeroCarousel
4. Build FactsFigures
5. Build ProcessSection (the largest piece)
6. Build ProductShowcase
7. Build Footer
8. Wire everything in Index.tsx, polish responsive behavior

