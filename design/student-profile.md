---
name: Neo-Registrar
colors:
  surface: '#fff9ef'
  surface-dim: '#e3d9c1'
  surface-bright: '#fff9ef'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fdf3da'
  surface-container: '#f7edd4'
  surface-container-high: '#f1e8cf'
  surface-container-highest: '#ebe2c9'
  on-surface: '#1f1b0c'
  on-surface-variant: '#424843'
  inverse-surface: '#353020'
  inverse-on-surface: '#faf0d7'
  outline: '#727973'
  outline-variant: '#c1c8c1'
  surface-tint: '#446552'
  primary: '#446552'
  on-primary: '#ffffff'
  primary-container: '#bde2ca'
  on-primary-container: '#446653'
  inverse-primary: '#abcfb8'
  secondary: '#745b00'
  on-secondary: '#ffffff'
  secondary-container: '#fdd355'
  on-secondary-container: '#735a00'
  tertiary: '#6d5866'
  on-tertiary: '#ffffff'
  tertiary-container: '#eed2e2'
  on-tertiary-container: '#6e5966'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c6ebd3'
  primary-fixed-dim: '#abcfb8'
  on-primary-fixed: '#002112'
  on-primary-fixed-variant: '#2d4d3c'
  secondary-fixed: '#ffe08b'
  secondary-fixed-dim: '#ebc246'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#584400'
  tertiary-fixed: '#f7dbeb'
  tertiary-fixed-dim: '#dabfcf'
  on-tertiary-fixed: '#261722'
  on-tertiary-fixed-variant: '#54414e'
  background: '#fff9ef'
  on-background: '#1f1b0c'
  surface-variant: '#ebe2c9'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '900'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '800'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '800'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '500'
    lineHeight: '1.5'
  body-md:
    fontFamily: Space Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-bold:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '700'
    lineHeight: '1.2'
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style
The design system adopts a **Neo-Brutalist** aesthetic specifically tailored for a Student Semester Registration System. The personality is energetic, transparent, and unapologetically bold, moving away from the "softness" of typical educational portals to provide a high-contrast, high-impact user experience.

The target audience—students and academic administrators—interacts with a UI that prioritizes structural honesty over decorative fluff. The aesthetic is defined by raw layouts, thick strokes, and a "sticker-book" energy that makes administrative tasks feel active rather than passive. Every interactive element is explicitly defined by its outline and a hard shadow, ensuring no ambiguity in the user's path.

## Colors
The palette uses a high-contrast combination of vibrant pastels and a grounded neutral base. 

- **Mint Green (#bde2ca)**: Used for primary actions, success states, and indicating "Current Semester" status.
- **Mustard Yellow (#f2c94c)**: Reserved for secondary highlights, warnings, and highlighting selected course modules.
- **Pastel Pink (#f4d8e8)**: Used for tertiary decorative elements, department categories, or elective distinctions.
- **Cream (#fef4db)**: The primary application background to reduce eye strain while maintaining a retro-tech vibe.
- **Pure White (#ffffff)**: Exclusively for card and container backgrounds to ensure maximum readability against the cream canvas.
- **Solid Black (#000000)**: Used for all text, borders, and hard shadows to provide the structural "skeleton" of the design system.

## Typography
Typography is architectural and loud. **Montserrat** provides the heavy weight required for headings, often used in uppercase to simulate billboard-style messaging. **Space Grotesk** is used for body copy for its technical but readable geometric qualities. **JetBrains Mono** is utilized for labels, metadata (like Course IDs and Credit Hours), and form instructions to emphasize the "systemic" nature of registration.

All headings should be treated as structural blocks. Do not use light weights; if a heading is present, it must be bold or black.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy on desktop (1280px max-width) and a **Fluid Grid** on mobile. 

- **Columns**: 12-column grid for desktop, 4-column for mobile.
- **Gutters**: Fixed at 24px to ensure the thick black borders of adjacent cards never touch.
- **Rhythm**: All spacing is based on a 4px baseline. Vertical margins between sections are aggressive (40px+) to maintain the raw, spacious feel of Neo-Brutalism.
- **Alignment**: Elements should feel "locked" to the grid. Avoid centering content within cards; left-align everything to maintain a strong vertical axis.

## Elevation & Depth
Depth in this design system is **faux-3D** and physical, achieved through solid black shadows rather than blurs or light gradients.

1.  **Level 0 (Base)**: The Cream background (#fef4db).
2.  **Level 1 (Interactive Elements)**: Buttons and small inputs. 4px x 4px solid black shadow offset.
3.  **Level 2 (Cards/Modules)**: Course cards, registration summaries. 8px x 8px solid black shadow offset.
4.  **Level 3 (Modals/Pop-overs)**: 12px x 12px solid black shadow offset.

**Rules:**
- Shadow color is always `#000000` at 100% opacity.
- Blur radius is always `0px`.
- When an element is "pressed" or hovered, the shadow should decrease in size as the element translates toward the shadow's origin, simulating a physical button being pushed down.

## Shapes
The shape language is strictly **geometric and sharp**. There are zero rounded corners in the design system.

- **Borders**: All containers must have a solid black border. Use 2px for small elements (inputs, tags) and 4px for primary containers (cards, buttons, sidebars).
- **Intersections**: Lines should meet at perfect 90-degree angles.
- **Separators**: Use 2px or 4px black horizontal/vertical lines instead of subtle grey dividers.

## Components

### Buttons
- **Style**: Thick 4px black border, solid background color (Mint, Yellow, or Pink).
- **Shadow**: 4px 4px 0px 0px #000000.
- **State Change**: On hover, `translate-x-[2px] translate-y-[2px]` and shadow becomes `2px 2px 0px 0px #000000`. On active (click), `translate-x-[4px] translate-y-[4px]` and shadow disappears.

### Input Fields
- **Style**: White background, 2px black border, sharp corners.
- **Focus**: Background shifts to Mint Green (#bde2ca) or a 4px shadow is added to indicate active typing status.
- **Labels**: Always JetBrains Mono Bold, placed strictly above the input.

### Cards (Course Modules)
- **Style**: White background, 4px black border, 8px solid black shadow.
- **Header**: A 2px bottom border separates the Course Title from the description.
- **Meta-tags**: Use Mint or Pink backgrounds for "Credits" or "Status" labels with 2px borders.

### Checkboxes & Radios
- **Style**: 2px black border, sharp square shape (even for radios).
- **Selected State**: Solid black fill or a heavy "X" mark using the secondary color.

### Lists
- Use thick 2px bottom borders for list items. 
- Avoid zebra-striping; use high-contrast hover states (background color change to Yellow) instead.

### Progress Bar (Registration Steps)
- A thick 4px black frame. 
- The "fill" is a solid Mint Green with a 2px vertical black line separating the progress segments.