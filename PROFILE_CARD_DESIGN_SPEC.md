
# Profile Card Design Specification

This document serves as the complete reference for all typography, layout, and styling specifications used in the Profile Card component. Use this as the source of truth for any future modifications to maintain design consistency.

## Typography System

### Font Stack
```css
font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
```
- Use optical sizing where available
- Prefer variable fonts if supported

### Text Styles Specification

#### Last Seen / Status Text
- **Font Size**: 12px (mobile: 12px; desktop: 12-13px)
- **Font Weight**: 500
- **Line Height**: 16px
- **Letter Spacing**: 0
- **Color**: `#667085`
- **Spacing**: 4px margin-bottom
- **Example**: "Last seen on 09-Aug-25", "Online now"

#### Name and Age (Primary Heading)
- **Font Size**: 28px (mobile: 22-24px; desktop: 28-30px)
- **Font Weight**: 700
- **Line Height**: 34px
- **Letter Spacing**: 0
- **Color**: `#101828`
- **Spacing**: 6px margin-bottom
- **Example**: "Sandhya Jaiswar, 28"

#### Basic Profile Information (Height - City - Caste)
- **Font Size**: 14px (mobile: 13-14px; desktop: 14-15px)
- **Font Weight**: 600
- **Line Height**: 20px
- **Letter Spacing**: 0.1px
- **Color**: `#344054`
- **Separator**: "•" with 8px horizontal gap
- **Spacing**: 8px margin-bottom
- **Example**: "5ft 0in • Mumbai • Chandravanshi Kahar"

#### Professional Information Row 1 (Profession & Income)
- **Font Size**: 14px
- **Font Weight**: 500
- **Line Height**: 20px
- **Letter Spacing**: 0
- **Color**: `#344054`
- **Icon Size**: 16px
- **Icon-Text Gap**: 6px
- **Item Gap**: 16px
- **Spacing**: 4px margin-bottom
- **Example**: "Accounting Professional • Rs. 5 - 7.5 Lakh p.a"

#### Professional Information Row 2 (Education & Marital Status)
- **Font Size**: 14px
- **Font Weight**: 500
- **Line Height**: 20px
- **Letter Spacing**: 0
- **Color**: `#344054`
- **Icon Size**: 16px
- **Icon-Text Gap**: 6px
- **Item Gap**: 16px
- **Spacing**: 12px margin-bottom before actions
- **Example**: "MBA/PGDM, B.Com • Never Married"

#### Biography/One-liner Text
- **Font Size**: 14px
- **Font Weight**: 400 (normal)
- **Line Height**: 20px
- **Color**: `#374151` (text-gray-700)
- **Style**: Italic
- **Spacing**: 12px margin-bottom
- **Format**: Enclosed in quotes
- **Example**: "Looking for a life partner who shares similar values..."

#### Action Button Labels
- **Default State**:
  - Font Size: 14px
  - Font Weight: 600
  - Line Height: 18px
  - Letter Spacing: 0
  - Color: `#475467`
- **Active/Primary CTA** (Interest button):
  - Color: `#D12C4A`
- **Disabled State**:
  - Color: `#98A2B3`
- **Icon Size**: 18px
- **Icon-Text Gap**: 6px
- **Item Gap**: 20px
- **Examples**: "Interest", "Super Interest", "Shortlist", "Chat"

## Badge and Counter Specifications

### Pro Badge
- **Font Size**: 12px
- **Font Weight**: 600
- **Line Height**: 16px
- **Color**: `#FFFFFF`
- **Background**: `#D12C4A`
- **Padding**: 4px 12px 4px 16px
- **Border Radius**: 999px 0 0 999px (rounded-l-full)
- **Position**: Absolute, top-right of card

### Most Compatible Badge
- **Font Size**: 12px
- **Font Weight**: 600
- **Line Height**: 16px
- **Color**: `#175CD3`
- **Background**: `#EFF8FF`
- **Border**: 1px solid `#B2DDFF` (border-blue-200)
- **Padding**: 4px 12px 4px 16px
- **Border Radius**: 999px 0 0 999px
- **Gap**: 8px (between emoji and text)
- **Content**: "👍 Most Compatible"

### Photo Count Badge (on image)
- **Font Size**: 12px
- **Font Weight**: 700
- **Line Height**: 1
- **Color**: `#FFFFFF`
- **Background**: `rgba(0, 0, 0, 0.6)`
- **Padding**: 3px 8px
- **Border Radius**: 6px
- **Position**: Absolute, top-right of image
- **Icon**: Images icon (16px) with 4px margin-right

## Layout and Spacing

### Card Structure
- **Width**: Full width, max-width: 768px (3xl)
- **Background**: `#FFFFFF`
- **Border**: 1px solid `#E5E7EB` (gray-200)
- **Border Radius**: 8px
- **Margin Bottom**: 16px
- **Overflow**: Hidden
- **Cursor**: Pointer

