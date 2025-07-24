# Enerwise Logo Assets

This directory contains vector SVG versions of all Enerwise and SOLR AI logos.

## Enerwise Logos

### Primary Logos
- `enerwise-logo.svg` - Standard horizontal logo with "Ener" (gray) + "wise" (green)
- `enerwise-logo-compact.svg` - Compact version for smaller spaces
- `enerwise-logo-horizontal.svg` - Full horizontal with icon and tagline
- `enerwise-logo-icon.svg` - Circular icon version with "E" symbol

### Usage
```tsx
import { EnerwiseLogo } from '@/components/logo';

// Text version (current default)
<EnerwiseLogo variant="text" size="md" />

// Icon version
<EnerwiseLogo variant="icon" size="sm" />

// Horizontal with tagline
<EnerwiseLogo variant="horizontal" size="lg" />

// Compact version
<EnerwiseLogo variant="compact" size="md" />
```

## SOLR AI Logos

### Available Versions
- `solr-ai-logo.svg` - Dark version with white text on dark backgrounds
- `solr-ai-logo-white.svg` - Light version with dark text on white backgrounds

### Usage
```tsx
import { SolrLogo } from '@/components/logo';

// Dark version (default)
<SolrLogo variant="dark" size="md" />

// White/light version
<SolrLogo variant="white" size="sm" />
```

## Design Specifications

### Colors
- **Enerwise Green**: #10b981 (`energy-green`)
- **Enerwise Dark**: #1f2937 (`text-gray-900`)
- **SOLR Background**: #1f2937
- **SOLR Text**: #ffffff

### Typography
- Font Family: Inter, system fonts
- Font Weight: 700 (bold) for main text
- Font Weight: 400 (regular) for taglines

### Sizing
- **Small (sm)**: 24px height
- **Medium (md)**: 32px height  
- **Large (lg)**: 48px height

## File Format
All logos are created as scalable SVG files with:
- Clean vector paths
- Embedded CSS styling
- Responsive design support
- Optimized for web use