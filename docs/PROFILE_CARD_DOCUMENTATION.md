
# Profile Card Component Documentation

## Overview
The ProfileCard component displays user profiles in a matrimonial/dating application context. This document serves as a complete reference for all typography, styling, and component elements used in the profile card.

## Font Stack
**Primary Font Family:** 
```css
font-family: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
```

## Typography Specifications

### 1. Last Seen Text
- **Font Size:** 12px
- **Font Weight:** 500 (Medium)
- **Line Height:** 16px
- **Letter Spacing:** 0
- **Color:** #667085 (Gray-500)
- **Usage:** Shows user's last activity time
- **Example:** "Last seen at 12:43 AM" | "Online now" | "Last seen yesterday"

### 2. Name and Age (Main Heading)
- **Font Size:** 28px
- **Font Weight:** 700 (Bold)
- **Line Height:** 34px
- **Letter Spacing:** 0
- **Color:** #101828 (Gray-900)
- **Usage:** Primary profile identifier
- **Example:** "Priya Sharma, 26"

### 3. Basic Info Row (Height, Location, Caste)
- **Font Size:** 14px
- **Font Weight:** 600 (SemiBold)
- **Line Height:** 20px
- **Letter Spacing:** 0.1px
- **Color:** #344054 (Gray-700)
- **Separator Color:** #667085 (Gray-500)
- **Usage:** Key profile attributes
- **Example:** "5ft 6in • Mumbai • Chandravanshi Kahar"

### 4. Professional Information
- **Font Size:** 14px
- **Font Weight:** 500 (Medium)
- **Line Height:** 20px
- **Letter Spacing:** 0
- **Color:** #344054 (Gray-700)
- **Icon Color:** #667085 (Gray-500)
- **Usage:** Career and education details
- **Example:** "Accounting Professional • Rs. 5 - 7.5 Lakh p.a"

### 5. One-liner/Bio Text
- **Font Size:** 14px (text-sm in Tailwind)
- **Font Weight:** Normal
- **Style:** Italic
- **Color:** #374151 (text-gray-700)
- **Usage:** Personal description or quote
- **Example:** "Looking for a life partner who shares similar values..."

### 6. Action Button Text
- **Font Size:** 14px
- **Font Weight:** 600 (SemiBold)
- **Line Height:** 18px
- **Letter Spacing:** 0
- **Color:** Varies by button type
- **Usage:** Interactive button labels

## Component Elements

### Profile Image Section
- **Width:** 224px (w-56)
- **Aspect Ratio:** Square-like rectangle
- **Fallback:** Gradient background with initials
- **Overlay:** "Photo visible on acceptance" message for protected images
- **Gallery Indicator:** Shows image count (e.g., "5 images")

### Badge Components

#### Pro Badge
- **Background:** #D12C4A (Red-500)
- **Text Color:** #FFFFFF (White)
- **Font Size:** 12px
- **Font Weight:** 600 (SemiBold)
- **Padding:** 4px 12px 4px 16px
- **Border Radius:** 999px 0 0 999px (rounded-l-full)
- **Position:** Top-right, absolute positioning

#### Most Compatible Badge
- **Background:** #EFF8FF (Blue-50)
- **Text Color:** #175CD3 (Blue-700)
- **Font Size:** 12px
- **Font Weight:** 600 (SemiBold)
- **Padding:** 4px 12px 4px 16px
- **Border Radius:** 999px 0 0 999px (rounded-l-full)
- **Border:** 1px solid #E1F5FE (Blue-200)
- **Icon:** 👍 emoji

### Action Buttons

#### Interest Button
- **Border:** Red-300
- **Text Color:** #D12C4A (Red-500)
- **Hover States:** bg-red-50, border-red-400
- **Icon:** Heart outline
- **Padding:** px-4 py-1.5
- **Border Radius:** Full (rounded-full)

