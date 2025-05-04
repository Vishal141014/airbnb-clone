# Airbnb Clone - Advanced Front-End Project

## Overview

This is a production-quality, pixel-perfect front-end replica of [Airbnb](https://www.airbnb.com/) built with Next.js and Tailwind CSS. The goal was to match the original Airbnb homepage design exactly while adding innovative features that go beyond the original site.

![Airbnb Clone Screenshot](https://a0.muscache.com/im/pictures/e25a9b25-fa98-4160-bfd1-039287bf38b6.jpg?im_w=720)

## ✨ Features

### Exact Airbnb Replica:
- Pixel-perfect typography, color palette, spacing, and layout
- Fully responsive design for desktop, tablet, and mobile
- Complete navbar with search functionality and user menu
- Property cards with image carousels, ratings, and favorites
- Category filters with horizontal scrolling
- Map view with property markers
- Footer with all appropriate sections

### Enhanced Features:
- 🤖 **AI-powered Trip Recommender**: Get personalized trip suggestions based on preferences
- 🗺️ **Dynamic Price Heatmap**: Visual overlay showing price trends on the map
- 👥 **Wishlist Collaboration**: Allow multiple users to vote and comment on saved listings
- 🔄 **Property Comparison Tool**: Side-by-side comparison of multiple properties
- 🌄 **Travel Inspiration Carousel**: Interactive showcase of unique destinations
- ✨ **Advanced Animations**: Smooth transitions and micro-interactions using Framer Motion and GSAP

## 🚀 Technologies Used

- **Next.js**: React framework for server-rendered applications
- **TypeScript**: Type-safe code
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **GSAP**: Advanced animations
- **React Map GL / Mapbox**: Interactive maps
- **React Icons**: Icon library
- **React DatePicker**: Date selection component

## 🔧 Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/airbnb-clone.git
   cd airbnb-clone
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📱 Responsive Design

The application is fully responsive with the following breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🌟 Performance Optimizations

- **Image Optimization**: Next.js Image component for WebP format and optimal sizing
- **Code Splitting**: Dynamic imports for smaller initial bundle size
- **Lazy Loading**: Components and images load only when needed
- **Prefetching**: Key routes are prefetched for instant navigation
- **Font Optimization**: Proper font loading strategy with fallbacks
- **CSS Optimization**: Tailwind's built-in purge for minimal CSS

## 🛠️ Project Structure

```
airbnb-clone/
├── app/             # Next.js app router pages and layouts
├── components/      # React components
│   ├── common/      # Shared UI components
│   ├── features/    # Advanced feature components
│   ├── home/        # Home page specific components
│   ├── layout/      # Layout components (header, footer)
│   ├── map/         # Map-related components
│   └── ui/          # Basic UI elements
├── public/          # Static assets
└── styles/          # Global styles
```

## 🔒 Accessibility

- Semantic HTML throughout
- ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast meeting WCAG guidelines
- Focus management for modals and dropdowns
- Reduced motion support

## 📊 Browser Support

Tested and optimized for:
- Chrome
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Android Chrome)

## 🚧 Future Improvements

- Server component optimization
- Authentication integration
- Booking flow implementation
- Integration with backend services
- Improved SEO
- Automated testing

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## ⚠️ Disclaimer

This is a demonstration project for educational purposes. It is not affiliated with or endorsed by Airbnb Inc. 