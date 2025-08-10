
# Homepage Design Specification

This document serves as the complete reference for all typography, color schemes, layout specifications, and theming used in the Homepage component of SattvikVivah. Use this as the source of truth for maintaining design consistency across the spiritual matrimony platform.

## Table of Contents

1. [Typography System](#typography-system)
2. [Color Palette & Theming](#color-palette--theming)
3. [Layout Structure](#layout-structure)
4. [Component Specifications](#component-specifications)
5. [Responsive Design](#responsive-design)
6. [Animation & Interactions](#animation--interactions)
7. [Accessibility Standards](#accessibility-standards)
8. [Implementation Guidelines](#implementation-guidelines)

## Typography System

### Font Stack Hierarchy

#### Primary Font Stack (Sans-serif)
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif
```
- **Usage**: Body text, UI elements, modern content
- **Weight Range**: 300-700
- **Features**: Variable font support, optical sizing
- **Load Priority**: High (critical rendering path)

#### Secondary Font Stack (Serif)
```css
font-family: 'Crimson Text', Georgia, 'Times New Roman', serif
```
- **Usage**: Headings, spiritual quotes, traditional content
- **Weight Range**: 400-700
- **Features**: Classical readability, spiritual elegance
- **Load Priority**: High (above-fold content)

#### Spiritual Font Stack (Devanagari)
```css
font-family: 'Noto Serif Devanagari', serif
```
- **Usage**: Sanskrit text, mantras, spiritual verses
- **Weight Range**: 400-700
- **Features**: Authentic Devanagari rendering
- **Load Priority**: Medium (progressive enhancement)

### Typography Scale

#### Hero Section Typography
- **Main Heading (H1)**:
  - Font: Crimson Text
  - Size: 3.75rem (60px) / 4.5rem (72px) desktop, 2.25rem (36px) mobile
  - Weight: 700 (Bold)
  - Line Height: 1.1 (tight)
  - Letter Spacing: -0.02em
  - Color: `var(--foreground)` (#1D1A15)

- **Subtitle**:
  - Font: Inter
  - Size: 1.25rem (20px) desktop, 1.125rem (18px) mobile
  - Weight: 500 (Medium)
  - Line Height: 1.6
  - Color: `var(--muted-foreground)`

#### Sanskrit Blessing Typography
- **Sanskrit Text**:
  - Font: Noto Serif Devanagari
  - Size: 1.125rem (18px)
  - Weight: 600 (SemiBold)
  - Color: `var(--saffron)` (#FF9933)
  - Background: `rgba(255, 255, 255, 0.8)` with backdrop-blur

- **Translation Text**:
  - Font: Inter
  - Size: 0.875rem (14px)
  - Weight: 500 (Medium)
  - Style: Italic
  - Color: `var(--muted-foreground)`

#### Section Headers
- **Section Title (H2)**:
  - Font: Crimson Text
  - Size: 2.25rem (36px) desktop, 1.875rem (30px) mobile
  - Weight: 700 (Bold)
  - Line Height: 1.2
  - Letter Spacing: -0.02em
  - Color: `var(--foreground)`

- **Section Subtitle**:
  - Font: Inter
  - Size: 1.125rem (18px)
  - Weight: 400 (Regular)
  - Line Height: 1.6
  - Color: `var(--muted-foreground)`

#### Body Text
- **Primary Body**:
  - Font: Inter
  - Size: 1rem (16px)
  - Weight: 400 (Regular)
  - Line Height: 1.6
  - Color: `var(--foreground)`

- **Secondary Body**:
  - Font: Inter
  - Size: 0.875rem (14px)
  - Weight: 400 (Regular)
  - Line Height: 1.5
  - Color: `var(--muted-foreground)`

#### Button Typography
- **Primary CTA**:
  - Font: Inter
  - Size: 1rem (16px)
  - Weight: 600 (SemiBold)
  - Letter Spacing: 0.02em
  - Text Transform: None

- **Secondary CTA**:
  - Font: Inter
  - Size: 0.875rem (14px)
  - Weight: 500 (Medium)
  - Letter Spacing: 0.02em

## Color Palette & Theming

### Vedic Color System

#### Primary Colors
- **Saffron**: `hsl(33 100% 60%)` (#FF9933)
  - Usage: Primary CTA, brand accents, spiritual highlights
  - Semantic: Sacred, divine energy, enlightenment

- **Temple Gold**: `hsl(42 83% 59%)` (#C9A227)
  - Usage: Secondary elements, decorative accents
  - Semantic: Prosperity, wisdom, divine blessing

#### Background Colors
- **Sandalwood**: `hsl(42 87% 94%)` (#FAF3E0)
  - Usage: Main background, light sections
  - Semantic: Purity, peace, spiritual calm

- **Card Cream**: `hsl(42 87% 97%)` (#FFF7EA)
  - Usage: Card backgrounds, elevated surfaces
  - Semantic: Clean, sacred space

#### Accent Colors
- **Deep Maroon**: `hsl(4 83% 22%)` (#6E0E0A)
  - Usage: Destructive actions, warnings
  - Semantic: Strength, protection, grounding

- **Indigo Night**: `hsl(213 43% 20%)` (#1C2541)
  - Usage: Dark text, night mode accents
  - Semantic: Depth, mystery, wisdom

### Gradient Systems

#### Hero Gradients
```css
/* Primary Hero Gradient */
background: linear-gradient(to bottom right, 
  rgba(255, 153, 51, 0.05) 0%,    /* Saffron/5 */
  rgba(255, 255, 255, 1) 30%,     /* White */
  rgba(244, 194, 194, 0.05) 100%  /* Lotus Pink/5 */
);

/* Decorative Overlays */
background: linear-gradient(to right,
  rgba(255, 153, 51, 0.05) 0%,    /* Saffron/5 */
  transparent 50%,
  rgba(219, 39, 119, 0.05) 100%   /* Rose/5 */
);
```

#### Section Backgrounds
```css
/* Sacred Pattern Background */
.sacred-pattern::before {
  background-image: 
    radial-gradient(circle at 25% 25%, var(--temple-gold) 1px, transparent 1px),
    radial-gradient(circle at 75% 75%, var(--saffron) 1px, transparent 1px);
  background-size: 40px 40px;
  opacity: 0.02;
}

/* Vedic Gradient */
.vedic-gradient {
  background: linear-gradient(135deg, 
    hsla(33, 100%, 60%, 0.03) 0%,  /* Saffron/3 */
    hsla(42, 83%, 59%, 0.05) 30%,  /* Temple Gold/5 */
    hsla(42, 87%, 94%, 0.08) 60%,  /* Sandalwood/8 */
    hsla(213, 43%, 20%, 0.03) 100% /* Indigo Night/3 */
  );
}
```

### Dark Mode Adaptations
```css
.dark {
  --background: hsl(213 43% 8%);      /* Deep night blue */
  --foreground: hsl(42 87% 89%);      /* Warm cream text */
  --card: hsl(213 43% 11%);           /* Elevated surfaces */
  --muted: hsl(213 43% 15%);          /* Subtle backgrounds */
  --muted-foreground: hsl(42 87% 65%); /* Dimmed text */
}
```

## Layout Structure

### Container System
```css
/* Main Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Section Padding */
.section-padding {
  padding: 5rem 0; /* 80px top/bottom */
}

@media (max-width: 768px) {
  .section-padding {
    padding: 3rem 0; /* 48px top/bottom */
  }
}
```

### Grid System
```css
/* Three-column grid */
.three-col-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

/* Success stories carousel */
.carousel-container {
  display: flex;
  gap: 1.5rem;
  scroll-snap-type: x mandatory;
  overflow-x: auto;
  padding-bottom: 1rem;
}
```

### Spacing System
```css
/* Vertical rhythm (base unit: 4px) */
--spacing-1: 0.25rem;   /* 4px */
--spacing-2: 0.5rem;    /* 8px */
--spacing-3: 0.75rem;   /* 12px */
--spacing-4: 1rem;      /* 16px */
--spacing-5: 1.25rem;   /* 20px */
--spacing-6: 1.5rem;    /* 24px */
--spacing-8: 2rem;      /* 32px */
--spacing-10: 2.5rem;   /* 40px */
--spacing-12: 3rem;     /* 48px */
--spacing-16: 4rem;     /* 64px */
--spacing-20: 5rem;     /* 80px */
```

## Component Specifications

### Hero Section
- **Background**: Layered gradients with decorative blur circles
- **Content Width**: Max 768px (prose width)
- **Vertical Padding**: 5rem (80px) desktop, 3rem (48px) mobile
- **Text Alignment**: Center
- **CTA Spacing**: 2rem (32px) gap between buttons

### Sanskrit Blessing Card
- **Background**: `rgba(255, 255, 255, 0.8)` with `backdrop-blur-sm`
- **Border**: `1px solid rgba(255, 153, 51, 0.2)` (Saffron/20)
- **Border Radius**: `9999px` (full rounded)
- **Padding**: 1.5rem x 1rem (24px x 16px)
- **Shadow**: `shadow-lg` with custom spiritual glow

### Feature Cards
- **Background**: `var(--card-cream)`
- **Border**: `1px solid rgba(201, 162, 39, 0.1)` (Temple Gold/10)
- **Border Radius**: `0.75rem` (12px)
- **Padding**: 1.5rem (24px)
- **Hover Transform**: `translateY(-2px)`
- **Transition**: `all 0.3s ease`

### Success Story Cards
- **Width**: 320px fixed
- **Background**: White with shadow
- **Border Radius**: `1rem` (16px)
- **Padding**: 1.5rem (24px)
- **Quote Typography**: Italic, 1rem, line-height 1.6
- **Author Typography**: 0.875rem, font-weight 600

## Responsive Design

### Breakpoint System
```css
/* Mobile First Approach */
/* xs: 0px and up (default) */
/* sm: 640px and up */
@media (min-width: 640px) { }

/* md: 768px and up */
@media (min-width: 768px) { }

/* lg: 1024px and up */
@media (min-width: 1024px) { }

/* xl: 1280px and up */
@media (min-width: 1280px) { }
```

### Typography Scaling
- **Mobile (≤640px)**: Base font size 14px-16px
- **Tablet (641px-1023px)**: Base font size 16px
- **Desktop (≥1024px)**: Base font size 16px-18px

### Layout Adaptations
- **Mobile**: Single column, full-width cards
- **Tablet**: Two-column grid where applicable
- **Desktop**: Three-column grid, larger spacing

## Animation & Interactions

### Keyframe Animations
```css
@keyframes lotus-bloom {
  0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.8; }
  33% { transform: scale(1.05) rotate(2deg); opacity: 0.9; }
  66% { transform: scale(1.08) rotate(-1deg); opacity: 1; }
}

@keyframes om-pulse {
  0%, 100% { transform: scale(1); opacity: 0.9; }
  50% { transform: scale(1.03); opacity: 1; }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}
```

### Interaction States
- **Hover Elevation**: `translateY(-2px)` with enhanced shadow
- **Focus States**: Saffron outline with 2px width
- **Active States**: Scale 0.98 transform
- **Loading States**: Gentle pulse animation

## Accessibility Standards

### Color Contrast
- **Text on Light Background**: Minimum 4.5:1 ratio
- **Text on Dark Background**: Minimum 4.5:1 ratio
- **Large Text (≥24px)**: Minimum 3:1 ratio
- **Interactive Elements**: Minimum 3:1 ratio for borders

### Focus Management
- **Focus Indicators**: Visible 2px outline in Saffron
- **Focus Trapping**: Modal and drawer components
- **Skip Links**: Available for main content areas

### Screen Reader Support
- **Semantic HTML**: Proper heading hierarchy (h1 → h2 → h3)
- **ARIA Labels**: Descriptive labels for interactive elements
- **Alt Text**: Meaningful descriptions for all images
- **Live Regions**: For dynamic content updates

## Implementation Guidelines

### CSS Custom Properties
```css
:root {
  /* Typography */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-serif: 'Crimson Text', Georgia, serif;
  --font-devanagari: 'Noto Serif Devanagari', serif;
  
  /* Spacing */
  --spacing-unit: 4px;
  --section-padding-y: calc(var(--spacing-unit) * 20);
  --content-padding-x: calc(var(--spacing-unit) * 4);
  
  /* Borders */
  --border-radius-sm: 0.375rem;
  --border-radius-md: 0.75rem;
  --border-radius-lg: 1rem;
  --border-radius-full: 9999px;
}
```

### Performance Considerations
- **Font Loading**: Use `font-display: swap` for web fonts
- **Image Optimization**: WebP format with fallbacks
- **Lazy Loading**: Implement for below-fold content
- **Code Splitting**: Route-based component splitting

### Bundle Size Monitoring
- **Font Subset**: Include only required character sets
- **Icon Optimization**: Use SVG sprites or icon fonts
- **CSS Purging**: Remove unused Tailwind classes in production

## Version History

- **v1.0** - Initial homepage design specification
- **Created**: January 2025
- **Last Updated**: January 2025

---

## Future Enhancement Guidelines

### Typography Updates
- Maintain the three-tier font system (Inter, Crimson Text, Noto Serif Devanagari)
- Test new font sizes across all breakpoints before implementation
- Ensure WCAG AA compliance for all text combinations
- Document any new typography patterns in this specification

### Color Modifications
- Preserve the Vedic color palette core values
- Test with color blindness simulators before implementation
- Maintain minimum contrast ratios across all combinations
- Update CSS custom properties when adding new colors

### Layout Changes
- Maintain the 4px base spacing unit system
- Test responsive behavior across all defined breakpoints
- Preserve semantic HTML structure and heading hierarchy
- Validate touch target sizes (minimum 44px) on mobile devices

---

*This document should be updated whenever changes are made to the homepage design to maintain accuracy and consistency across the SattvikVivah platform.*