#### Super Interest Button
- **Border:** Pink-300
- **Text Color:** #475467 (Gray-600)
- **Hover States:** bg-pink-50, border-pink-400
- **Icon:** Filled heart
- **Padding:** px-4 py-1.5
- **Border Radius:** Full (rounded-full)

#### Shortlist Button
- **Border:** Orange-300
- **Text Color:** #475467 (Gray-600)
- **Hover States:** bg-orange-50, border-orange-400
- **Icon:** Star outline
- **Padding:** px-4 py-1.5
- **Border Radius:** Full (rounded-full)

#### Chat Button
- **Border:** Gray-300
- **Text Color:** #475467 (Gray-600)
- **Hover States:** bg-gray-50, border-gray-400
- **Icon:** MessageCircle
- **Padding:** px-4 py-1.5
- **Border Radius:** Full (rounded-full)

### Icon Specifications

#### Location Icon (MapPin)
- **Size:** 16px x 16px
- **Color:** #667085 (Gray-500)
- **Margin Right:** 6px

#### Professional Icons (Briefcase, GraduationCap)
- **Size:** 16px x 16px
- **Color:** #667085 (Gray-500)
- **Margin Right:** 6px

#### Marital Status Icon (GiBigDiamondRing)
- **Size:** 16px x 16px
- **Color:** #667085 (Gray-500)
- **Margin Right:** 6px

#### Verification Icon (Custom SVG)
- **Size:** 20px x 20px
- **Color:** #1d9bf0 (Twitter Blue)
- **Path:** Custom checkmark in circle
- **Position:** Next to name

#### Action Button Icons
- **Size:** 18px x 18px
- **Gap from Text:** 6px

## Layout Structure

### Container
- **Max Width:** 768px (max-w-3xl)
- **Background:** White
- **Border:** 1px solid #E5E7EB (Gray-200)
- **Margin Bottom:** 16px (mb-4)
- **Cursor:** Pointer

### Content Layout
- **Display:** Flex
- **Image Section:** 224px fixed width (flex-shrink-0)
- **Content Section:** Flexible width (flex-1)
- **Padding:** pl-4 pr-0 py-4 for content section

### Spacing Guidelines
- **Section Margins:** 8px-12px between major sections
- **Element Spacing:** 4px-6px between related elements
- **Button Gap:** 20px between action buttons
- **Icon Margins:** 6px right margin for icons

## Color Palette

### Text Colors
- **Primary:** #101828 (Gray-900) - Main headings
- **Secondary:** #344054 (Gray-700) - Body text
- **Tertiary:** #667085 (Gray-500) - Supporting text
- **Accent:** #D12C4A (Red-500) - Brand color

### Background Colors
- **Card:** #FFFFFF (White)
- **Image Fallback:** Gradient from Blue-50 to Indigo-100
- **Badge Backgrounds:** Various based on badge type

### Border Colors
- **Card:** #E5E7EB (Gray-200)
- **Buttons:** Varies by button type (Red-300, Pink-300, etc.)

## Responsive Behavior
- **Mobile:** Component maintains proportions but may need width adjustments
- **Desktop:** Max-width constraint maintains optimal viewing experience
- **Image:** Maintains aspect ratio with object-cover

## Usage Guidelines

### Making Changes
1. Always reference this document when modifying profile card styles
2. Maintain consistent font family across all text elements
3. Preserve color harmony using the defined palette
4. Keep spacing proportional to existing guidelines
5. Test changes across different screen sizes

### Best Practices
1. Use semantic HTML structure
2. Maintain accessibility standards
3. Keep font weights consistent with hierarchy
4. Preserve hover states for interactive elements
5. Ensure sufficient color contrast ratios

## File Location
- **Component:** `client/src/components/profile-card.tsx`
- **Dependencies:** Various UI components from `@/components/ui/`
- **Icons:** Lucide React icons + React Icons
- **Types:** `@shared/schema` UserProfile type

---
*Last Updated: [Current Date]*
*Version: 1.0*