### Profile Image Section
- **Width**: 224px (56 * 0.25rem) - fixed width, flex-shrink-0
- **Height**: Auto (maintains aspect ratio)
- **Object Fit**: Cover
- **Background (no image)**: Gradient from `#EBF8FF` to `#C3DDFD`

### Content Section Padding
- **Left Padding**: 16px
- **Right Padding**: 0 (to allow badges to extend to edge)
- **Top/Bottom Padding**: 16px
- **Right Padding for Text**: 16px (applied to text elements)

### Vertical Spacing Rhythm
- **Base Unit**: 4px
- **Section Paddings**: 12-16px internally; 16-20px card padding
- **Separator Spacing**: 8-12px around separators
- **Icon-Text Pairs**: 8-12px spacing

## Interactive Elements

### Button Specifications
- **Border Radius**: Full (rounded-full)
- **Padding**: 6px 16px (py-1.5 px-4)
- **Minimum Height**: 36px
- **Hover States**:
  - Interest: `hover:bg-red-50 hover:border-red-400`
  - Super Interest: `hover:bg-pink-50 hover:border-pink-400`
  - Shortlist: `hover:bg-orange-50 hover:border-orange-400`
  - Chat: `hover:bg-gray-50 hover:border-gray-400`

### Icon Specifications
- **Verification Icon**: 20px (w-5 h-5), color `#1d9bf0`
- **Location Icon**: 16px, color `#667085`
- **Profession Icon**: 16px, color `#667085`
- **Education Icon**: 16px, color `#667085`
- **Marital Status Icon**: 16px, color `#667085`
- **Action Button Icons**: 18px

## Responsive Breakpoints

### Mobile (≤375px width)
- Name: 22-24px/30px line-height
- Body text: 13-14px/18-20px line-height
- Reduce item gaps by ~2px
- Maintain minimum tap targets of 44px height

### Tablet/Desktop
- Name: up to 30px
- Body text: 14-15px
- Increase action gaps for clarity
- Full spacing specifications as defined above

## Color Palette

### Text Colors
- **Primary Text**: `#101828` (name, headings)
- **Secondary Text**: `#344054` (profile info, professional details)
- **Tertiary Text**: `#667085` (status, icons)
- **Muted Text**: `#475467` (action buttons default)
- **Bio Text**: `#374151` (italicized quotes)

### Brand Colors
- **Primary Brand**: `#D12C4A` (Pro badge, Interest button)
- **Secondary Brand**: `#175CD3` (Most Compatible badge text)
- **Success/Compatible**: `#EFF8FF` (Most Compatible badge background)

### Background Colors
- **Card Background**: `#FFFFFF`
- **Image Placeholder**: Gradient `#EBF8FF` to `#C3DDFD`
- **Badge Backgrounds**: As specified in badge sections

## Accessibility Standards

### Contrast Requirements
- **Minimum Contrast**: WCAG AA (≥4.5:1 for body text, ≥3:1 for bold text)
- **Color-only Information**: Avoid using color as the only means of conveying information
- **Focus States**: Ensure all interactive elements have visible focus indicators

### Text Truncation
- **Long Names**: Truncate with ellipsis after 1 line
- **Locations**: Truncate with ellipsis after 1 line
- **Hover Tooltips**: Provide title attributes for truncated text

### Keyboard Navigation
- **Tab Order**: Logical sequence through interactive elements
- **Action Buttons**: All buttons must be keyboard accessible
- **Minimum Target Size**: 44px for mobile touch targets

## Implementation Notes

### CSS Custom Properties Usage
```css
.profile-card {
  --text-primary: #101828;
  --text-secondary: #344054;
  --text-tertiary: #667085;
  --brand-primary: #D12C4A;
  --brand-secondary: #175CD3;
}
```

### Memoization Requirements
- Component should be wrapped with `React.memo()`
- Callback functions should use `useCallback()`
- Complex calculations should use `useMemo()`

### Performance Considerations
- **Image Optimization**: Use appropriate image formats and sizes
- **Lazy Loading**: Implement for images when in viewport
- **Bundle Size**: Monitor impact of icon libraries

## Future Enhancement Guidelines

### Typography Updates
- Always maintain the Inter font stack as primary
- Preserve the established visual hierarchy
- Test new font sizes across all breakpoints
- Ensure WCAG AA compliance for all text

### Layout Modifications
- Maintain the 4px base unit for spacing rhythm
- Preserve the card aspect ratio and proportions
- Test responsive behavior across all breakpoints
- Validate touch target sizes on mobile

### Color Changes
- Maintain sufficient contrast ratios
- Test with color blindness simulators
- Preserve brand color consistency
- Document any new color additions in this spec

---

## Version History

- **v1.0** - Initial documentation based on current ProfileCard implementation
- Created: January 2025
- Last Updated: January 2025

---

*This document should be updated whenever changes are made to the ProfileCard component to maintain accuracy and consistency.*
