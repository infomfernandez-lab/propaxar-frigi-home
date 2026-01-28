

# Landing Page Updates Plan

## Overview
This plan covers comprehensive updates to the Propaxar landing page including hero simplification, color corrections, section removal, a new form section with timeline, and testimonial improvements.

---

## Changes Summary

### 1. Hero Section Simplification

**Current state:** Search-style CTA box with accommodation type radio buttons

**Changes:**
- Remove the white search card with radio buttons entirely
- Replace with a simple centered CTA button: "Empezar ahora"
- Increase headline font size from 52px to 58px (desktop) and 32px to 38px (mobile)
- Update hero background to use external URL with 50% dark overlay (currently 40%)
- Larger CTA button with 24px text and generous padding (20px 60px)

### 2. Color Palette Verification

**Current CSS values (in HSL):**
- Primary blue: `217 54% 38%` = approximately #2B5797 (correct)
- Gold: `39 76% 61%` = approximately #E8B44F (correct)

The current HSL values already match the requested hex colors. No changes needed to the color variables.

### 3. Remove Guarantee Section

**Action:** Delete `GuaranteeSection.tsx` and remove its import from `Index.tsx`

### 4. New Form Section

**Create `FormSection.tsx` with:**

**Left column (60%):**
- Headline: "Empieza aqui (Gratis, 15 minutos)"
- Subheadline: "Te llamo en las proximas 24 horas. Sin compromiso."
- Form placeholder box (600px min-height, shadow, rounded corners)

**Right column (40%) - Timeline sidebar:**
- Background: #F8F9FA
- 5-step timeline with numbered circles
- Guarantee box at bottom (light green background)

### 5. Testimonials Update

**Current state:** Already using initials in colored circles (ST, KM, JA)

**Changes:** Add alternating background colors for avatar circles (blue for first, gold for second, blue for third)

---

## Files to Modify

| File | Action |
|------|--------|
| `src/components/HeroSection.tsx` | Simplify CTA, update font sizes, change background image URL |
| `src/components/GuaranteeSection.tsx` | Delete file |
| `src/pages/Index.tsx` | Remove GuaranteeSection, add FormSection |
| `src/components/FormSection.tsx` | Create new file |
| `src/components/TestimonialsSection.tsx` | Update avatar colors |

---

## Technical Details

### Hero Section Changes
```text
Before:
+----------------------------------+
|  Pre-headline                    |
|  Main headline (52px)            |
|  Subheadline                     |
|  +----------------------------+  |
|  | Search box with radios    |  |
|  | [Largo] [Vacac] [Reloc]   |  |
|  |              [CTA Button] |  |
|  +----------------------------+  |
|  Micro-copy                      |
+----------------------------------+

After:
+----------------------------------+
|  Pre-headline                    |
|  Main headline (58px)            |
|  Subheadline                     |
|                                  |
|     [Empezar ahora ->]           |
|                                  |
|  Micro-copy                      |
+----------------------------------+
```

### New Form Section Layout
```text
+------------------------------------------------+
|  LEFT (60%)           |  RIGHT (40%)           |
|                       |                         |
|  Headline             |  "Que pasa despues?"    |
|  Subheadline          |                         |
|                       |  (1) En 1 minuto...     |
|  +----------------+   |  (2) En 24 horas...     |
|  |               |   |  (3) Mismo dia...       |
|  |  Form         |   |  (4) Si decides...      |
|  |  Placeholder  |   |  (5) En 7 dias...       |
|  |  (600px)      |   |                         |
|  |               |   |  [Guarantee box]        |
|  +----------------+   |                         |
+------------------------------------------------+
```

### Page Structure After Changes
```text
1. HeroSection (simplified CTA)
2. HowItWorks (unchanged)
3. FormSection (new - with id="form-section")
4. TestimonialsSection (updated avatars)
5. FinalCTA (remove form-section id, keep as closing CTA)
```

---

## Implementation Steps

1. **Update HeroSection.tsx**
   - Remove useState and accommodationTypes
   - Remove search card JSX
   - Add simple centered CTA button with new styling
   - Update headline to 58px/38px
   - Change background image to external URL
   - Update overlay from bg-black/40 to bg-black/50

2. **Create FormSection.tsx**
   - Two-column responsive layout
   - Left: headline, subheadline, placeholder box
   - Right: timeline with 5 steps + guarantee box
   - Add id="form-section" for smooth scroll targeting

3. **Update TestimonialsSection.tsx**
   - Add index-based background color for avatars
   - First testimonial: blue, second: gold, third: blue

4. **Delete GuaranteeSection.tsx**
   - Remove the entire component file

5. **Update Index.tsx**
   - Remove GuaranteeSection import and usage
   - Add FormSection import and place between HowItWorks and TestimonialsSection

6. **Update FinalCTA.tsx**
   - Remove id="form-section" (moved to FormSection)

