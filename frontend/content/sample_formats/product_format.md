# Product Format

Use this template when creating new products for the store. Copy the structure below into a new `.mdx` file in the `content/products/` directory.

---

## Template Structure

```mdx
---
title: "Product Name"
excerpt: "A brief one-sentence description of what makes this product special."
price: 29.99 # Price in USD
category: "UI Kit" # Options: "UI Kit", "Template", "Component", "Tool", "Design System", "Other"
image: "/products/product-image.svg" # or .png, .jpg - Main product preview
tags: ["React", "TypeScript", "Tailwind CSS"] # Technology/feature tags
featured: false # Set to true to highlight on store homepage
demoUrl: "https://demo.example.com" # Optional: link to live demo
downloadUrl: "/downloads/product.zip" # Optional: direct download link
purchaseUrl: "https://gumroad.com/..." # Optional: external purchase link
difficulty: "intermediate" # Options: "beginner", "intermediate", "advanced"
version: "1.0.0"
lastUpdated: "2026-03-08"
rating: 4.5 # Average rating out of 5
reviews: 42 # Number of reviews
downloads: 1250 # Number of downloads/purchases
isPro: false # Set to true to mark as premium/pro product
license: "MIT" # License type
published: true # Set to false to hide from public view
---

## Overview

Provide a compelling overview of the product. Explain:
- What problem it solves
- Who it's designed for
- What makes it unique or valuable
- Key use cases

Make this section engaging and focus on benefits rather than just features.

## Key Features

Highlight the main features and capabilities:

- **Feature 1**: Explain the value this feature provides to users
- **Feature 2**: Describe how this improves workflow or saves time
- **Feature 3**: Technical capability or innovation
- **Feature 4**: Integration or compatibility aspects
- **Feature 5**: Support or documentation included

## What's Included

List exactly what users get when they purchase/download:

- ✅ X number of components/templates
- ✅ Complete source code
- ✅ Documentation and usage guide
- ✅ Example implementations
- ✅ Free updates for 1 year
- ✅ Community support

## Technical Details

### Requirements

- Node.js 18+ or similar runtime
- React 18+ or compatible framework
- Modern browser support

### Technologies Used

- **Frontend**: React, TypeScript, Next.js
- **Styling**: Tailwind CSS, CSS Modules
- **Animation**: Framer Motion
- **Icons**: Lucide Icons
- **Other**: List additional dependencies

### Installation

```bash
# Installation instructions
npm install product-name

# Or direct download
# 1. Download the ZIP file
# 2. Extract to your project
# 3. Follow the setup guide
```

## Usage Examples

### Basic Usage

```tsx
import { Component } from 'product-name';

function App() {
  return <Component />;
}
```

### Advanced Usage

```tsx
import { Component } from 'product-name';

function App() {
  return (
    <Component
      variant="advanced"
      onAction={() => console.log('Action triggered')}
    />
  );
}
```

## Customization

Explain how users can customize the product:
- Color schemes
- Layout options
- Configuration settings
- Extending functionality

## Screenshots

Include 3-5 high-quality screenshots showing:
1. Main interface/component
2. Responsive design
3. Variations or states
4. Implementation examples
5. Documentation dashboard (if applicable)

## Support & Updates

- **Documentation**: Link to full documentation
- **Support**: Email or community forum
- **Updates**: Frequency and what's included
- **Changelog**: Major version history

## License

Detailed explanation of the license:
- Commercial use allowed/not allowed
- Attribution requirements
- Redistribution terms
- Warranty disclaimers

## FAQ

### Can I use this in commercial projects?
Yes, the license allows commercial use.

### Do you provide refunds?
Refund policy details here.

### How do I get support?
Contact information and support channels.

### Can I request features?
Feature request process.

## Reviews & Testimonials

> "This product saved me hours of development time!" - Developer Name

> "The quality and attention to detail is outstanding." - Another User

---

## Markdown Tips

- Use headers to organize content hierarchically
- Include code blocks with proper syntax highlighting
- Add images with: `![Alt text](/path/to/image.png)`
- Use blockquotes for testimonials or important notes
- Create tables for feature comparisons
- Add links to external resources or documentation
```

---

## Example: UI Kit Product

See below for a complete example of a product listing:

```mdx
---
title: "Modern Dashboard UI Kit"
excerpt: "A complete dashboard UI kit with 50+ components, dark mode support, and full TypeScript definitions."
price: 49.99
category: "UI Kit"
image: "/products/dashboard-ui-kit.svg"
tags: ["React", "TypeScript", "Tailwind CSS", "Dashboard", "Dark Mode"]
featured: true
demoUrl: "https://demo.modernuikit.com"
downloadUrl: "/downloads/modern-dashboard-ui-kit.zip"
difficulty: "intermediate"
version: "2.1.0"
lastUpdated: "2026-03-01"
rating: 4.8
reviews: 127
downloads: 3450
isPro: true
license: "Commercial"
published: true
---

## Overview

The Modern Dashboard UI Kit is a comprehensive set of pre-built React components designed specifically for creating beautiful, responsive admin dashboards and data-rich applications. Built with TypeScript and Tailwind CSS, it provides everything you need to launch your SaaS product or internal tool in days instead of weeks.

Perfect for developers who want to skip the tedious UI work and focus on their core business logic.

## Key Features

- **50+ Premium Components**: Charts, tables, forms, modals, and more
- **Full Dark Mode**: Seamless theme switching with system preference detection
- **TypeScript First**: Complete type definitions for better development experience
- **Fully Responsive**: Mobile-first design that works on all screen sizes
- **Accessible**: WCAG 2.1 AA compliant components
- **Customizable**: Easy theming with CSS variables
- **Production Ready**: Battle-tested in real-world applications

## What's Included

- ✅ 50+ React components
- ✅ Complete source code (TypeScript)
- ✅ Storybook documentation
- ✅ 10 pre-built page templates
- ✅ Dark & light theme variants
- ✅ Figma design files
- ✅ Free updates for lifetime
- ✅ Priority email support

## Technical Details

### Requirements

- Node.js 18+
- React 18+
- Tailwind CSS 3+

### Technologies Used

- **Frontend**: React 18, TypeScript 5
- **Styling**: Tailwind CSS 3.4
- **Charts**: Recharts
- **Forms**: React Hook Form
- **Icons**: Lucide React

### Installation

```bash
npm install @modernui/dashboard-kit
# or
yarn add @modernui/dashboard-kit
```
```
