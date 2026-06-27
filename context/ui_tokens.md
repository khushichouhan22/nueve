# ui_tokens.md

# UI Design Tokens

This file defines the visual foundation of the Student Semester Registration System.

The design is based on the provided Stitch Academic Architecturalism theme and should remain consistent across all pages.

---

# Colors

## Backgrounds

```css id="yd1b34"
--background: #F3F0E9;
--surface: #FAF8F4;
--surface-secondary: #FFFFFF;
```

Usage:

* Page backgrounds
* Dashboard backgrounds
* Form backgrounds

---

## Text

```css id="ehgxqh"
--text-primary: #1B1B1B;
--text-secondary: #4C4546;
--text-muted: #7E7576;
```

Usage:

* Headings
* Body text
* Labels

---

## Borders

```css id="fqg3a8"
--border: #D8D4CC;
--border-light: #E8E4DC;
```

Usage:

* Cards
* Tables
* Inputs

---

## Status Colors

### Success

```css id="4jdc5d"
--success: #2E7D32;
```

### Warning

```css id="2ndp1w"
--warning: #F9A825;
```

### Error

```css id="j4r5b4"
--error: #BA1A1A;
```

---

# Typography

## Font Families

### Primary

```css id="z3bujh"
font-family: "Inter", sans-serif;
```

Usage:

* UI
* Forms
* Buttons
* Tables

---

### Accent

```css id="nyv0xa"
font-family: "EB Garamond", serif;
```

Usage:

* Hero text
* Academic headings
* Editorial sections

---

# Font Sizes

## Display

```css id="9vwv89"
80px
```

Usage:

* Landing page hero

---

## Page Heading

```css id="lr6ah1"
48px
```

Usage:

* Major page titles

---

## Section Heading

```css id="u0p1y4"
24px
```

Usage:

* Dashboard sections
* Form titles

---

## Body

```css id="guzcl9"
16px
```

Usage:

* General content

---

## Small Text

```css id="1ev9mk"
14px
```

Usage:

* Labels
* Metadata
* Table cells

---

# Font Weights

```css id="u3vz4g"
400 Regular
500 Medium
600 SemiBold
700 Bold
800 ExtraBold
```

---

# Spacing Scale

Base Unit

```css id="v9u1g3"
8px
```

---

## Spacing Tokens

```css id="eqgcx6"
space-1: 8px;
space-2: 16px;
space-3: 24px;
space-4: 32px;
space-5: 48px;
space-6: 64px;
space-7: 96px;
space-8: 120px;
```

---

# Layout Widths

## Content Width

```css id="17ot66"
1440px
```

---

## Desktop Padding

```css id="tuxzt6"
64px
```

---

## Mobile Padding

```css id="js0g42"
20px
```

---

# Border Radius

```css id="8hwsqb"
radius-sm: 4px;
radius-md: 8px;
radius-lg: 12px;
radius-xl: 16px;
```

Usage:

* Inputs
* Buttons
* Cards

---

# Shadows

## Card Shadow

```css id="v0f0qg"
0 1px 3px rgba(0,0,0,0.08);
```

Usage:

* Dashboard cards
* Form containers

---

## Elevated Shadow

```css id="jsrmvr"
0 4px 12px rgba(0,0,0,0.12);
```

Usage:

* Modals
* Dropdowns

---

# Breakpoints

```css id="5aj9ot"
sm: 640px;
md: 768px;
lg: 1024px;
xl: 1280px;
2xl: 1440px;
```

---

# Button Tokens

## Primary Button

```css id="4st2yt"
background: #000000;
color: #FFFFFF;
padding: 12px 20px;
border-radius: 8px;
```

---

## Secondary Button

```css id="m5e8kp"
background: transparent;
border: 1px solid #D8D4CC;
color: #1B1B1B;
```

---

# Table Tokens

## Header

```css id="l26hqr"
font-size: 12px;
font-weight: 600;
letter-spacing: 0.08em;
text-transform: uppercase;
```

---

## Row Height

```css id="2znqdn"
56px
```

---

# Dashboard Stat Card

```css id="c1g8ik"
padding: 24px;
border: 1px solid var(--border);
background: var(--surface);
```

---

# Z-Index System

```css id="kzvwlv"
dropdown: 100;
sticky-nav: 200;
modal: 500;
toast: 1000;
```

---

# Tailwind Theme Example

```ts id="hzvgqt"
colors: {
  background: "#F3F0E9",
  surface: "#FAF8F4",
  primary: "#000000",
  border: "#D8D4CC",
  success: "#2E7D32",
  warning: "#F9A825",
  error: "#BA1A1A",
}
```

---

# Design Rules

1. Use Inter for all UI components.
2. Use EB Garamond only for editorial headings.
3. Never use bright colors outside status indicators.
4. Prefer whitespace over visual clutter.
5. Maintain academic/minimal aesthetic.
6. Use neutral backgrounds and thin borders.
7. Follow the provided Stitch design language consistently.
